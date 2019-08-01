/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  ScrollView,
  Text
}
from 'react-native';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';

import FcmTokenView from '../components/FcmTokenView';

class AboutContainer extends React.Component {
  state = {
    version: ''
  }
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    ////console.log('[AboutContainer] componentWillMount');
    this.state.version = this.props.version;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      version: nextProps.version
    });
  }
  componentDidMount() {

  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginTop: 10
        }}
      >
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onScroll={() => { console.log('onScroll!'); }}
        >
        <View
          style={{
            flex: 1,
            marginBottom: 15,
            marginTop: 15,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
            <Text style={{ fontWeight: '100', textAlign: 'center', marginTop: 150 }}>
            Rayaku Build v. {this.state.version}
            </Text>
            <FcmTokenView />
          </View>
        </ScrollView>

      </View>
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
)(AboutContainer);
