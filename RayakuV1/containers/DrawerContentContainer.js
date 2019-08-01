/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  AppState,
  Platform,
  AsyncStorage,
  Alert
} from 'react-native';

import DrawerContent from '../components/drawer/DrawerContent'; //routerflux component

class DrawerContentContainer extends Component {
  render() {
    return(
      <DrawerContent
        versionApp={this.props.version}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    version: state.SessionReducer.version
  };
}

export default connect(
  mapStateToProps
)(DrawerContentContainer);
