import { NavigationActions } from 'react-navigation'
// import { delay } from 'lodash'

let _container
let currentRouteInfo = { routeName: 'Browse' }
let currentState = {}
let _menuRouteNames = null

function setContainer (container) {
  _container = container
}

function setCurrentRouteInfo (route) {
  currentRouteInfo = route
}

function setCurrentState (state) {
  currentState = state
}

function getCurrentState () {
  return currentState
}

function getCurrentRouteInfo () {
  return currentRouteInfo
}

function navigate (routeName, params, key) {
  if (getCurrentRouteInfo().routeName === 'DrawerOpen') {
    _container._navigation.navigate('DrawerClose')
  }
  // NavigationActions.navigate(routeName)
  // delay(
  //   () =>
  //     _container.dispatch(
  //       NavigationActions.navigate({
  //         type: 'Navigation/NAVIGATE',
  //         routeName,
  //         params,
  //         key,
  //       }),
  //     ),
  //   0,
  // )
}

function dispatch (action) {
  _container.dispatch(action)
}

function goBack (key) {
  _container.dispatch(NavigationActions.back({ key }))
}

/**
 * Mark down the available routes within menu
 * @param menuRoutes the route object used to configure drawer navigator
 */
function setMenuNavigationRoutes (menuRoutes) {
  _menuRouteNames = Object.keys(menuRoutes)
}

/**
 * Check if the target route is available within menu. This helps protect
 * from abusing hamburger button for menu navigation in Header component
 * @param routeName the name of the route to navigate to
 * @returns {*} whether or not the route is available
 */
function isMenuNavigationAllowed (routeName) {
  console.log('isMenuNavigationAllowed routeName=', routeName)
  if (_menuRouteNames) {
    return _menuRouteNames.includes(routeName)
  }
  throw new Error(
    'If you want to navigate using menu, please set available routes first (setMenuNavigationRoutes), ' +
      'this check intends to prevent misuse of menu navigation for routes in stack navigator, ' +
      'which leads to unexpected and weird behaviours'
  )
}

export default {
  dispatch,
  getCurrentRouteInfo,
  getCurrentState,
  goBack,
  navigate,
  setContainer,
  setCurrentRouteInfo,
  setCurrentState,
  setMenuNavigationRoutes,
  isMenuNavigationAllowed
}
