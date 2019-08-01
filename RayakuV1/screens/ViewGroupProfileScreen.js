import React from 'react';
import {
  View,
  StatusBar
} from 'react-native';

import GroupProfilePictureContainer from '../containers/groupprofile/GroupProfilePictureContainer';
import AddGroupMemberButtonContainer from '../containers/AddGroupMemberButtonContainer';
import GroupMemberContainer from '../containers/GroupMemberContainer';
import { colors } from '../styles/color.style';

class ViewGroupProfileScreen extends React.Component {
  componentWillMount() {
    console.log('ViewGroupProfileScreen component componentWillMount',this.props);
  }
  render() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={colors.black60} />
            <GroupProfilePictureContainer
              title={this.props.title}
              groupId={this.props.id}
            />
            <AddGroupMemberButtonContainer groupId={this.props.id}/>
            <GroupMemberContainer groupId={this.props.id}/>
        </View>
    );
  }
}

export default ViewGroupProfileScreen;
