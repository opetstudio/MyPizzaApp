import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  SectionList,
}
from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import Row from '../../components/Row';
import { fetchOnceContact, fetchOnceByUid, reloadLocalContacts } from '../../actions/ContactsAction';
import CheckBoxContainer from '../../containers/CheckBoxContainer';
import DisplaySelectedGroupContainer from '../DisplaySelectedGroupContainer';
import { setEditModePerScene } from '../../actions/FlagCheckBoxAction';
import { SELECTED_GROUP_MEMBERS_KEY } from '../../constants';

const ownPropsPhoneNumber = [];

class ContactsListContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this._render_row = this._render_row.bind(this);
    this._render_head = this._render_head.bind(this);
    this._getPaginatedItems = this._getPaginatedItems.bind(this);
    this._next_offset = this._next_offset.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
    this._makeRemoteRequest = this._makeRemoteRequest.bind(this);
    // //console.log('[ContactsContainer] constructor');
  }
  componentWillMount() {
    console.log('[ContactsListContainer] componentWillMount ', this.props);

    this.state.byId = this.props.byId;
    this.state.allIds = this.props.allIds;
    this.state.per_page = 30;
    this.state.page = 1;
    this.state.seed = 1;
    this.state.searchTerm = '';
    this.state.textInputSearch = this.props.inputSearch;
    this.state.deviceId = this.props.deviceId;
    this.state.refreshing = false;
    this.state.loading = false;
    this.state.fetchOnceInProcess = this.props.fetchOnceInProcess;
    this.state.fetchAllInProcess = this.props.fetchAllInProcess;

    this.state.editMode = this.props.editMode;
    this.state.exceptContacts = this.props.exceptContacts;

    // listAllLocal
    this._setDataSource();

    // allData allData2
    this._getPaginatedItems((paginatedData) => {
      this.setState({
        allData: paginatedData.allData,
        allData2: paginatedData.allData2,
        editMode: this.props.editMode
      });
    });
    this.props.setEditModePerScene(SELECTED_GROUP_MEMBERS_KEY, true);
  }
  componentWillReceiveProps(nextProps) {
    // //console.log('[ContactsContainer] componentWillReceiveProps ', nextProps);
    this.state.byId = nextProps.byId;
    this.state.allIds = nextProps.allIds;
    this.state.fetchOnceInProcess = nextProps.fetchOnceInProcess;
    this.state.fetchAllInProcess = nextProps.fetchAllInProcess;
    this.state.textInputSearch = nextProps.inputSearch;
    this.state.editMode = nextProps.editMode;
    this.state.exceptContacts = nextProps.exceptContacts;
    // listAllLocal
    this._setDataSource();
    this._getPaginatedItems((paginatedData) => {
      this.setState({
        allData: paginatedData.allData,
        allData2: paginatedData.allData2,
      });
    });
  }
  componentWillUnmount() {
  }
  _setDataSource() {
    this.state.listAllLocal =
      _.orderBy(
        this.state.allIds.map((v) => this.state.byId[v])
        , ['rayaku_status', 'name'], ['desc', 'asc']
      );
  }
  _makeRemoteRequest() {
    if (!this.state.fetchAllInProcess) {
      this.props.fetchOnceContact(this.state.deviceId);
      this.props.reloadLocalContacts({
        deviceId: this.state.deviceId,
        actionFlow: ['GroupContactsContainer._makeRemoteRequest']
      });
    }
  }
  _handleRefresh() {
    this._makeRemoteRequest();
  }
  _next_offset() {
    this.state.page += 1;
    if (this.state.listAllLocal.length / this.state.per_page > this.state.page) {
      this._getPaginatedItems((paginatedData) => {
        this.setState({
          allData: paginatedData.allData,
          allData2: paginatedData.allData2
        });
      });
    }
  }
  _getPaginatedItems(cb = () => {}) {
    // //console.log('[ContactsContainer] _getPaginatedItems');
    // filterData
    const items = this.state.textInputSearch !== '' ?
    _.filter(
      this.state.listAllLocal,
      (o) => {
        try {
          let result = false;
          const name = (o.name || '').toUpperCase();
          const inputSearch = this.state.textInputSearch.toUpperCase();
          if (name.includes(inputSearch) || o.phoneNumberNormalized.includes(inputSearch)) result = true;
          if (this.state.exceptContacts.indexOf(o.phoneNumberNormalized) !== -1) return false;
          return result;
        } catch (e) {
          return false;
        }
      }
    )
    : this.state.listAllLocal;

    const data_ordered = items;
    // const data_ordered = _.orderBy(items, ['rayaku_status', 'name'], ['desc', 'asc']);

    const page = this.state.page || 1;
    const offset = (page - 1) * this.state.per_page;
    const paginatedItems =
    _.slice(data_ordered, 0, offset + this.state.per_page);

    this.state.allData = _.filter(paginatedItems, { rayaku_status: 0 });
    this.state.allData2 = _.filter(paginatedItems, { rayaku_status: 1 });

    cb({
      allData: _.filter(paginatedItems, { rayaku_status: 0 }),
      allData2: _.filter(paginatedItems, { rayaku_status: 1 }),
    });
  }
  _render_head({ section }) {
    const title = section.title;
    return (
      <View
        style={{
          paddingBottom: 10,
          paddingTop: 3,
          paddingLeft: 11,
          backgroundColor: '#FFF'
        }}
      >
        <Text>{title}</Text>
      </View>
    );
  }

  _displaySelectedItems() {
    console.log('[ContactsListContainer] _displaySelectedItems contact');
    return (
      <DisplaySelectedGroupContainer />
    );
  }

  _renderCheckBox(uid, phoneName) {
    const screens = SELECTED_GROUP_MEMBERS_KEY;
    if (!this.state.editMode) return null;
    return (
      <CheckBoxContainer
       uid={uid}
       screens={screens}
       name={phoneName}
       displaySelectedItems={this._displaySelectedItems}
       />
    );
  }

  _render_row({ item }) {
    const v = item;
    const phoneName = v.name;
    const phone_number_display = v.phoneNumber;

    // console.log('_render_row', ownPropsPhoneNumber);
    let contactType = '';
    if (v.rayaku_status === 1) { contactType = 'MOBILE'; }

    return (
      <View style={{ flexDirection: 'row' }}>
      {this._renderCheckBox(v.uid, phoneName)}
        <Row
          key={v.uid}
          data={{
            name: phoneName,
            phone_number: phone_number_display,
            time: contactType,
            badge: null
          }}
            // profile_picture: this.props.user_detail.profile_picture || '' }}
        />
    </View>);
  }
  render() {
    console.log('[ContactsListContainer] render state=', this.state);

    return (
      <View>
        {/* <View>
          {this._displaySelectedItems()}
        </View> */}
        <SectionList
          renderItem={this._render_row}
          renderSectionHeader={this._render_head}
          sections={[ // homogenous rendering between sections
            { data: this.state.allData2, title: 'YOUR CONTACT' }
          ]}
          onEndReached={() => {
            this._next_offset();
          }}
          keyExtractor={(item) => item.uid}
          refreshing={this.state.fetchAllInProcess}
          onRefresh={this._handleRefresh}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const groupId = ownProps.groupId;
  const exceptContacts = (state.GroupReducer.byId[groupId] || {}).members || [];
  return {
    allIds: state.ContactsReducer.allIds,
    byId: state.ContactsReducer.byId,
    fetchOnceInProcess: state.ContactsReducer.fetchOnceInProcess,
    fetchAllInProcess: state.ContactsReducer.fetchAllInProcess,
    deviceId: state.SessionReducer.deviceId,
    editMode: state.FlagCheckBoxReducer.editModePerScene[SELECTED_GROUP_MEMBERS_KEY] || false,
    exceptContacts
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchOnceContact,
      fetchOnceByUid,
      reloadLocalContacts,
      setEditModePerScene
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsListContainer);
