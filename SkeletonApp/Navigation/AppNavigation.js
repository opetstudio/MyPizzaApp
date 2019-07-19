import React from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Drawer from '../Containers/Drawer'
import navigatorHelper from '../Lib/helper/navigator'
import {isIphoneX} from '../Lib/helper/platform'
import ScreenAuthLoading from '../Components/ScreenAuthLoading'

import ScreenOnboard from '../Components/ScreenOnboard'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const menuRoutes = {
  ScreenOnboard: { screen: ScreenOnboard, navigationOptions: { drawerLabel: 'Home' } }
}
navigatorHelper.setMenuNavigationRoutes(menuRoutes)
const PrimaryNav = DrawerNavigator(menuRoutes, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenOnboard',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentComponent: props => <Drawer {...props} />
})
const loggedinNavigator = StackNavigator({PrimaryNav: { screen: PrimaryNav }}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PrimaryNav',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})
const unloggedinNavigator = StackNavigator({
  ScreenOnboard: { screen: ScreenOnboard }
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
