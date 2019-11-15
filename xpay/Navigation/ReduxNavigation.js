import * as React from 'react'
import { BackHandler, Platform } from 'react-native'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
// import AppNavigationUnlogedin from './AppNavigationUnlogedin'
// import {createRootNavigator} from './RootNavigator'
// const Layout = createRootNavigator(true)

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
)
const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root')
// const ReduxAppNavigatorUnlogedin = reduxifyNavigator(AppNavigationUnlogedin, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (Platform.OS === 'ios') return
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props

      // gets the current screen from navigation state
      const getCurrentRouteName = (navigationState) => {
        if (!navigationState) {
          return null
        }
        const route = navigationState.routes[navigationState.index]
        // dive into nested navigators
        if (route.routes) {
          return getCurrentRouteName(route)
        }
        return route.routeName
      }
      // change to whatever is your first screen, otherwise unpredictable results may occur
      // if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
      const currentRouteName = getCurrentRouteName(nav)
        console.log('back navigation getCurrentRouteName(nav)===', currentRouteName)
      if (currentRouteName === 'HomeScreen' || currentRouteName === 'ScreenHome' || currentRouteName == 'ScreenLogin') {
        console.log(nav.routes)
        if (nav.routes.length > 0 && !nav.routes[0].isDrawerOpen) {
          this.backHandler.remove()
          return false
        }
          // if (nav.routes.length > 1 && (nav.routes[0].index === 0 && nav.index === 0)) {
        // return false
      }

      // change to whatever is your first screen, otherwise unpredictable results may occur
      // if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
      //   return false
      // }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    if (Platform.OS === 'ios') return
    // BackHandler.removeEventListener('hardwareBackPress', undefined)
    this.backHandler.remove()
  }

  render () {
    // if(false) {
    //   return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
    // } else {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
    // }
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(ReduxNavigation)
