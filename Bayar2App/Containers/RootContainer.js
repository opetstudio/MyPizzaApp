import React, { Component } from 'react'
import { Root } from 'native-base'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import ReduxNavigation from '../Navigation/ReduxNavigation'
import {isIphoneX} from '../Lib/helper/platform'
import StartupActions from '../Redux/StartupRedux'
import WebsocketActions from '../Redux/WebsocketRedux'
import ReduxPersist from '../Config/ReduxPersist'

// component
import Dialog from '../Components/Dialog'
import StyledView from '../Components/StyledView'
import StyledStatusBar from './StyledStatusBar'
import SafeArea from '../Components/SafeArea'

// Styles
import { Colors } from '../Themes'

import PopupActions, { PopupSelectors } from '../Redux/PopupRedux'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    SplashScreen.hide()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    this.props.websocketSetup({timestamp: new Date()})
  }
  render () {
    const navigator = (<ReduxNavigation />)
    return (
      <Root>
        <StyledView style={{ paddingHorizontal: 0 }} isLoading={false}>
          <StyledStatusBar
            translucent
            backgroundColor={
            isIphoneX
              ? Colors.colorPrimaryDark
              : Colors.colorPrimaryDark
          }
            barStyle='light-content'
            StatusBarAnimation='fade'
          />
          <Dialog
            message={this.props.message}
            isOpen={this.props.isOpen}
            hidePopup={this.props.hidePopup}
          />
          {isIphoneX ? (
            <SafeArea>{navigator}</SafeArea>
          ) : (
            navigator
          )}
        </StyledView>
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.login
    message: PopupSelectors.getPopupMessage(state.popup),
    isOpen: PopupSelectors.getPopupOpen(state.popup),
    loading: false,
    appState: 'active',
    appUpdate: false
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  websocketSetup: (action) => dispatch(WebsocketActions.websocketSetup(action)),
  hidePopup: () => dispatch(PopupActions.popupHide())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
