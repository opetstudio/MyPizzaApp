import React from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Drawer from '../Containers/Drawer'
import navigatorHelper from '../Lib/helper/navigator'
import {isIphoneX} from '../Lib/helper/platform'

// SCREEN
import ScreenAuthLoading from '../Components/ScreenAuthLoading'
import ScreenOnboard from '../Components/ScreenOnboard'
import ScreenHome from '../Containers/ScreenHome'
import ScreenLogin from '../Containers/ScreenLogin'
import ScreenForgetpassword from '../Components/ScreenForgetpassword'
import ScreenSignup from '../Containers/ScreenSignup'
import ScreenBillpayment from '../Containers/ScreenBillpayment';

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const menuRoutes = {
  ScreenHome: { screen: ScreenHome, navigationOptions: { drawerLabel: 'Home' } }
}
navigatorHelper.setMenuNavigationRoutes(menuRoutes)
const drawerMenuNavigator = DrawerNavigator(menuRoutes, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenHome',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentComponent: props => <Drawer {...props} />
})
const loggedinNavigator = StackNavigator({
  drawerMenuNavigator: { screen: drawerMenuNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'drawerMenuNavigator',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})
const unloggedinNavigator = StackNavigator({
  ScreenOnboard: { screen: ScreenOnboard },
  ScreenLogin: { screen: ScreenLogin },
  ScreenForgetpassword: { screen: ScreenForgetpassword },
  ScreenSignup: { screen: ScreenSignup }
}, {
    // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenOnboard',
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
