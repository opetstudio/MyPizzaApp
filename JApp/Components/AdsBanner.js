import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AdsBannerStyle'

// import {
//   AdMobBanner
// } from 'react-native-admob'
import firebase from 'react-native-firebase'
import AppConfig from '../Config/AppConfig'

const Banner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest
const request = new AdRequest()
request.addKeyword('foobar')

export default class AdsBanner extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _bannerError (e) {
    __DEV__ && console.log('error admob=', e)
  }
  render () {
    if (!AppConfig.isAdsActive) return null
    return (
      <Banner
        unitId={AppConfig.bannerAdUnitID}
        onAdOpened={() => {
          __DEV__ && console.log('onAdOpened ====<<<<<')
        }}
        onAdLoaded={() => {
          __DEV__ && console.log('onAdLoaded ====<<<<<')
        }}
        onAdLeftApplication={() => {
          __DEV__ && console.log('onAdLeftApplication ====<<<<<')
        }}
        onAdClosed={() => {
          __DEV__ && console.log('onAdClosed ====<<<<<')
        }}
        // onAdFailedToLoad={(e) => {
        //   __DEV__ && console.log('onAdFailedToLoad ====<<<<<', e)
        // }}
        request={request.build()}
      />
    )
  }

  // render () {
  //   return (
  //     <AdMobBanner
  //       adSize='fullBanner'
  //       adUnitID={AppConfig.bannerAdUnitID}
  //       // testDeviceID={AdMobBanner.simulatorId}
  //       onAdFailedToLoad={this._bannerError}
  //     />
  //   )
  // }
}
