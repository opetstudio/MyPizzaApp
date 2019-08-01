import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  Text
}
from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import GroupPictureContainer from '../containers/GroupPictureContainer';
import GroupMemberContainer from '../containers/GroupMemberContainer';
import allStyles from '../styles/defaults.style';
import { colors } from '../styles/color.style';
import { SELECTED_GROUP_MEMBERS_KEY } from '../constants';


class GroupsProfileScreen extends React.Component {
  componentWillMount() {
    // //console.log('componentWillMount');
  }
  render() {
    // if (this.props.listChecked.length === 0) Actions.pop();
    return (
        <View style={allStyles.allContainer}>
          <GroupPictureContainer session={this.props.session}/>
          <View style={{ flex: 0.1 }}><Text style={{ color: colors.darkGray }}>Members</Text></View>
          <GroupMemberContainer
            isForNewGroup={true}
          />
        </View>
    );
  }
}
export default connect((state) => {
  return { listChecked: state.FlagCheckBoxReducer.listChecked[SELECTED_GROUP_MEMBERS_KEY] || [] };
})(GroupsProfileScreen);
