import firebase from 'firebase';
import _ from 'lodash';
import { Platform, AppState, AppRegistry } from 'react-native';
// import BackgroundJob from 'react-native-background-job';
import BackgroundTask from 'react-native-background-task';
// import BackgroundTimer from 'react-native-background-timer';

import FCM from "react-native-fcm";


import {registerKilledListener, registerAppListener} from "./Listeners";
import { setFcmTokenAsyncStorage } from './api/asyncstorageApi';

import { isSignedIn } from './api/auth';
import { getContactsAsyncStorage } from './api/asyncstorageApi';
import { updateMessageToDeliveredOnServer,
setMessageDataFromNotification } from './actions/ConversationAction';
import { getStatusDeliveryNotifData,
  getTotalbadgeNumber,
  pushRemoteNotification,
  runBackgroundProcess as notificationBackgroundProcess } from './actions/NotificationAction';

import {
  runJob,
  task
} from './backgroundjob/notificationLoader';

const regularJobKey = 'regularJobKey';
// firebase.initializeApp({
//   apiKey: 'AIzaSyD58G4sYKgJq6yWa5jdtjRl9JhtsFkf_kE',
//   authDomain: 'rayaku-testbed.firebaseapp.com',
//   databaseURL: 'https://rayaku-testbed.firebaseio.com',
//   projectId: 'rayaku-testbed',
//   storageBucket: 'rayaku-testbed.appspot.com',
//   messagingSenderId: '1060562171114'
// });

//data session
const session = {
  isLoggedIn: null,
  sessionPhoneNumber: '',
  token: {}, //from fb
  account: {}, //from fb
  deviceId: ''
};

registerKilledListener();

const regeisterJob = (sessionPhoneNumber, contacts) => {
  if (Platform.OS === 'android') {
    // AppRegistry.registerHeadlessTask('notificationLoader', () => require('./backgroundjob/notificationLoader').task(sessionPhoneNumber, contacts));
  } else {
    // BackgroundTask.define(require('./backgroundjob/notificationLoader').task(sessionPhoneNumber, contacts));
    BackgroundTask.define(require('./backgroundjob/notificationLoader').task());
  }

  // if (Platform.OS === 'android') {
  //   BackgroundJob.register({
  //     jobKey: regularJobKey,
  //     job: () => {
  //       runJob({
  //         sessionPhoneNumber,
  //         contacts
  //       });
  //     }
  //   });
  // } else {
  //   BackgroundTask.define(async () => {
  //     // Fetch some data over the network which we want the user to have an up-to-
  //     // date copy of, even if they have no network when using the app
  //     // const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')
  //     // const text = await response.text()
  //     ////console.log('[BackgroundService] Hello from a background task');
  //     // Data persisted to AsyncStorage can later be accessed by the foreground app
  //     // await AsyncStorage.setItem('@MyApp:key', text)
  //     runJob({
  //       sessionPhoneNumber,
  //       contacts
  //     });
  //     // Remember to call finish()
  //     // BackgroundTask.finish();
  //   });
  // }
};
let theSessionPhoneNumber = '';
let theContacts = '';

export const _handleAppStateChange = () => {
  ////console.log('[BackgroundService] _handleAppStateChange ', AppState.currentState);
  // runJob({
  //   sessionPhoneNumber: theSessionPhoneNumber,
  //   contacts: theContacts
  // });
  if(Platform.OS === 'ios') {
    if (AppState.currentState !== 'active') {
      // ////console.log('[BackgroundService] start timer ');
      // BackgroundTimer.start();
      BackgroundTask.schedule({
        period: 60, // Aim to run every 1 mins - more conservative on battery
      });
    } else {
      BackgroundTask.cancel();
      // BackgroundTimer.stop();
    }
  }
};

export const runBackgroundProcess = () => {
  // notificationBackgroundProcess();
}

//execute dari index.js
export const BackgroundService = () => {
  ////console.log('[BackgroundService] invoked ');
  // registerAppListener();
  // let sessOpt = {
  //   sessionPhoneNumber: theSessionPhoneNumber,
  //   contacts: theContacts
  // };
  // ////console.log('[BackgroundService] sessOpt ', sessOpt);

  registerAppListener();
  FCM.getInitialNotification().then(notif => {
    ////console.log("[BackgroundService] getInitialNotification", notif);
  });
  // if (Platform.OS === 'android') {
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      setFcmTokenAsyncStorage(token)
      .then(()=>{
        ////console.log("success save TOKEN (getFCMToken)");
      })
      .catch(err => {
        ////console.log("failed save TOKEN", err);
      });
      // this.setState({token: token || ""})
    });
    if(Platform.OS === 'ios'){
      FCM.getAPNSToken().then(token => {
        ////console.log(`APNS TOKEN (getFCMToken) |${token}|`);
      });
    }
    //part ini jangan di taruh di dalam function async
    // AppRegistry.registerHeadlessTask('notificationLoader', () => require('./backgroundjob/notificationLoader').task(theSessionPhoneNumber, theContacts));
  // } else {
    // isSignedIn(session)
    //  .then(res => {
    //    if (res !== null) {
    //      getContactsAsyncStorage().then(contacts => {
           // if (contacts !== null) {
             // ////console.log('[notificationLoader] isSignedIn', res);
             // theSessionPhoneNumber = res.sessionPhoneNumber;
             // theContacts = contacts;
             // regeisterJob(theSessionPhoneNumber, theContacts);

             // ////console.log('[notificationLoader] success ter registar', contacts);
           // } else {
           //   ////console.log('[notificationLoader] job tidak ter registar, karena contacts null', res);
           // }
     //     }).catch((err) => {});
     //   }
     // }).catch(err => {
     //   ////console.log('[notificationLoader] isSignedIn. An error occurred ', err);
     //   // alert('An error occurred');
     // });
   // }

  // runBackgroundProcess();
  // AppState.addEventListener('change', _handleAppStateChange);
  // if (Platform.OS === 'android') {
  //   AppRegistry.registerHeadlessTask('notificationLoader', () => require('./backgroundjob/notificationLoader').task);
  // } else {
  //   BackgroundTask.define(require('./backgroundjob/notificationLoader').task);
  // }
};

//execute dari RayakuApp.js
export const startTimer = () => {
  // ////console.log('[BackgroundService] invoked ');
  // _handleAppStateChange();
};
//execute dari RayakuApp.js
export const stopTimer = () => {
  // _handleAppStateChange();
  // ////console.log('[BackgroundService] invoked ');
  // BackgroundTimer.stop();
  // ////console.log('[BackgroundService] stop timer ');
};
