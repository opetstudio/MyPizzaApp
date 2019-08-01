import firebase from 'firebase';
import _ from 'lodash';
import BackgroundTask from 'react-native-background-task';

import { isSignedIn, getSession } from '../api/auth';

import {
  View,
  Text,
  AppState,
  Platform,
  AsyncStorage,
  Alert
} from 'react-native';
import ToastExample from '../modules/ToastExample';


import { getContactsAsyncStorage, saveNotificationsAsyncStorage } from '../api/asyncstorageApi';
import { updateMessageToDeliveredOnServer,
setMessageDataFromNotification } from '../actions/ConversationAction';
import { getStatusDeliveryNotifData,
  doPopUpLocalNotif,
  getTotalbadgeNumber,
  doSetAppIconBadgeNumber,
  notificationSetOnValue,
  notificationFetchValue,
  pushRemoteNotification } from '../actions/NotificationAction';

const regularJobKey = 'regularJobKey';
if (!firebase.apps.length) {
  // firebase.initializeApp({
  //   apiKey: 'AIzaSyD58G4sYKgJq6yWa5jdtjRl9JhtsFkf_kE',
  //   authDomain: 'rayaku-testbed.firebaseapp.com',
  //   databaseURL: 'https://rayaku-testbed.firebaseio.com',
  //   projectId: 'rayaku-testbed',
  //   storageBucket: 'rayaku-testbed.appspot.com',
  //   messagingSenderId: '1060562171114'
  // });
}


//data session
const session = {
  isLoggedIn: null,
  sessionPhoneNumber: '',
  token: {}, //from fb
  account: {}, //from fb
  deviceId: ''
};

const saveLocalAsyncStorage = (dataToSave) => {
  saveNotificationsAsyncStorage(dataToSave)
  .then(()=>{})
  .catch(()=>{});
}

var theSessionPhoneNumber = '';
var theContacts = [];


const setSessionAndContacts = (sessionPhoneNumber, contacts, cb) => {
  theSessionPhoneNumber = sessionPhoneNumber;
  theContacts = contacts;
  cb();
};

const processingOneNotification = (notificationList, i) => {
  const notification_ref = `/notifications/${theSessionPhoneNumber}`;
  ////console.log('[notificationLoader] processingOneNotification begin ==>', notificationList);
  if(notificationList && notificationList.length > i) {
    const v = notificationList[i];
    if (v !== null && typeof v === 'object') {
      firebase.database().ref(`${notification_ref}/${v.uid}`).remove();
      if (v.command === 'fetch_new_message') {
        const messageData = setMessageDataFromNotification(v.params.messageData);
        saveNotificationsAsyncStorage({
          ...v,
          newMessageData: messageData
        }).then(resp => {
          // ////console.log('[notificationLoader] processingOneNotification success ==>', resp);
          const modifiedon = new Date().getTime();
          const messageForSender = {
            ...messageData,
            createdTimeOnDevice: messageData.localTimeStatusPending,
            modifiedon,
            type: 's'
          };
          const messageForReceiver = {
            ...messageData,
            modifiedon,
            type: 'r'
          };

          if (v.show_on_localnotif === 'yes') {
            doPopUpLocalNotif(v, theContacts);
            getTotalbadgeNumber({ storeProvider: 2 }, (totalBadge) => {
              totalBadge += 1;
              doSetAppIconBadgeNumber(totalBadge);
            });
          }

          updateMessageToDeliveredOnServer(messageForSender, messageForReceiver, () => {
            const notificationData = getStatusDeliveryNotifData(messageForSender);
            pushRemoteNotification(
              notificationData, messageForSender.sender_phone_number);
          });

          processingOneNotification(notificationList, i+1);
        }).catch(err=>{
          ////console.log('[notificationLoader] failed save asyncstorage for notif ==>', err);
          processingOneNotification(notificationList, i+1);
        });
      } else {
        saveNotificationsAsyncStorage({
          ...v,
        }).then(resp => {
          processingOneNotification(notificationList, i+1);
        });
      }
    } else {
      processingOneNotification(notificationList, i+1);
    }
  } else {

  }
}

const doRunJob = () => {
  const listNotif = {};
  const notification_ref = `/notifications/${theSessionPhoneNumber}`;
  ////console.log('[notificationLoader] begin doRunJob ==>', notification_ref);
  ////console.log('[notificationLoader] currentState = ', AppState.currentState);

  if(theSessionPhoneNumber && theSessionPhoneNumber !== '' && AppState.currentState !== 'active') {
    // notificationSetOnValue(notification_ref, (snapshot) => {
    notificationFetchValue(notification_ref, (snapshot) => {
      ////console.log('[notificationLoader] on value ==>', snapshot.val());
      // if (AppState.currentState !== 'active') {
        ////console.log('[notificationLoader] !== active. Processing the data');

        const notificationList = _.map(snapshot.val(), (val, uid) => {
          if ((uid in listNotif) === false) {
            listNotif[uid] = true;
            return { ...val, uid };
          }
          return null;
        });

        processingOneNotification(notificationList, 0);
    });
  }
  ////console.log('[notificationLoader] end doRunJob ==>', notification_ref);
};

export const runJob = ({
  sessionPhoneNumber,
  contacts
}) => {

  try {
    ////console.log('[notificationLoader] begin runJob');

    if (sessionPhoneNumber && sessionPhoneNumber !== '') {
      ////console.log('[notificationLoader] sessionPhoneNumber exist: ', sessionPhoneNumber);

      setSessionAndContacts(sessionPhoneNumber, contacts, () => {
        doRunJob();
      });
    } else if(theSessionPhoneNumber && theSessionPhoneNumber !== '') {
      ////console.log('[notificationLoader] theSessionPhoneNumber exist: ', sessionPhoneNumber);
      doRunJob();
    } else {
      ////console.log('[notificationLoader] theSessionPhoneNumber and sessionPhoneNumber not exist: ', sessionPhoneNumber);
      //get from local storage
      getSession().then(dataSession => {
        if(dataSession !== null) {
           getContactsAsyncStorage().then(dataContacts => {
             if (dataContacts !== null) {
               setSessionAndContacts(dataSession.sessionPhoneNumber, dataContacts, () => {
                 doRunJob();
               });
             }
           }).catch((err) => {});
        }
      })
      .catch(err => {
        ////console.log("[notificationLoader] failed get session", err);
      });
    }
    // ////console.log('[notificationLoader] end ==>');
  } catch (e) {
    ////console.log(`[notificationLoader] Background Job fired and error!. Key = ${regularJobKey} ==>`, e);
  }
  // ////console.log(`[notificationLoader] Background Job fired!. Key = ${regularJobKey} => `, new Date());
  ////console.log('[notificationLoader] end runJob');
};



export const runBackgroundProcess = () => {
isSignedIn(session)
 .then(res => {
   if (res !== null) {
     getContactsAsyncStorage().then(contacts => {
       // if (contacts !== null) {
         ////console.log('[notificationLoader] isSignedIn', res);
         theSessionPhoneNumber = res.sessionPhoneNumber;
         theContacts = contacts;

         if (Platform.OS === 'android') {
           try {

             // regeisterJob(res.sessionPhoneNumber, contacts || {});
             // BackgroundJob.cancel({ jobKey: regularJobKey });
             // BackgroundJob.schedule({
             //   jobKey: regularJobKey,
             //   period: 15000 //
             //   // period: 15000 //
             // });
           } catch (e) {
             ////console.log('[notificationLoader] error saat register dan schedule job. e=>', e);
           }

         } else {
           // BackgroundTask.define(async () => {
           //   // Fetch some data over the network which we want the user to have an up-to-
           //   // date copy of, even if they have no network when using the app
           //   // const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')
           //   // const text = await response.text()
           //   ////console.log('[notificationLoader] Hello from a background task ', new Date());
           //   // Data persisted to AsyncStorage can later be accessed by the foreground app
           //   // await AsyncStorage.setItem('@MyApp:key', text)
           //   runJob({
           //     sessionPhoneNumber: theSessionPhoneNumber,
           //     contacts: theContacts
           //   });
           //   // Remember to call finish()
           //   // BackgroundTask.finish();
           // });
         }
         ////console.log('[notificationLoader] success ter registar', contacts);
       // } else {
       //   ////console.log('[notificationLoader] job tidak ter registar, karena contacts null', res);
       // }
     }).catch((err) => {});
   }
 }).catch(err => {
   ////console.log('[notificationLoader] isSignedIn. An error occurred ', err);
   // alert('An error occurred');
 });
};

runBackgroundProcess();

const theTask = (xtheSessionPhoneNumber, xtheContacts) => {
  return async () => {

    if(theSessionPhoneNumber === '') {
      runBackgroundProcess();
    }

    ////console.log('[notificationLoader] taskData');
    if (Platform.OS === 'android') {
      ////console.log('[notificationLoader] taskData run');
      // ToastExample.show('Rayaku Beta version', ToastExample.SHORT);
      if (AppState.currentState !== 'active') {
        runJob({
          sessionPhoneNumber: xtheSessionPhoneNumber || theSessionPhoneNumber,
          contacts: xtheContacts || theContacts
        });
      }
    } else {
      runJob({
        sessionPhoneNumber: xtheSessionPhoneNumber || theSessionPhoneNumber,
        contacts: xtheContacts || theContacts
      });
    }
  }
}
export const task = theTask;
