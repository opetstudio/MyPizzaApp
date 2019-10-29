// Simple React Native specific changes
import DeviceInfo from 'react-native-device-info'
import Config from 'react-native-config'
import cred from '../db'
import '../I18n/I18n'

export default {
  // font scaling override - RN default is on
  youtubeApiKey: 'AIzaSyC_o3QtJkKXN5WUWu1nL8I2zwWwmopEjm8',
  appVersion: '2.3.2',
  appVersionBuild: '44',
  appName: 'JemaatApp',
  isEmulator: DeviceInfo.isEmulator(),
  ipSandbox: '192.168.1.6',
  allowTextFontScaling: true,
  analyticsTrackerId: '',
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3773214315606599/8875243665', // com.opetstudio.sabbathschool banner
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3773214315606599/7083290085', // newJemaatAppBanner
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3773214315606599/8661626066' : 'ca-app-pub-3773214315606599/8661626066', // forumonline banner_1
  bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3773214315606599/8661626066', // forumonline banner_1
  // bannerAdUnitID: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-3940256099942544/6300978111', // for test
  // adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3773214315606599~8216768116', // com.opetstudio.sabbathschool
  // adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3773214315606599~9709453424', // opetstudio.jemaatapp
  // adPubID: __DEV__ ? 'ca-app-pub-3773214315606599~8801226867' : 'ca-app-pub-3773214315606599~8801226867', // forumonline
  adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3773214315606599~8801226867', // forumonline
  // adPubID: __DEV__ ? 'ca-app-pub-3940256099942544~3347511713' : 'ca-app-pub-3940256099942544~3347511713', // for test
  contributorSpace: 'Data Entry By Admin. God bless.',
  getContributorSpace: (contributorSpace) => {
    return `<div style="border: solid blue 2px; padding: 5px; margin-bottom: 70px;">${contributorSpace}</div>`
  },
  auth0: {
    clientId: cred.AUTH0_CLIENT_ID,
    host: cred.AUTH0_HOST
  },
  backendURL: cred.backendURL,
  isContributorSpaceActive: true,
  isCommentActive: true,
  isDrawerFooterActive: true,
  isAdsActive: true
}
