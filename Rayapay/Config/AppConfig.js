// Simple React Native specific changes
import DeviceInfo from 'react-native-device-info'
import '../I18n/I18n'

const env = (__DEV__) ? 'development' : 'production'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  websocketEndpoin: {
    server1: 'ws://10.0.2.2:3000'
  },
  backendHost: env === 'development' ? 'http://10.0.2.2:8762' : 'http://159.65.131.214:30397',
  youtubeApiKey: 'AIzaSyC_o3QtJkKXN5WUWu1nL8I2zwWwmopEjm8',
  appVersion: '2.3.2',
  appVersionBuild: '44',
  appName: 'PizzaApp',
  isEmulator: DeviceInfo.isEmulator(),
  ipSandbox: '192.168.1.6',
  analyticsTrackerId: '',
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3773214315606599/8661626066' : 'ca-app-pub-3773214315606599/8661626066', // forumonline banner_1
  bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3773214315606599/8661626066', // forumonline banner_1
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3940256099942544/6300978111', // for test
  // adPubID: __DEV__ ? 'ca-app-pub-3773214315606599~8801226867' : 'ca-app-pub-3773214315606599~8801226867', // forumonline
  adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3773214315606599~8801226867', // forumonline
  // adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3940256099942544~3347511713', // for test
  contributorSpace: 'Data Entry By Admin. God bless.',
  getContributorSpace: (contributorSpace) => {
    return `<div style="border: solid blue 2px; padding: 5px; margin-bottom: 70px;">${contributorSpace}</div>`
  },
  env,
  isContributorSpaceActive: true,
  isCommentActive: true,
  isDrawerFooterActive: true,
  isAdsActive: true,
  authHeader: env === 'development' ? 'Authorization' : 'Authorization',
  authTokenType: 'Bearer',
  publicToken: 'publicToken',
  sessionToken: 'st',
  loginFlag: 'il',
  sessionData: 'ssst'
}
