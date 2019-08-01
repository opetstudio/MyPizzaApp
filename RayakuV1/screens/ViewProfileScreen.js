
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ViewProfileContainer from '../containers/ViewProfileContainer';

class ViewProfileScreen extends React.Component {
  componentWillMount() {
    ////console.log('ViewProfileScreen component componentWillMount', this.props);
  }
  render() {
    return (
        <ViewProfileContainer
           id={this.props.id}
           title={this.props.title}
           friendsPhoneNumber={this.props.friendsPhoneNumber}
           avatar={this.props.avatar}
           contactName={this.props.contactName}
           contactDetail={this.props.contactDetail}
           deviceId={this.props.deviceId}
           reloadLocalContacts={this.props.reloadLocalContacts}
        />
    );
  }
}

export default ViewProfileScreen;
