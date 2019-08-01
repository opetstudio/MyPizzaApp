/* @flow */

import React from 'react';
import {
  View,
  AppState,
  Platform,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceInfo from 'react-native-device-info';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
// import BackgroundTimer from 'react-native-background-timer';

// import CodePush from 'react-native-code-push';
import OverviewSlideShow from '../src/components/OverviewSlideShow';

import NotificationContainer from './containers/NotificationContainer';
import FirstloadDataContainer from './containers/FirstloadDataContainer';
import ContactsLoaderContainer from './containers/ContactsLoaderContainer';
// import SignupOverviewScreen from './screens/SignupOverviewScreen';
import Router from './Router';
// import RouterAndroid from './RouterAndroid';
import { sessionLogin, sessionLoginBackend, sessionSetVersion, setFcmToken, updateUserFirebase, setAppState } from './actions/SessionAction';
import { update_userprofile } from './actions/UserprofileAction';
import { isSignedIn, onSignIn } from './api/auth';

// import { fetchAll as fetchAllNotification } from './actions/NotificationAction';
// import { pushContacts, fetchAll as fetchAllContacts } from './actions/ContactsAction';
// import { fetchAll as fetchAllChats } from './actions/ChatsAction';

import RouterUnlogedin from './RouterUnlogedin';

import ToastExample from './modules/ToastExample';
// import CalendarManager from './modules/CalendarManager';

import { getVersion } from './utils/util';

// const Router = require('./Router');

// const RouterLogedin = Platform.select({
//   ios: () => require('RouterIos'),
//   android: () => require('RouterAndroid'),
// });

// import { version } from './env';

// type Props = {
//   receiver: string,
//   hideSplashScreen: Function,
//   sessionLogin: Function,
//   sessionSetVersion: Function,
//   exitApp: Function,
//   SessionReducer: {
//     token: string,
//     account: Object,
//     sessionPhoneNumber: string,
//     isLoggedIn: string,
//     deviceId: string
//   }
// };
//
// type State = {
//   value: number,
//   deviceId: string,
//   firstloadDataContainerInvoked: string,
//   session: {
//     isLoggedIn: string,
//     sessionPhoneNumber: string,
//     token: string, //from fb
//     account: Object, //from fb
//     deviceId: string
//   }
// };

// data session
const session = {
  isLoggedIn: '',
  sessionPhoneNumber: '',
  token: {}, // from fb
  account: {}, // from fb
  deviceId: '',
  display_name: '',
  profile_picture: ''
};


class MainApp extends React.Component {
  // _onLogedIn: Function;
  // _setVersion: Function;
  // _renderUnLogedinRouter: Function;
  // _renderLogedinRouter: Function;
  // _FirstloadDataContainerCallback: Function;
  // _getManufacturer: Function;
  // _handleAppStateChange: Function;

  state = {
    value: 0,
    deviceId: '',
    firstloadDataContainerInvoked: '',
    session: {
      isLoggedIn: '',
      sessionPhoneNumber: '',
      token: '', // from fb
      account: {}, // from fb
      deviceId: '',
      display_name: '',
      profile_picture: ''
    }
  }

  constructor(props) {
    super(props);
    this._setVersion = this._setVersion.bind(this);
    this._onLogedIn = this._onLogedIn.bind(this);
    this._renderUnLogedinRouter = this._renderUnLogedinRouter.bind(this);
    this._renderLogedinRouter = this._renderLogedinRouter.bind(this);
    // this._loadInitialState = this._loadInitialState.bind(this);
    this._FirstloadDataContainerCallback = this._FirstloadDataContainerCallback.bind(this);
    this._getManufacturer = this._getManufacturer.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._infoConnectedListener = this._infoConnectedListener.bind(this);
    this._setFcmTokenOnFirebase = this._setFcmTokenOnFirebase.bind(this);
    // //console.log('[MainApp] RayakuApp ==> constructor');
  }
  componentWillMount() {
    console.log('[MainApp] RayakuApp ==> componentWillMount', this.props);
    const deviceId = `${this._getManufacturer()}-${this._getUniqueID()}`;
    session.deviceId = deviceId;

    this.state.session.token = this.props.token;
    this.state.session.account = this.props.account;
    this.state.session.sessionPhoneNumber = this.props.sessionPhoneNumber;
    this.state.session.isLoggedIn = this.props.isLoggedIn;
    this.state.session.deviceId = this.props.deviceId || deviceId;
    this.state.deviceId = deviceId;

    // //console.log('[MainApp] RayakuApp ==> componentWillMount device Id', this.state.deviceId);

    // this.state.session.profile_picture = this.props.profile_picture;
    // this.state.session.display_name = this.props.display_name;

    if (this.state.session.isLoggedIn === null) {
      isSignedIn(session)
        .then((res) => {
          console.log('[MainApp] componentWillMount isSignedIn. success', res);
          console.log('[MainApp] componentWillMount isSignedIn. success', this.props);
          if (res !== null) {
            this.setState({
              session: res
            });
            this._infoConnectedListener(res);
            this._setFcmTokenOnFirebase(res.sessionPhoneNumber);
            this.props.sessionLogin('doReLogin', this.props.isLoggedIn, res, (e, dataUser) => {
              // Alert.alert(e);
              if (e || !dataUser) {
                if (e !== 'USER_ALREADY_LOGEDIN' && e !== 'MSISDN_NOT_FOUND') Alert.alert(e);
              }
            });
          }
        }).catch(() => {
          console.log('[MainApp] componentWillMount isSignedIn. An error occurred ', err);
          Alert.alert('An error occurred');
        });
     } else {
       this._setFcmTokenOnFirebase(this.state.session.sessionPhoneNumber);
     }
     this._setVersion();
     AppState.addEventListener('change', this._handleAppStateChange);

     if (Platform.OS === 'android') {
      //  ToastExample.show('Rayaku Beta version', ToastExample.SHORT);
     } else {
       // CalendarManager.addEvent('One', 'Two', 3);
     }
  }
  componentDidMount() {
    // //console.log('[MainApp] tracingloggedin RayakuApp ==> componentDidMount');
    // AppState.addEventListener('change', this.handleAppStateChange);
    // CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
  }
  componentWillReceiveProps(nextProps) {
    console.log('[MainApp] RayakuApp ==> componentWillReceiveProps', nextProps);
    console.log('[MainApp] RayakuApp ==> componentWillReceiveProps', this.state);
    if (this.state.session.isLoggedIn === null || this.state.session.isLoggedIn === 'no') {
      const dataSession = {
        token: nextProps.token,
        account: nextProps.account,
        sessionPhoneNumber: nextProps.sessionPhoneNumber,
        isLoggedIn: nextProps.isLoggedIn
      };

      this.setState({
        ...this.state,
        session: {
          ...this.state.session,
          ...dataSession
        },
      });
    }
  }
  componentWillUnmount() {
    // //console.log('[MainApp] componentWillUnmount', this.props);
    AppState.removeEventListener('change', this._handleAppStateChange);

    //  AppState.removeEventListener('change', this.handleAppStateChange);
     // this.props.exitProper('yes');
     setAppState(this.state.session.sessionPhoneNumber, AppState.currentState);
     updateUserFirebase(this.state.session.sessionPhoneNumber, {
       state: AppState.currentState,
       platform: Platform.OS
     });
  }
  _setFcmTokenOnFirebase(phoneNumber) {
    FCM.getFCMToken().then((token) => {
      setFcmToken(phoneNumber, token);
    });
  }
  _handleAppStateChange() {
    // //console.log('[MainApp] _handleAppStateChange call SessionAction.updateUserFirebase');
    updateUserFirebase(this.state.session.sessionPhoneNumber, {
      state: AppState.currentState,
      platform: Platform.OS
    });
    if (Platform.OS === 'ios') {
      if (AppState.currentState !== 'active') {
        // ////console.log('[BackgroundService] start timer ');
        // BackgroundTimer.start();
        // BackgroundTask.schedule({
        //   period: 60, // Aim to run every 1 mins - more conservative on battery
        // });
      } else {
        // BackgroundTask.cancel();
        // BackgroundTimer.stop();
      }
    }
  }
  _infoConnectedListener({ sessionPhoneNumber, deviceId }) {
// //console.log('[MainApp] _infoConnectedListener. sessionPhoneNumber =>',sessionPhoneNumber);

    if (this.state.session.sessionPhoneNumber !== '') {
      const connectedRef = firebase.database().ref('.info/connected');
      connectedRef.on('value', (snap) => {
        // //console.log('[MainApp] _infoConnectedListener on value =>', snap.val());
        // let updateUser = { info_connected: 'yes' };
        let info_connected = 'yes';
        if (snap.val() === true) {
          info_connected = 'yes';
          // updateUser = { info_connected: 'yes' };
          // alert("connected");
        } else {
          info_connected = 'no';
          // alert("not connected");
          // updateUser = { info_connected: 'no' };
        }
        FCM.getFCMToken().then((token) => {
          updateUserFirebase(sessionPhoneNumber, {
            state: AppState.currentState,
            platform: Platform.OS,
            info_connected,
            device_id: deviceId,
            fcm_token: token
          });
        });
        // firebase.database().ref(`/users/${sessionPhoneNumber}`)
        // .update(updateUser)
        // .then(() => {
        // });
      });
    }
  }
  _setVersion() {
    getVersion((v) => {
      this.props.sessionSetVersion(v);
      this.props.update_userprofile({
        phone_number: this.state.session.sessionPhoneNumber,
        version: v
      }, true);
    });
  }
  _getUniqueID() {
    let uniqueid = '';
    try {
      uniqueid = DeviceInfo.getUniqueID();
    } catch (e) {
      // error saat getUniqueID
      uniqueid = new Date().getTime();
    }
    return uniqueid;
  }
  _getManufacturer() {
    let manufacturer = '';
    try {
      manufacturer = DeviceInfo.getManufacturer();
      console.log('[MainApp] _getManufacturer manufacturer=', manufacturer);
    } catch (e) {
      console.log('[MainApp] _getManufacturer e=', e);
      // error saat getManufacturer
      manufacturer = 'rayakudevice';
    }
    return manufacturer;
  }
  _onLogedIn(token, account) {
    console.log('[MainApp] token=>', token);
    console.log('[MainApp] account=>', account);
    // this.props.updateSession({ token, account });
    if (this.state.session.isLoggedIn !== 'yes') {
      // //console.log('this.state.session.isLoggedIn !== yes');
      const phone_number = `${account.phoneNumber.countryCode}${account.phoneNumber.number}`;
      // //console.log('1) [MainApp] onLogedIn', phone_number);
      const self = this;

      // //console.log('[MainApp] onLogedIn deviceId', self.state.deviceId);

      // firebase.database().ref(`/users/${phone_number}`)
      // .once('value')
      // .then((snapshot) => {
      //     const userDetail = snapshot.val() || {};
      //     self.props.update_userprofile(userDetail, false);
      //   })
      //   .catch((err) => {
      //     console.log('An error occurred ', err);
      //   });

        const dataSession = {
          session: {
            ...session,
            isLoggedIn: 'yes',
            deviceId: self.state.deviceId,
            sessionPhoneNumber: phone_number,
            token, // from fb
            account // from fb
            // display_name: userDetail.display_name || '',
            // profile_picture: userDetail.profile_picture || '',
            // profile_picture_device: '' //get from database
          }
        };
        self.props.sessionLogin('doLogin', this.props.isLoggedIn, dataSession.session, (e, userDetail) => {
          console.log('[MainApp] =====>>>>>>>>>>e', e);
          console.log('[MainApp] =====>>>>>>>>>>e', this.props);
          if (e || !userDetail) {
            Alert.alert(e);
            return false;
          }
          self.props.update_userprofile(userDetail, false);
          onSignIn(dataSession.session)
          .then((res) => {
            console.log('[MainApp] onSignIn res=>', res);
            // //console.log('on signIn');
            //  if (res !== null) {
            //    // self.setState({
            //    //   session: res
            //    // });
            //    self.state.session = res;
            //    self.props.sessionLogin(res, (e, userDetail) => {
            //       self.props.update_userprofile(userDetail, false);
            //    });
            //   }
          })
          .catch((err) => {
            console.log('An error occurred ', err);
          });
        });
      // sessionLoginBackend({ phone_number });
      // this._setLogedinFlag(dataSession);
    }

      // reactContacs.getAll((err, contacts) => {
      //   if (err === 'denied') {
      //     // error
      //   } else {
      //     // contacts returned in []
      //     // if (this.props.ContactsReducer.listAll.length === 0) {
      //       this.props.pushContacts({
      //         phone_number: this.props.SessionReducer.sessionPhoneNumber,
      //         contacts
      //       });
      //     // }
      //
      //     // this.props.fetchAllContacts({
      //     //   currentListAllArr: this.props.ContactsReducer.listAll,
      //     //   phone_number: this.props.SessionReducer.sessionPhoneNumber,
      //     // });
      //   }
      // });

      // get user contacts
      // reactContacs
    // }
  }

  _render_overview() {
    return (
      <OverviewSlideShow
        onLogedIn={(t, a) => this._onLogedIn(t, a)}
      />
    );
  }
  // _listen_notification() {
  //   const currentListAll = this.props.NotificationReducer.listAll;
  //   const myPhoneNumber = this.props.sessionPhoneNumber;
  //   const myPhoneNumberB64 = myPhoneNumber;
  //   this.props.fetchAllNotification({
  //     myPhoneNumberB64,
  //     currentListAll
  //   });
  // }

  _FirstloadDataContainerCallback() {
      this.setState({
        ...this.state,
        firstloadDataContainerInvoked: 'yes'
      });
  }
  _renderLogedinRouter() {
        return (
          <View
            style={{ flex: 1 }}
          >
            <Router
               exitApp={this.props.exitApp}
               hideSplashScreen={this.props.hideSplashScreen}
               session={this.state.session}
            />
            <FirstloadDataContainer
                deviceId={this.state.deviceId}
                session={this.state.session}
              />
              <ContactsLoaderContainer
                session={this.state.session}
                deviceId={this.state.deviceId}
              />
              <NotificationContainer
                session={this.state.session}
                deviceId={this.state.deviceId}
              />
          </View>
        );
      // end the
  }
  _renderUnLogedinRouter() {
    return (
      <View
        style={{ flex: 1 }}
      >
      <RouterUnlogedin
       screenProps={{
         onLogedIn: this._onLogedIn,
         hideSplashScreen: this.props.hideSplashScreen
       }}
      />
      <ContactsLoaderContainer
        session={{ tes: 'hehehe' }}
        deviceId={this.state.deviceId}
      />
      </View>

    );
  }

  render() {
    console.log('[MainApp] render RayakuApp state=', this.state);
    const isLoggedIn = this.state.session.isLoggedIn;
    if (isLoggedIn === '' || isLoggedIn === null) { return null; }
    if (isLoggedIn === 'yes' && this.state.session.sessionPhoneNumber !== '') { return this._renderLogedinRouter(); }
    return this._renderUnLogedinRouter();
  }
}
// export default RayakuApp;

function mapStateToProps(state) {
  return {
    // SessionReducer: state.SessionReducer,
    token: state.SessionReducer.token,
    account: state.SessionReducer.account,
    isLoggedIn: state.SessionReducer.isLoggedIn,
    sessionPhoneNumber: state.SessionReducer.sessionPhoneNumber,
    deviceId: state.SessionReducer.deviceId,
    // profile_picture: state.SessionReducer.profile_picture,
    // display_name: state.SessionReducer.display_name

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sessionLogin,
      sessionLoginBackend,
      sessionSetVersion,
      update_userprofile
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
