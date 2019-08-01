import { AsyncStorage } from 'react-native';

export const CONTACTS_KEY_STORAGE = 'CONTACTS_KEY_STORAGE';
export const TOTALBADGE_KEY_STORAGE = 'TOTALBADGE_KEY_STORAGE';
export const NOTIFICATION_KEY_STORAGE = 'NOTIFICATION_KEY_STORAGE';
export const NOTIF_KEY_STORAGE = 'NOTIF_KEY_STORAGE';
export const FCMTOKEN_KEY_STORAGE = 'FCMTOKEN_KEY_STORAGE';

export const setFcmTokenAsyncStorage = (token) => new Promise((resolve, reject) => {
  try {
    AsyncStorage.setItem(FCMTOKEN_KEY_STORAGE, `${token}`);
    // console.log('[asyncstorageApi] success setFcmTokenAsyncStorage token=', token);
    resolve();
  } catch (e) {
    // console.log('[asyncstorageApi] failed setFcmTokenAsyncStorage e=', e);
    reject(e);
  }
});
export const getFcmTokenAsyncStorage = () => new Promise((resolve, reject) => {
  try {
    AsyncStorage.getItem(FCMTOKEN_KEY_STORAGE)
    .then((token) => {
      // console.log('[asyncstorageApi] success getFcmTokenAsyncStorage token=', token);

      if (token !== null) {
        resolve(token);
      } else {
        resolve(null);
      }
    }).catch((err) => {
      // console.log('[asyncstorageApi] failed setFcmTokenAsyncStorage e=', e);

      reject(err);
    });
  } catch (e) {
    // console.log('[asyncstorageApi] failed setFcmTokenAsyncStorage e=', e);
    reject(e);
  }
});
export const setTotalbadgeAsyncStorage = (totalbadge) => new Promise((resolve, reject) => {
  try {
    AsyncStorage.setItem(TOTALBADGE_KEY_STORAGE, `${totalbadge}`);
    // console.log('[asyncstorageApi] success setTotalbadgeAsyncStorage totalbadge=', totalbadge);
    resolve();
  } catch (e) {
    // console.log('[asyncstorageApi] failed setTotalbadgeAsyncStorage e=', e);
    reject(e);
  }
});
export const getTotalbadgeAsyncStorage = () => new Promise((resolve, reject) => {
  try {
    // console.log('[asyncstorageApi] getTotalbadgeAsyncStorage');
    AsyncStorage.getItem(TOTALBADGE_KEY_STORAGE)
    .then((totalbadge) => {
      if (totalbadge !== null) {
        // console.log('[asyncstorageApi] getTotalbadgeAsyncStorage success =', totalbadge);
        resolve(totalbadge);
      } else {
        // console.log('[asyncstorageApi] getTotalbadgeAsyncStorage success = null');
        resolve(null);
      }
    })
    .catch((err) => {
      // console.log('[asyncstorageApi] getTotalbadgeAsyncStorage err=', err);
      reject(err);
    });
  } catch (e) {
    // console.log('[asyncstorageApi] getTotalbadgeAsyncStorage e=', e);
    reject(e);
  }
});
export const setContactsAsyncStorage = (ContactsReducer) => new Promise((resolve, reject) => {
  try {
    const byId = ContactsReducer.byId;
    const allIds = ContactsReducer.allIds;
    AsyncStorage.setItem(CONTACTS_KEY_STORAGE, JSON.stringify({ byId, allIds }));
    resolve();
  } catch (e) {
    reject(e);
  }
});

export const getContactsAsyncStorage = () => new Promise((resolve, reject) => {
  try {
    AsyncStorage.getItem(CONTACTS_KEY_STORAGE)
    .then((res) => {
      if (res !== null) {
        const dataContacts = JSON.parse(res);
        resolve(dataContacts);
      } else {
        resolve(null);
      }
    })
    .catch((err) => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  }
});

export const saveNotificationsAsyncStorage = (dataToSave) => new Promise((resolve, reject) => {
  try {
    // const dataAsyncStorageThatSaved = JSON.stringify(dataToSave);
    // AsyncStorage.setItem(`${NOTIFICATION_KEY_STORAGE}-${dataToSave.uid}`, dataAsyncStorageThatSaved).then(x=>{
    //   // console.log('[asyncstorageApi] saveNotificationsAsyncStorage success setItem=', x);
    //   resolve(dataAsyncStorageThatSaved);
    // }).catch(e=>{
    //   reject(e);
    // });

    // // console.log('[asyncstorageApi] saveNotificationsAsyncStorage dataToSave=', dataToSave);
    AsyncStorage.getItem(NOTIFICATION_KEY_STORAGE)
    .then((notifications) => {
      // console.log('[asyncstorageApi] saveNotificationsAsyncStorage notifications=', notifications);
      const dataNotifications = JSON.parse(notifications) || {};
      // if (notifications !== null && notifications !== {}) {
      //   dataNotifications = JSON.parse(notifications) || {};
      // }
      // console.log('[asyncstorageApi] saveNotificationsAsyncStorage current dataNotifications=', dataNotifications);

      const byId = dataNotifications.byId || {};
      const allIds = dataNotifications.allIds || [];

      if (allIds.indexOf(dataToSave.uid) === -1) {
        allIds.push(dataToSave.uid);
        byId[dataToSave.uid] = dataToSave;
        dataNotifications.byId = byId;
        dataNotifications.allIds = allIds;

        // // console.log('[asyncstorageApi] saveNotificationsAsyncStorage dataNotifications=', dataNotifications);
        const dataAsyncStorageThatSaved = JSON.stringify(dataNotifications);
        // // console.log('[asyncstorageApi] saveNotificationsAsyncStorage dataAsyncStorageThatSaved=', dataAsyncStorageThatSaved);

        AsyncStorage.setItem(NOTIFICATION_KEY_STORAGE, dataAsyncStorageThatSaved).then((x) => {
          // // console.log('[asyncstorageApi] saveNotificationsAsyncStorage success setItem=', x);
          resolve(dataAsyncStorageThatSaved);
        }).catch((e) => {
          reject(e);
        });
      } else {
        // console.log('[asyncstorageApi] saveNotificationsAsyncStorage data existed');
        resolve(dataToSave);
      }
    }).catch((err) => {
      // console.log('[asyncstorageApi] saveNotificationsAsyncStorage err=', err);
      reject(err);
    });
    // resolve();
  } catch (e) {
    // console.log('[asyncstorageApi] saveNotificationsAsyncStorage e=', e);
    reject(e);
  }
});

export const getNotificationsAsyncStorage = () => new Promise((resolve, reject) => {
  // console.log('[asyncstorageApi] getNotificationsAsyncStorage');

  try {
    AsyncStorage.getItem(NOTIFICATION_KEY_STORAGE)
    .then((notifications) => {
      if (notifications !== null) {
        const dataNotifications = JSON.parse(notifications);
        // console.log('[asyncstorageApi] getNotificationsAsyncStorage dataNotifications=', dataNotifications);
        resolve(dataNotifications);
      } else {
        // console.log('[asyncstorageApi] getNotificationsAsyncStorage dataNotifications=null');
        resolve(null);
      }
    })
    .catch((err) => {
      // console.log('[asyncstorageApi] getNotificationsAsyncStorage err=', err);
      reject(err);
    });
  } catch (e) {
    // console.log('[asyncstorageApi] getNotificationsAsyncStorage e=', e);
    reject(e);
  }
});
export const removeNotificationsAsyncStorage = () => new Promise((resolve, reject) => {
  AsyncStorage.setItem(NOTIFICATION_KEY_STORAGE, '{}');
  resolve();
});

export const clearNotifAsyncStorage = () => new Promise((resolve, reject) => {
  try {
    AsyncStorage.setItem(NOTIF_KEY_STORAGE, '', () => {
      // console.log('[asyncstorageApi] clearNotifAsyncStorage setItem success');
      resolve('');
    });
  } catch (e) {
    // console.log('[asyncstorageApi] clearNotifAsyncStorage e=', e);
    reject(e);
  }
});
export const saveNotifAsyncStorage = (strDataToSave) => new Promise((resolve, reject) => {
  try {
    AsyncStorage.getItem(NOTIF_KEY_STORAGE, (err, notifications) => {
      console.log('[asyncstorageApi] saveNotifAsyncStorage current notifications=', notifications);
      if (err) {
        console.log('[asyncstorageApi] saveNotifAsyncStorage err=', err);
        reject(err);
      } else if (notifications) {
        AsyncStorage.mergeItem(NOTIF_KEY_STORAGE, strDataToSave, () => {
          console.log('[asyncstorageApi] saveNotifAsyncStorage mergeItem success');
          resolve(strDataToSave);
        });
      } else {
        AsyncStorage.setItem(NOTIF_KEY_STORAGE, strDataToSave, () => {
          console.log('[asyncstorageApi] saveNotifAsyncStorage setItem success');
          resolve(strDataToSave);
        });
      }
    });
  } catch (e) {
    console.log('[asyncstorageApi] saveNotifAsyncStorage e=', e);
    reject(e);
  }
});
export const getNotifAsyncStorage = () => new Promise((resolve, reject) => {
  try {
    AsyncStorage.getItem(NOTIF_KEY_STORAGE, (err, notifications) => {
      if (err) {
        // console.log('[asyncstorageApi] getNotifAsyncStorage err=', err);
        reject(err);
      } else {
        resolve(notifications);
      }
    });
  } catch (e) {
    // console.log('[asyncstorageApi] getNotifAsyncStorage e=', e);
    reject(e);
  }
});
