
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ContactSettingContainer from '../containers/ContactSettingContainer.js';

class ContactSettingScreen extends React.Component {
  componentWillMount() {
    ////console.log('routerflux component componentWillMount');
  }
  render() {
    return (
        <ContactSettingContainer />
    );
  }
}

export default ContactSettingScreen;
