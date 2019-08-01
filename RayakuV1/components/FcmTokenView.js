/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text
}
from 'react-native';
import FCM from "react-native-fcm";


class FcmTokenView extends React.Component {
  state = {
    fcm_token: ''
  }
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    ////console.log('[FcmTokenView] componentWillMount');
    FCM.getFCMToken().then(token => {
      ////console.log("[FcmTokenView] (getFCMToken)", token);
      this.setState({
        fcm_token: token
      })
    }).catch(err => {
        ////console.log("failed save TOKEN", err);
    });
  }
  render() {
    return (
      <View>
        <Text>{this.state.fcm_token}</Text>
      </View>
    );
  }
}

export default FcmTokenView;
