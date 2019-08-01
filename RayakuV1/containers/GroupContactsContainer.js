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

import { fetchOnceContact, fetchOnceByUid, reloadLocalContacts } from '../actions/ContactsAction';
import GroupContactsDetailContainer from './GroupContactsDetailContainer';
import { setEditModePerScene } from '../actions/FlagCheckBoxAction';

class GroupContactsContainer extends React.PureComponent {
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
    console.log('[GroupContactsContainer] componentWillMount ', this.props);

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
    this.props.setEditModePerScene(this.props.selectedKey, true);
  }
  componentWillReceiveProps(nextProps) {
    console.log('[GroupContactsContainer] componentWillReceiveProps ', nextProps);
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
        allData2: paginatedData.allData2
      });
    });
  }
  componentWillUnmount() {
  }
  _setDataSource() {
    const itemList = this.state.allIds.map((v) => this.state.byId[v]);
    let itemListFiltered = itemList;
    if (this.state.exceptContacts && this.state.exceptContacts.length > 0) {
      itemListFiltered = _.filter(
        itemList,
        (o) => {
          try {
            if (this.state.exceptContacts.indexOf(o.phoneNumberNormalized) !== -1) return false;
            return true;
          } catch (e) {
            return false;
          }
        }
      );
    }
    this.state.listAllLocal =
      _.orderBy(
        itemListFiltered
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
    // console.log('[GroupContactsContainer] _getPaginatedItems ', this.state.exceptContacts);
    // console.log('[GroupContactsContainer] _getPaginatedItems ', this.props.groupId);
    
    // filterData
    const items = this.state.textInputSearch !== '' ?
    _.filter(
      this.state.listAllLocal,
      (o) => {
        try {
          // console.log('[GroupContactsContainer] _getPaginatedItems ', o.phoneNumberNormalized);
          let result = false;
          const name = (o.name || '').toUpperCase();
          const inputSearch = this.state.textInputSearch.toUpperCase();
          if (name.includes(inputSearch) || o.phoneNumberNormalized.includes(inputSearch)) result = true;
          // console.log('[GroupContactsContainer] _getPaginatedItems ', o.phoneNumberNormalized);
          // if (this.state.exceptContacts.indexOf(o.phoneNumberNormalized) !== -1) return false;
          return result;
        } catch (e) {
          // console.log('[GroupContactsContainer] _getPaginatedItems ', e);
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

  _render_row({ item }) {
    return (
      <GroupContactsDetailContainer
        item={item}
        selectedKey={this.props.selectedKey}
        editMode={this.state.editMode}
      />
    );
  }
  render() {
    console.log('[GroupContactsContainer] render state=', this.state);

    return (
      <View>
        {/* <View> {this._displaySelectedItems()} </View> */}
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
  const exceptList = ownProps.except || [];
  return {
    allIds: state.ContactsReducer.allIds,
    byId: state.ContactsReducer.byId,
    fetchOnceInProcess: state.ContactsReducer.fetchOnceInProcess,
    fetchAllInProcess: state.ContactsReducer.fetchAllInProcess,
    deviceId: state.SessionReducer.deviceId,
    editMode: state.FlagCheckBoxReducer.editModePerScene[ownProps.selectedKey] || false,
    exceptContacts: [...exceptContacts, ...exceptList]
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
)(GroupContactsContainer);
