import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import WebsocketActions from '../Redux/WebsocketRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import AppConfig from '../Config/AppConfig'

// Styles
import styles from './Styles/RootContainerStyles'

// let client = new W3CWebSocket(AppConfig.websocketEndpoin.server1)

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._renderUnLogedinRouter = this._renderUnLogedinRouter.bind(this)
    this._renderLogedinRouter = this._renderLogedinRouter.bind(this)
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
      // client.onopen = (e) => {
      //   console.log('websocket client on open e=', e)
      // }
    }
    this.props.websocketSetup({timestamp: new Date()})
  }

  _renderUnLogedinRouter () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
  _renderLogedinRouter () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.login
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  websocketSetup: (action) => dispatch(WebsocketActions.websocketSetup(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
