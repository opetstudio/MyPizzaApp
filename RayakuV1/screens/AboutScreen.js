
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import AboutContainer from '../containers/AboutContainer';

class AboutScreen extends React.Component {
  componentWillMount() {
    ////console.log('routerflux component componentWillMount');
  }
  render() {
    return (
        <AboutContainer />
    );
  }
}

export default AboutScreen;
