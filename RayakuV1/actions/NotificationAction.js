import firebase from 'firebase';
import _ from 'lodash';
// import PushNotification from 'react-native-push-notification';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {
  Platform,
} from 'react-native';

import { setTotalbadgeAsyncStorage, getTotalbadgeAsyncStorage } from '../api/asyncstorageApi';

import {
  NOTIFICATION_SET_RELOAD,
  NOTIFICATION_CONSUME_INPROGRESS,
  NOTIFICATION_CONSUME_DONE,
  NOTIFICATION_PUSH_NEWINCOMING_DONE,
  NOTIFICATION_PUSH_NEWINCOMING_INPROGRESS,
  NOTIFICATION_POPUP
} from '../constants';

export const getStatusDeliveryNotifData = (messageData) => {
  const createdon = new Date().getTime();
  const notificationData = {
    message: {
      title: '',
      content: ''
    },
    createdon,
    modifiedon: createdon,
    command: 'update_status_message',
    params: {
      msg_uid: messageData.uid,
      status: 3, // status delivered
      serverTimeStatusDelivered: messageData.serverTimeStatusDelivered,
      localTimeStatusDelivered: messageData.localTimeStatusDelivered
    },
    show_on_localnotif: 'no'
  };
  return notificationData;
};
export const setReload = (isReload) => (dispatch) => {
  dispatch({
    type: NOTIFICATION_SET_RELOAD,
    payload: isReload
  });
};
export const setConsumeNotifInprogress = () => (dispatch) => {
  dispatch({
    type: NOTIFICATION_CONSUME_INPROGRESS
  });
};
export const setConsumeNotifDone = () => (dispatch) => {
  dispatch({
    type: NOTIFICATION_CONSUME_DONE
  });
};
export const setLocalNotifDataByNotification = (v, ContactsReducer) => {
  const notifOpt = {};
  let contact_sender = {};
  if (ContactsReducer !== null && ContactsReducer !== {} && 'byId' in ContactsReducer) {
    contact_sender = ContactsReducer.byId[v.params.sender_phone_number] || {};
  }
  notifOpt.title = v.params.sender_phone_number;
  notifOpt.message = v.message.content;
  notifOpt.sender_phone_number = v.params.sender_phone_number;
  notifOpt.uid = v.uid;

  if (contact_sender
    && typeof contact_sender === 'object'
    && contact_sender !== {}
    && contact_sender !== undefined
  ) {
    if (contact_sender.name && contact_sender.name !== '' && contact_sender.name !== undefined) {
      notifOpt.title = contact_sender.name || notifOpt.title;
    } else {
      notifOpt.title = contact_sender.phoneNumbers || notifOpt.title;
    }
  }
  const notifData = {};
  notifData.uid = notifOpt.uid;
  notifData.title = notifOpt.title;
  notifData.message =
    Platform.OS === 'ios' ? `${notifOpt.title}: ${notifOpt.message}` : notifOpt.message;

  return notifData;
};
export const getTotalbadgeNumber = ({ storeProvider, getState }, cb = () => {}) => {
  // //console.log('[NotificationAction] getTotalbadgeNumber storeProvider=',storeProvider);
  let totalBadge = 0;
  if (storeProvider === 1 && getState) {
    const friendChatsBadge = getState().ConversationReducer.friendChatsBadge;
    _.map(friendChatsBadge, (v) => {
      totalBadge += v || 0;
    });
    // //console.log('[NotificationAction] getTotalbadgeNumber totalBadge=',totalBadge);

    cb(totalBadge);
  } else {
    getTotalbadgeAsyncStorage()
    .then((totalBadgeInAsyncStorage) => {
      // //console.log('[NotificationAction] getTotalbadgeNumber getTotalbadgeAsyncStorage totalBadgeInAsyncStorage=', totalBadgeInAsyncStorage);
      if (totalBadgeInAsyncStorage) {
        try {
          totalBadge = Number(totalBadgeInAsyncStorage || 0);
        } catch (e) {
          // //console.log('[NotificationAction] getTotalbadgeNumber error=', e);
          totalBadge = 0;
        }
      }
      // //console.log('[NotificationAction] getTotalbadgeNumber totalBadge=',totalBadge);
      cb(totalBadge);
    }).catch((err) => {
      // //console.log('[NotificationAction] error getTotalbadgeAsyncStorage', err);
      // //console.log('[NotificationAction] getTotalbadgeNumber totalBadge=',totalBadge);
      cb(totalBadge);
    });
  }
};
export const getTotalbadgeNumberFromRedux = (cb = () => {}) => (dispatch, getState) => {
  // //console.log('[NotificationAction] getTotalbadgeNumberFromRedux begin');

  getTotalbadgeNumber({ storeProvider: 1, getState }, (totalBadge) => {
    // //console.log('[NotificationAction] getTotalbadgeNumberFromRedux getTotalbadgeNumber success totalBadge=', totalBadge);
    cb(totalBadge || 0);
    setTotalbadgeAsyncStorage(totalBadge).then(() => {
      // //console.log('[NotificationAction] getTotalbadgeNumberFromRedux success setTotalbadgeAsyncStorage totalBadge=', totalBadge);
    }).catch((err) => {
      // //console.log('[NotificationAction] getTotalbadgeNumberFromRedux error setTotalbadgeAsyncStorage', err);
    });
  });
};
export const pushPopupNotification = (notificationData) => (dispatch) => {
  dispatch({ type: NOTIFICATION_POPUP, payload: notificationData });
};
export const pushQueueNewIncoming = (notifObj) => (dispatch, getState) => {
  dispatch({ type: NOTIFICATION_PUSH_NEWINCOMING_INPROGRESS });
  const newById = getState().NotificationReducer.newById;
  const newAllIds = getState().NotificationReducer.newAllIds;
  _.map(notifObj, (v, k) => {
    if (newAllIds.indexOf(k) === -1) {
      newAllIds.push(k);
      newById[k] = { ...v, id: k };
    }
  });
  dispatch({ type: NOTIFICATION_PUSH_NEWINCOMING_DONE, payload: { newById, newAllIds } });
};
export const doPopUpLocalNotif = (notificationData, ContactsReducer) => {
  const notifData = setLocalNotifDataByNotification(notificationData, ContactsReducer);
  // PushNotification.localNotification(notifData);
  // console.log('[NotificationAction] doPopUpLocalNotif notifData=', notifData);
  const fcm_notif = {
    id: `${notifData.uid}`,                               // (optional for instant notification)
    // title: notifData.title,                     // as FCM payload
    body: notifData.message,                    // as FCM payload (required)
    sound: "default",                                   // as FCM payload
    priority: "high",                                   // as FCM payload
    click_action: "ACTION",                             // as FCM payload
    // badge: 3,                                          // as FCM payload IOS only, set 0 to clear badges
    // number: 4,                                         // Android only
    // ticker: "My Notification Ticker",                   // Android only
    auto_cancel: true,                                  // Android only (default true)
    // large_icon: "ic_launcher",                           // Android only
    icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
    // big_text: "Show when notification is expanded",     // Android only
    // sub_text: "This is a subText",                      // Android only
    color: "red",                                       // Android only
    vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
    wake_screen: true,                                  // Android only, wake up screen when notification arrives
    // group: "group",                                     // Android only
    // picture: "https://google.png",                      // Android only bigPicture style
    // ongoing: true,                                      // Android only
    // my_custom_data:'my_custom_field_value',             // extra data you want to throw
    // lights: true,                                       // Android only, LED blinking (default false)
    show_in_foreground: false                                  // notification when app is in foreground (local & remote)
  };
  if(Platform.OS === 'android') {
    fcm_notif.title = notifData.title;                     // as FCM payload
  }
  // FCM.presentLocalNotification(fcm_notif);

};

export const doSetAppIconBadgeNumber = (totalBadge) => {
  // console.log('[NotificationAction] doSetAppIconBadgeNumber totalBadge=', totalBadge);

  setTotalbadgeAsyncStorage(totalBadge).then(() => {
    // console.log('[NotificationAction] success setTotalbadgeAsyncStorage totalBadge=', totalBadge);

  }).catch(err => {
    // console.log('[NotificationAction] error setTotalbadgeAsyncStorage', err);
  });
  // if (totalBadge > 0) {
    // PushNotification.setApplicationIconBadgeNumber(totalBadge);
    FCM.setBadgeNumber(totalBadge);
    // FCM.presentLocalNotification({
    //   badge: totalBadge,                                          // as FCM payload IOS only, set 0 to clear badges
    //   number: totalBadge,                                         // Android only
    // });
  // }
};
export const popUpLocalNotification = (notificationData) => (dispatch, getState) => {
  doPopUpLocalNotif(notificationData, getState().ContactsReducer);
  getTotalbadgeNumber({ storeProvider: 1, getState }, (totalBadge) => {
    doSetAppIconBadgeNumber(totalBadge);
  });
};
export const pushRemoteNotification = (notificationData, receiverId, cb = () => {}) => {
  firebase.database().ref(`/notifications/${receiverId}`)
  .push(notificationData).then(() => {
      cb();
  });
};
export const notificationSetOnValue = (notification_ref, cb=()=>{}) => {
  firebase.database().ref(notification_ref).off();
  firebase.database().ref(notification_ref)
  .on('value', snapshot => {
    cb(snapshot);
  });
}
export const notificationFetchValue = (notification_ref, cb=()=>{}) => {
  firebase.database().ref(notification_ref).off();
  var limitToLast = 100;
  const ref = firebase.database().ref(notification_ref);
  const query = ref.orderByKey().limitToLast(limitToLast).startAt('0');
  query.once('value', snapshot => {
    cb(snapshot);
  });

  // firebase.database().ref(notification_ref)
  // .on('value', snapshot => {
  //   cb(snapshot);
  // });
}

export const incrementBadgeNumber = (device1, device2) => {
  var ref = firebase.database().ref(`badge/${device1}/${device2}`);
  ref.transaction(function(currentBadge) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentBadge || 0) + 1;
  });
}
export const decrementBadgeNumber = (device1, device2, num_to_dec = 0) => {
  var ref = firebase.database().ref(`badges/${device1}/${device2}`);
  ref.transaction(function(currentBadge) {
    // If node/clicks has never been set, currentRank will be `null`.
    if(num_to_dec > 0) {
      if(currentBadge > num_to_dec) {
        return (currentBadge || 0) - num_to_dec;
      } else {
        return 0;
      }
    } else {
      if(currentBadge > 0) return (currentBadge || 0) - 1;
      else return currentBadge;
    }

  });
}
