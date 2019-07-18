export function getDrawerCurrentRouteName(nav) {
  if (nav.index === 0) {
    return nav.routes[0].routes[0].routes[0].routes[0].routeName;
  } else {
    return 'notHome';
  }
}

// gets the current screen from navigation state
export function getCurrentRouteInfo(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteInfo(route);
  }
  return { routeName: route.routeName, params: route.params };
}

// gets the current screen from navigation state
export function getCurrentRouteState(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteState(route);
  }
  return route;
}

// gets the current screen from navigation state
export function clearRouteState(navigationState, routeName) {
  if (!navigationState) {
    return null;
  }
  let navigation = navigationState;
  while (navigation && navigation.routes) {
    navigation = navigation.routes[navigation.index];
    if (navigation && navigation.routeName === routeName) {
      navigation.routes = navigation.routes.slice(
        navigation.routes.length - 1,
        navigation.routes.length,
      );
      navigation.index = 0;
    }
  }
  return navigationState;
}
