import firebase from 'firebase';
import { Platform, AsyncStorage, AppState } from 'react-native';

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import {
  setFcmTokenAsyncStorage,
  saveNotifAsyncStorage,
  getNotifAsyncStorage,
  } from './api/asyncstorageApi';
import { getSession } from './api/auth';
import { getFirebaseConf } from './conf';

if (!firebase.apps.length) {
  const fbconfig = getFirebaseConf();
  console.log('[Listeners] fbconfig=', fbconfig);
  firebase.initializeApp(fbconfig);
}

AsyncStorage.getItem('lastNotification').then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    // //console.log('last notification', JSON.parse(data));
    AsyncStorage.removeItem('lastNotification');
  }
});

export function registerKilledListener() {
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, (notif) => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  });
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener() {
  // //console.log('registerAppListener opt');
  // clearNotifAsyncStorage().then(()=>{}).catch(e=>{});
  // let sessionPhoneNumber = opt.sessionPhoneNumber;
  // let contacts = opt.contacts;

  FCM.on(FCMEvent.Notification, (notif) => {
    const notifStr = JSON.stringify(notif);
    console.log(`[Listeners] ${AppState.currentState} onNotification ==>`, notifStr);
    if (notif && 'message' in notif && !notif.local_notification && !notif.opened_from_tray) {
        console.log('[Listeners] onNotification save ', notifStr);
        const notif_obj = JSON.parse(notif.notif);
        // if ('is_group' in notif && notif.is_group === '1') {
          // handling group message
          console.log('[Listeners] onNotification handling group message ');
        // } else {
          const dataToSave = {};
          dataToSave[notif.id] = notif_obj;
          saveNotifAsyncStorage(JSON.stringify(dataToSave))
          .then((resp) => {
            console.log('[Listeners] onNotification saveNotifAsyncStorage success resp=', resp);
            getNotifAsyncStorage()
            .then((resp2) => {
              console.log('[Listeners] onNotification getNotifAsyncStorage notifOnAsyncStorage = ', resp2);
              // update message status to delivered
            })
            .catch(() => {
              // //console.log("[Listeners] onNotification getNotifAsyncStorage e=", e);
            });
          })
          .catch(() => {
            // //console.log("[Listeners] onNotification saveNotifAsyncStorage e=", e);
          });
        // }
    }
    // ////console.log('runJob sessionPhoneNumber=', sessionPhoneNumber);
    // if(Platform.OS ==='android'){
    //   runJob({
    //     sessionPhoneNumber: '',
    //     contacts: []
    //   });
    // }

    if (notif.local_notification) {
      return;
    }
    if (notif.opened_from_tray) {
      return;
    }

    if (Platform.OS === 'ios') {
        // optional
        // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
            break;
          default:
            break;
        }
    }
  });

  FCM.on(FCMEvent.RefreshToken, (token) => {
    // //console.log("TOKEN (refreshUnsubscribe)", token);
    // this.props.onChangeToken(token);
    const fcmToken = token;
    getSession().then((dataSession) => {
      setFcmTokenAsyncStorage(fcmToken)
      .then(() => {
        if (dataSession !== null) {
          // update on firebase
          firebase.database().ref(`/users/${dataSession.sessionPhoneNumber}`)
          .update({
            fcm_token: `${fcmToken}`
          })
          .then(() => {
            // //console.log("success update TOKEN on firebase");
          });
        }
        // //console.log("success save TOKEN (getFCMToken)");
      })
      .catch((err) => {
        // //console.log("failed save TOKEN", err);
      });
    })
    .catch((err) => {
      // //console.log("failed get session", err);
    });
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    // //console.log('direct channel connected' + data);
  });
  setTimeout(() => {
    FCM.isDirectChannelEstablished().then((d) => console.log(d));
  }, 1000);
}
