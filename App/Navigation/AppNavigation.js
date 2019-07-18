import React from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator, createSwitchNavigator } from 'react-navigation'
// import DrawerFooter from '../Containers/DrawerFooter'
// import DrawerHeader from '../Containers/DrawerHeader'
import LoginMethodScreen from '../Containers/Auth/LoginMethodScreen'
import HomeScreen from '../Containers/Home2/Home2Screen'
// import HomeScreen from '../Containers/Home/HomeScreen'
import LoginScreen from '../Containers/Login/LoginScreen'
import LoginScreen2 from '../Containers/LoginPage/LoginScreen2'
import LandingScreen from '../Containers/LandingPage/LandingScreen';
import Drawer from '../Containers/Drawer'
import navigatorHelper from '../Lib/helper/navigator'
import {isIphoneX} from '../Lib/helper/platform'
import ScreenLogin from '../Containers/ScreenLogin'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'

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
  LoginMethodScreen: { screen: LoginMethodScreen },
  LandingScreen: { screen: LandingScreen },
  ScreenLogin: { screen: ScreenLogin },
  LoginScreen2: {screen: LoginScreen2}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PrimaryNav',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

const AppStack = StackNav
const AuthStack = StackNavigator({
  // PrimaryNav: { screen: PrimaryNav },
  LoginMethodScreen: { screen: LoginMethodScreen },
  LandingScreen: { screen: LandingScreen },
  ScreenLogin: { screen: ScreenLogin },
  LoginScreen2: {screen: LoginScreen2}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ScreenLogin',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

const xxx = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default xxx
