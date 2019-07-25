import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
import { forEach, isUndefined, toString } from 'lodash'
import NavigationHelper from '../Utils/helper/navigator'
import AppConfig from '../Config/AppConfig'
import { getCurrentRouteInfo } from '../Utils/helper/currentRouteName'
import {reducer as NavReducer} from '../Redux/NavigationRedux'
import {NavigationActions} from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

const tracker = new GoogleAnalyticsTracker(AppConfig.analyticsTrackerId)

const filterScreenName = (screenName) => {
  switch (screenName) {
    case 'VideoPlayerFullScreen': {
      return 'VideoPlayer'
    }
    default: {
      return screenName
    }
  }
}
const getScreenName = (title, screen) => {
  if (title === 'maxstream-live-events') {
    return 'LiveEventListing'
  } else if (title === 'maxstream-channel') {
    return 'ChannelListing'
  } else {
    forEach(title, t => (screen = `${screen}-${t}`))
    return screen
  }
}

const ScreenTracker = ({prevState, currentState, profile, myPackagesList, state, dispatch}) => {
  const currentScreenInfo = getCurrentRouteInfo(currentState)
  const prevScreenInfo = getCurrentRouteInfo(prevState)
  NavigationHelper.setCurrentRouteInfo(currentScreenInfo)
  NavigationHelper.setCurrentState(currentState)

  // NavReducer(state, dispatch({type: NavigationActions.NAVIGATE, routeName: currentScreenInfo.routeName}))

  __DEV__ && console.log('[ScreenTracker] currentState', currentState)
  __DEV__ && console.log('[ScreenTracker] currentScreenInfo', currentScreenInfo)
  if (
    !currentScreenInfo.routeName.match('DrawerOpen') &&
    prevScreenInfo.routeName !== currentScreenInfo.routeName
  ) {
    let screen = filterScreenName(currentScreenInfo.routeName)
    __DEV__ && console.log('[ScreenTracker] screen', screen)
    // tracker.trackScreenView(screen)
  }
}

export default ScreenTracker
