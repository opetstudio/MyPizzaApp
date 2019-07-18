import React, { Component } from 'react'
import { View, AsyncStorage, StatusBar } from 'react-native'
import { Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import {SafeAreaView} from 'react-navigation'
import {isIphoneX} from '../Utils/helper/platform'

import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Dialog from '../Components/Dialog'
import StyledView from '../Components/StyledView'
import StyledStatusBar from './StyledStatusBar'

import PopupActions, { PopupSelectors } from '../Redux/PopupRedux'
// import RestapiActions from '../Redux/RestapiRedux'
// import RenpagiActions from '../Redux/RenpagiRedux'
// import SsdewasaActions from '../Redux/SsdewasaRedux'

// firebase
import firebase from 'react-native-firebase'
// import {registerAppListener} from '../Listeners'
// import firebaseClient from '../FirebaseClient'

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      uid: 'xxx',
      tokenCopyFeedback: '',
      isAuthenticated: false
    }
  }
  async componentWillMount () {
    // this.props.restapiRequest({ newerModifiedon: 1494844278993 })
    // this.props.renpagiRequest({ newerModifiedon: 1494844278993 })
    // this.props.ssdewasaRequest({ newerModifiedon: 1494844278993 })

    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
          uid: 'ok'
        })
      })
      .catch(e => this.setState({ uid: e }))

    // registerAppListener(this.props.navigation)
    if (!await firebase.messaging().hasPermission()) {
      try {
        await firebase.messaging().requestPermission()
      } catch (e) {
        alert('Failed to grant permission')
      }
    }
    firebase.database().goOnline()
    const fcmToken = firebase.database().ref('fcm_token')
    firebase.messaging().getToken().then(token => {
      const newState = {}
      newState.token = token || 'xxx'
      if (this.state.isAuthenticated) {
        newState.uid = firebase.auth().currentUser.uid
        fcmToken.child(newState.uid).set(newState)
      }
      this.setState(newState)
    })
    // topic example
    firebase.messaging().subscribeToTopic('sometopic')
    // firebase.messaging().unsubscribeFromTopic('sometopic')

    var offline = await AsyncStorage.getItem('headless')
    if (offline) {
      this.setState({
        offlineNotif: offline
      })
      AsyncStorage.removeItem('headless')
    }
  }
  componentDidMount () {
    SplashScreen.hide()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    // if (!this.state.isAuthenticated) return null
    const navigator = (<ReduxNavigation />)
    return (
      <Root>
        <StyledView style={{ paddingHorizontal: 0 }} isLoading={false}>
          {/* <StatusBar
            backgroundColor={Colors.colorPrimaryDark}
            barStyle='light-content'
          /> */}
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
          {/* {updateOverlay} */}
          <Dialog
            message={this.props.message}
            isOpen={this.props.isOpen}
            hidePopup={this.props.hidePopup}
          />
          {/* {this.generateOfflineToast()} */}
          {/* {React.Children.toArray(this.props.children)} */}
          {isIphoneX ? (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
              {navigator}
              {<View style={styles.fixBackgroundTop} />}
            </SafeAreaView>
          ) : (
            navigator
          )}
        </StyledView>

        {/* <View style={styles.applicationView}> */}
        {/* <StatusBar barStyle='light-content' /> */}
        {/* <Dialog
            message={this.props.message}
            isOpen={this.props.isOpen}
            hidePopup={this.props.hidePopup}
          />
          <ReduxNavigation />
        </View> */}
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: PopupSelectors.getPopupMessage(state.popup),
    // isOpen: false
    isOpen: PopupSelectors.getPopupOpen(state.popup),
      // locale: selectLocale(),
    loading: false,
  // error: selectError(),
  // loginStatus: selectStatus(),
    appState: 'active',
    appUpdate: false
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  appGoingBackground: () => {},
  appInFocus: () => {},
  // popupHide: () => dispatch(PopupActions.popupHide()),
  hidePopup: () => dispatch(PopupActions.popupHide())
  // restapiRequest: (query) => dispatch(RestapiActions.restapiRequest(query)),
  // renpagiRequest: (query) => dispatch(RenpagiActions.renpagiRequest(query)),
  // ssdewasaRequest: (query) => dispatch(SsdewasaActions.ssdewasaRequest(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
