import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
// import { NavigationActions } from 'react-navigation';
import NavigatorHelper from '../Utils/helper/navigator'
// import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
// import ScreenTracker from './ScreenTracker'
import {reducer as NavReducer} from '../Redux/NavigationRedux'

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
)
const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (Platform.OS === 'ios') return
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   const { dispatch, nav } = this.props
    //   // change to whatever is your first screen, otherwise unpredictable results may occur
    //   if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
    //     return false
    //   }
    //   // if (shouldCloseApp(nav)) return false
    //   dispatch({ type: 'Navigation/BACK' })
    //   return true
    // })
    BackHandler.addEventListener('hardwareBackPress', () => {
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
      if (getCurrentRouteName(nav) === 'HomeScreen') {
      // if (nav.routes.length > 1 && (nav.routes[0].index === 0 && nav.index === 0)) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
    // return <AppNavigation
    //   screenProps={{ locale: 'ID' }}
    //   navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener: createReduxBoundAddListener('root') })}
    //   // onNavigationStateChange={(prevState, currentState) => {
    //   // //   // this.props.dispatch()
    //   // //   // NavigationActions.navigate({
    //   // //   //   type: 'Navigation/NAVIGATE',
    //   // //   //   routeName,
    //   // //   //   params,
    //   // //   //   key,
    //   // //   // })
    //   // // {type: "Navigation/NAVIGATE", routeName: "RenunganpagiScreen"}
    //   //   // NavReducer(this.props.nav, this.props.dispatch({type: NavigationActions.NAVIGATE}))
    //   // //   // const state = reducer(INITIAL_STATE, Actions.userRequest(username))
    //   //   ScreenTracker({ prevState, currentState, dispatch: this.props.dispatch, state: this.props.nav
    //   //     // this.props.profile,
    //   //     // this.props.myPackagesList,
    //   //   })
    //   // }}
    //   ref={navigatorRef => {
    //     NavigatorHelper.setContainer(navigatorRef)
    //   }}
    // />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
