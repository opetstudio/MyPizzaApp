import React from 'react';
import {
  View,
  FlatList,
  AppState,
  TouchableOpacity
}
from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import GroupRowLayout from './RowLayout';
import {
  user_group as fetchUserGroup,
  user_group_message as fetchUserGroupMessag
} from '../../actions/GraphqlAction';
import { setInProgressFetchListGroupFalse } from '../../actions/GroupprofileAction';

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._render_row = this._render_row.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._setDataSource = this._setDataSource.bind(this);
    this._getPaginatedItems = this._getPaginatedItems.bind(this);
    this._next_offset = this._next_offset.bind(this);
    this._handleRefresh = this._handleRefresh.bind(this);
  }
  componentWillMount() {
    console.log('[GroupsContainer] componentWillMount ', this.props);
    // graphql(MY_QUERY)(props => <div>...</div>);
    AppState.addEventListener('change', this._handleAppStateChange);

    // this.props.fetchUserGroup({ user_id: this.props.user_id }, () => {
    //   // this.props.fetchUserGroupMessag({ user_id: this.props.user_id });
    // });
    this.state.listAllData = [];
    this.state.paginatedData = [];
    this.state.page = 1;
    this.state.seed = 1;
    this.state.per_page = 15;
    this.state.readInProgress = this.props.readInProgress;
    this.state.totalGroups = this.props.totalGroups;
    // set totalItems
    this._setDataSource();
    
    this.props.setInProgressFetchListGroupFalse();
  }
  componentWillReceiveProps(nextProps) {
    console.log('[GroupsContainer] componentWillReceiveProps ', nextProps);
    this._setDataSource();
    this.setState({ readInProgress: nextProps.readInProgress, totalGroups: nextProps.totalGroups });
  }
  componentWillUnmount() {
    console.log('[GroupsContainer] componentWillUnmount');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentDidMount() {
    console.log('[GroupsContainer] componentDidMount');
  }
  _setDataSource() {
    const listAllData = _.orderBy(_.map(this.props.byId, (v) => ({ ...v })) || [], ['lastMessageTime'], ['desc']);
    this.state.totalItems = this.state.listAllData.length;
    this.state.listAllData = listAllData;
    this._getPaginatedItems();
  }
  _getPaginatedItems() {
    const offset = (this.state.page - 1) * this.state.per_page;
    const paginatedData = _.slice(this.state.listAllData, 0, offset + this.state.per_page);
    this.setState({
      paginatedData
    });
  }
  _next_offset() {
    if (this.state.totalItems / this.state.per_page < this.state.page) return false;
    this.state.page += 1;
    this._getPaginatedItems();
    return true;
  }
  _handleRefresh() {
    console.log('[GroupsContainer] _handleRefresh');
    this.props.fetchUserGroup({ user_id: this.props.user_id }, () => {
      // this.props.fetchUserGroupMessag({ user_id: this.props.user_id });
    });
  }
  _handleAppStateChange() {
  }
  _render_row({ item }) {
    const val = item;
    return (
      <TouchableOpacity
                onPress={() => Actions.conversations({
                    conversation_id: val.id,
                    title: val.name,
                    friendsPhoneNumber: val.id,
                    contactDetail: val,
                    isGroup: true
                })}
                onLongPress= {() => {}}
            >
      <GroupRowLayout groupId={item.id} />
      </TouchableOpacity>
    );
  }
  render() {
    console.log('[GroupsContainer] render ', this.state);
    // if(!this.state.user_group) return null;
    return (
      <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            marginTop: 10
          }}
        >
          <FlatList
            data={this.state.paginatedData}
            renderItem={this._render_row}
            keyExtractor={(item) => item.id }
            initialNumToRender={3}
            onMomentumScrollEnd={() => {
              this._next_offset();
            }}
            refreshing={this.state.readInProgress}
            onRefresh={this._handleRefresh}
          />
        </View>
    );
  }
}

  function mapStateToProps(state) {
    // console.log('[GroupsContainer] mapStateToProps state=', state);
    return {
      readInProgress: state.GroupReducer.readInProgress,
      byId: state.GroupReducer.byId,
      totalGroups: state.GroupReducer.allIds.length,
      user_id: state.SessionReducer.sessionPhoneNumber
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        fetchUserGroup,
        fetchUserGroupMessag,
        setInProgressFetchListGroupFalse
      },
      dispatch
    );
  }
  export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
