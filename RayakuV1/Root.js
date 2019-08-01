import React from 'react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import FCM from 'react-native-fcm';

import {
  Platform,
  PushNotificationIOS,
  BackHandler,
  AppState
} from 'react-native';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'firebase';
// import PushNotification from 'react-native-push-notification';
import { configureStore } from './store/configureStore';
import MainApp from './MainApp';
import { getFirebaseConf } from './conf';

const store = configureStore();
const persistor = persistStore(store);

// const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

// const firebase_account = `../cred/${Config.environment === 'production' ? 'prod' : 'dev'}/db`;

class Root extends React.Component {
    constructor(props) {
      super(props);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
    }
    componentWillMount() {
        // ////console.log('Root componentWillMount ', this.props);
        // alert(process.env.NODE_ENV);
        try {
          // if (!firebase.apps.length) {
            const fbconfig = getFirebaseConf();
            console.log('Root componentWillMount fbconfig = ', fbconfig);
            // firebase.initializeApp({});
            firebase.initializeApp(fbconfig);
          // } else {
          //   // //console.log('Root componentWillMount yyyy');
          // }
        } catch (e) {
          console.log('[Root] componentWillMount e=', e);
        }
    
        if (Platform.OS === 'ios') {
          // //console.log('componentWillMount platform ios');
          PushNotificationIOS.requestPermissions();
         PushNotificationIOS.addEventListener('register', (token) => {
          // //console.log('You are registered and the device token is: ', token);
         });
         PushNotificationIOS.addEventListener('notification', (notification) => {
          // //console.log('You have received a new notificationxx!', notification);
         });
         PushNotificationIOS.addEventListener('localNotification', (notification) => {
          // //console.log('You have received a new notification!', notification);
         });
         // PushNotificationIOS.addEventListener('register', (token) => {
         //  ////console.log('You are registered and the device token is: ', token);
         // });
         // PushNotificationIOS.addEventListener('notification', (notification) => {
         //  ////console.log('You have received a new notificationxx!', notification);
         // });
         // PushNotificationIOS.addEventListener('localNotification', (notification) => {
         //  ////console.log('You have received a new notification!', notification);
         // });
           //   PushNotificationIOS.presentLocalNotification({
           //     alertBody: 'This is a local notification!',
           //     category: 'something_happened'
           // });
           // PushNotification.localNotificationSchedule({
           //   message: 'Hello World', // (required)
           //   date: new Date(Date.now() + (3 * 1000)), // in 1 secs
           //   number: 1
           // });
        }
    
    
        const notifconfigOpt = {};
        notifconfigOpt.requestPermissions = true;
        notifconfigOpt.onNotification = (notification) => {
          // //console.log('onNotification', notification);
        };
        notifconfigOpt.onRegister = (token) => {
          // //console.log('onRegister', token);
        };
        // if (Platform.OS === 'ios') {
        //   notifconfigOpt.senderID = '1060562171114';
        // }
    
    
        // PushNotification.configure(notifconfigOpt);
        // PushNotification.setApplicationIconBadgeNumber(0);
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //   alert('cek');
        //   BackHandler.exitApp();
        //   return true;
        // });
        // if (Platform.OS === 'ios') {
        //   PushNotification.localNotificationSchedule({
        //     message: 'Hello user', // (required)
        //     date: new Date(Date.now() + (1 * 1000)), // in 1 secs
        //     number: 1
        //   });
        // }
        AppState.addEventListener('change', this._handleAppStateChange);
      }
      componentDidMount() {
        SplashScreen.hide();
     }
     componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
     }
     _handleAppStateChange() {
       this._onButtonPress();
       FCM.setBadgeNumber(0);
     }
     _onButtonPress() {
          codePush.sync({
              updateDialog: true,
              installMode: codePush.InstallMode.IMMEDIATE
          });
      }
    _exitApp() {
        // alert('do exit app on root');
        BackHandler.exitApp();
      }
      _hideSplashScreen() {
        SplashScreen.hide();
      }
    render() {
        return (
            <Provider store={store} persistor={persistor}>
               <MainApp
                exitApp={this._exitApp}
                hideSplashScreen={this._hideSplashScreen}
               />
            </Provider>
        );
    }
}

export default codePush(codePushOptions)(Root);
// export default Root;
