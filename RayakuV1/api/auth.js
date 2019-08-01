import { AsyncStorage } from 'react-native';

export const STORAGE_SESSION_KEY = 'STORAGE_SESSION_KEY';
// let STORAGE_SESSION = 'STORAGE_SESSION';

export const onSignIn = (dataSession) => new Promise((resolve, reject) => {
  try {
    AsyncStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(dataSession));
    resolve(dataSession);
  } catch (e) {
    reject(e);
  }
});

export const onSignOut = () => AsyncStorage.removeItem(STORAGE_SESSION_KEY);

export const isSignedIn = (sessionMap) => new Promise((resolve, reject) => {
  // //console.log('[auth] isSignedIn');
  // JSON.parse(value)
    AsyncStorage.getItem(STORAGE_SESSION_KEY)
      .then((res) => {
        if (res !== null) {
          const dataSession = JSON.parse(res);
          resolve({
            ...sessionMap,
            ...dataSession
          });
        } else {
          const dataSession = {
            ...sessionMap,
            isLoggedIn: 'no'
          };
          AsyncStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(dataSession));
          resolve({
            ...sessionMap,
            ...dataSession
          });
        }
      })
      .catch((err) => {
        console.error('[auth] isSignedIn ', err);

        reject(err);
      });
  });
export const getSession = () => new Promise((resolve, reject) => {
  // //console.log('[auth] getSession');
  // JSON.parse(value)
    AsyncStorage.getItem(STORAGE_SESSION_KEY)
      .then((res) => {
        if (res !== null) {
          const dataSession = JSON.parse(res);
          resolve({
            ...dataSession
          });
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.error('[auth] isSignedIn ', err);
        reject(err);
      });
  });
