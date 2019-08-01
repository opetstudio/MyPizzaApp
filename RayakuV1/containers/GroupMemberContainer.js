import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Platform,
  Keyboard
}
from 'react-native';
import { Actions } from 'react-native-router-flux';

import GroupMemberRowContainer from './GroupMemberRowContainer';
import { SELECTED_GROUP_MEMBERS_KEY } from '../constants';

class GroupMemberContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this._render_row = this._render_row.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this.state.flexMember = 1;
  }
  componentWillMount() {
     console.log('[GroupMemberContainer] componentWillMount ', this.props);
     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
     this.setState({
       members: this.props.members
     });
  }
  componentWillReceiveProps(nextProps) {
    console.log('[GroupMemberContainer] componentWillReceiveProps ', nextProps);
    this.setState({
      members: nextProps.members
    });
  }
  _keyboardDidShow(e) {
    if (Actions.currentScene === 'viewgroupprofile1') {
      this.setState({
        flexMember: 0
      });
    }
  }
  _keyboardDidHide(e) {
    if (Actions.currentScene === 'viewgroupprofile1') {
      this.setState({
        flexMember: 1
      });
    }
  }

  _render_row({ item }) {
    console.log('[GroupMemberContainer] _render_row=>', item);
    return (
        <GroupMemberRowContainer
          id={item}
          owner={this.props.owner}
          phone_number={this.props.phone_number}
          groupid={this.props.groupId}
         />
    );
  }
  render() {
    console.log('[GroupMemberContainer] render state=', Actions.currentScene);
    return (
      <View style={{
        flex: Platform.OS === 'ios' ? 1 : this.state.flexMember
      }}>
        <FlatList
          renderItem={this._render_row}
          data={this.state.members}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
}

export default connect((state, ownProps) => {
  console.log('[GroupMemberContainer] ownProps=', ownProps);
  const owner = (state.GroupReducer.byId[ownProps.groupId] || {}).owner || '';
  const membersGroup = (state.GroupReducer.byId[ownProps.groupId] || []).members;
  const listChecked = state.FlagCheckBoxReducer.listChecked[SELECTED_GROUP_MEMBERS_KEY] || [];
  let members = [];
  if (ownProps.isForNewGroup) {
    members = listChecked;
  } else {
    members = membersGroup;
  }
  console.log('[GroupMemberContainer] members=', members);
  return {
    owner,
    listChecked,
    members,
    phone_number: state.UserprofileReducer.phone_number
  };
})(GroupMemberContainer);
