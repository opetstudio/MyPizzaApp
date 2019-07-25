import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import AppConfig from '../Config/AppConfig'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import codePush from 'react-native-code-push'
import firebase from 'react-native-firebase'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL }
// const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

class App extends Component {
  constructor (props) {
    super(props)
    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    firebase.admob().initialize(AppConfig.adPubID)
  }
  componentWillMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  _handleAppStateChange () {
    this._onButtonPress()
    // FCM.setBadgeNumber(0)
  }
  _onButtonPress () {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    })
  }
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
// export default DebugConfig.useReactotron
//   ? console.tron.overlay(App)
//   : codePush(codePushOptions)(App)
export default codePush(codePushOptions)(App)
