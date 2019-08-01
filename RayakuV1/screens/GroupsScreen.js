import React from 'react';
import {
  View,
  Text
}
from 'react-native';

import GroupList from '../components/group/GroupList';

class GroupsScreen extends React.Component {
  componentWillMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <GroupList />
    );
  }
}

export default GroupsScreen;
