import React from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator } from 'react-navigation'
// import DrawerFooter from '../Containers/DrawerFooter'
// import DrawerHeader from '../Containers/DrawerHeader'
import LoginMethodScreen from '../Containers/Auth/LoginMethodScreen'
import HomeScreen from '../Containers/Home/HomeScreen'
import LoginScreen from '../Containers/Login/LoginScreen'
import Drawer from '../Containers/Drawer'
import navigatorHelper from '../Lib/helper/navigator'
import {isIphoneX} from '../Lib/helper/platform'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const menuRoutes = {
  HomeScreen: { screen: HomeScreen, navigationOptions: { drawerLabel: 'Home' } }
}
const PrimaryNav = DrawerNavigator(menuRoutes, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentComponent: props => <Drawer {...props} />
})

navigatorHelper.setMenuNavigationRoutes(menuRoutes)

const StackNav = StackNavigator({
  PrimaryNav: { screen: PrimaryNav },
  LoginMethodScreen: { screen: LoginMethodScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PrimaryNav',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

export default StackNav
