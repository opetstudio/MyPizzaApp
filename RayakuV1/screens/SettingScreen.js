
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import SettingContainer from '../containers/SettingsContainer';

class SettingScreen extends React.Component {
  componentWillMount() {
    ////console.log('routerflux component componentWillMount');
  }
  render() {
    return (
        <SettingContainer />
    );
  }
}

export default SettingScreen;
