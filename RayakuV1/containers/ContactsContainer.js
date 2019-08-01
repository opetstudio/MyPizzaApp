import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Share,
  Platform
}
from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import Row from '../components/Row';
import { fetchOnceContact, fetchOnceByUid, reloadLocalContacts } from '../actions/ContactsAction';
import ContactsDetailContainer from './ContactsDetailContainer';

const per_page = 30;

class ContactsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this._render_row = this._render_row.bind(this);
    this._render_head = this._render_head.bind(this);
    this._getPaginatedItems = this._getPaginatedItems.bind(this);
    this._next_offset = this._next_offset.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
    this._makeRemoteRequest = this._makeRemoteRequest.bind(this);
  }

  componentWillMount() {
    // //console.log('[ContactsContainer] componentWillMount ', this.props);
    this.state.byId = this.props.byId;
    this.state.allIds = this.props.allIds;
    this.state.per_page = 30;
    this.state.page = 1;
    this.state.seed = 1;
    this.state.searchTerm = '';
    this.state.textInputSearch = this.props.inputSearch;
    this.state.deviceId = this.props.session.deviceId;
    this.state.refreshing = false;
    this.state.loading = false;
    this.state.fetchOnceInProcess = this.props.fetchOnceInProcess;
    this.state.fetchAllInProcess = this.props.fetchAllInProcess;
    this.state.editMode = this.props.editMode;

    // listAllLocal
    this._setDataSource();

    // allData allData2
    this._getPaginatedItems();
  }
  componentWillReceiveProps(nextProps) {
    this.state.byId = nextProps.byId;
    this.state.allIds = nextProps.allIds;
    this.state.fetchOnceInProcess = nextProps.fetchOnceInProcess;
    this.state.fetchAllInProcess = nextProps.fetchAllInProcess;
    this.state.textInputSearch = nextProps.inputSearch;
    this.state.editMode = nextProps.editMode;

    // listAllLocal
    this._setDataSource();
    this._getPaginatedItems();
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
        actionFlow: ['ContactsContainer._makeRemoteRequest']
      });
    }
  }
  _handleRefresh() {
    // this.setState({
    //   page: 1,
    //   refreshing: true,
    //   seed: this.state.seed + 1
    // },
    // () => {
    //   this._makeRemoteRequest();
    // });
    this._makeRemoteRequest();
  }
  _next_offset() {
    this.state.page += 1;
    if (this.state.listAllLocal.length / this.state.per_page > this.state.page) {
      this._getPaginatedItems();
    }
  }
  _getPaginatedItems() {
    // console.log('[ContactsContainer] _getPaginatedItems');
    const items = this.state.textInputSearch !== '' ?
    _.filter(
      this.state.listAllLocal,
      (o) => {
        try {
          let result = false;
          const name = (o.name || '').toUpperCase();
          const inputSearch = this.state.textInputSearch.toUpperCase();
          if (name.includes(inputSearch) || o.phoneNumberNormalized.includes(inputSearch)) result = true;
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

    this.setState({
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
      <ContactsDetailContainer
        item={item}
        fetchOnceByUid={this.props.fetchOnceByUid}
      />
    );
  }

  render() {
    return (
      <SectionList
        renderItem={this._render_row}
        renderSectionHeader={this._render_head}
        sections={[ // homogenous rendering between sections
          { data: this.state.allData2, title: 'YOUR CONTACT' },
          { data: this.state.allData, title: 'INVITE TO USE RAYAKU' },
        ]}
        onEndReached={() => {
          this._next_offset();
        }}
        keyExtractor={(item) => item.uid}
        refreshing={this.state.fetchAllInProcess}
        onRefresh={this._handleRefresh}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const editMode = state.FlagCheckBoxReducer.editModePerScene[ownProps.keyForSelectBox] || false;
  return {
    allIds: state.ContactsReducer.allIds,
    byId: state.ContactsReducer.byId,
    fetchOnceInProcess: state.ContactsReducer.fetchOnceInProcess,
    fetchAllInProcess: state.ContactsReducer.fetchAllInProcess,
    deviceId: state.SessionReducer.deviceId,
    editMode
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchOnceContact,
      fetchOnceByUid,
      reloadLocalContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsContainer);
