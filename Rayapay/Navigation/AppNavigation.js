import React from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Drawer from '../Containers/Drawer'
import navigatorHelper from '../Lib/helper/navigator'
import {isIphoneX} from '../Lib/helper/platform'
import ScreenAuthLoading from '../Containers/ScreenAuthLoading'

import ScreenLogin from '../Containers/ScreenLogin'
// import ScreenHome from '../Components/ScreenHome'
import ScreenHome from '../Containers/ScreenHome'
import ScreenQr from '../Components/ScreenQr'
import ScreenTransactiondetail from '../Components/ScreenTransactiondetail'
import ScreenOTP from '../Components/ScreenOTP'
import ScreenTransactionsuccess from '../Components/ScreenTransactionsuccess'
import ScreenSignup from '../Components/ScreenSignup'
import ScreenScanThisQR from '../Components/ScreenScanThisQR'
import ScreenAmount from '../Components/ScreenAmount'
import ScreenEmailconfirm from '../Components/ScreenEmailconfirm'
import ScreenCard from '../Components/ScreenCard'
import ScreeSuccessBind from '../Components/ScreenSuccessBind'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const menuRoutes = {
  ScreenHome: { screen: ScreenHome, navigationOptions: { drawerLabel: 'Home' } }
}
navigatorHelper.setMenuNavigationRoutes(menuRoutes)
const DrawerMenuNavigator = DrawerNavigator(menuRoutes, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenHome',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentComponent: props => <Drawer {...props} />
})
const loggedinNavigator = StackNavigator({
  DrawerMenuNavigator: { screen: DrawerMenuNavigator },
  ScreenDashboard: { screen: ScreenHome},
  ScreenQr: { screen: ScreenQr},
  ScreenTransactiondetail: { screen: ScreenTransactiondetail},
  ScreenOTP: { screen: ScreenOTP},
  ScreenTransactionsuccess: { screen: ScreenTransactionsuccess},
  ScreenScanThisQR: { screen: ScreenScanThisQR},
  ScreenAmount: { screen: ScreenAmount},
  ScreenEmailconfirm: { screen: ScreenEmailconfirm},
  ScreenCard: { screen: ScreenCard},
  ScreenSuccessBind: { screen: ScreeSuccessBind}

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'DrawerMenuNavigator',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})
const unloggedinNavigator = StackNavigator({
  ScreenLogin: { screen: ScreenLogin },
  ScreenSignup: {screen: ScreenSignup}
}, {
    // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenLogin',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

const switchNavigator = createSwitchNavigator({
  ScreenAuthLoading,
  loggedinNavigator,
  unloggedinNavigator
}, { initialRouteName: 'ScreenAuthLoading' })

export default switchNavigator
