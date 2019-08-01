import firebase from 'firebase';
import FCM from "react-native-fcm";
import {
  Platform,
} from 'react-native';

import {
  SESSION_UPDATE,
  SESSION_UPDATE_APP_STATE,
  SESSION_EXIT_PROPER,
  SESSION_SET_VERSION,
  SESSION_UPDATE_PROFILE_PICTURE,
  SESSION_UPDATE_DISPLAY_NAME
} from '../constants';

import { getGMTunixtime } from '../utils/util';

import { loginApi, resubscribeFcmTokenApi } from '../api/rayaku-celery-rabbitmq-login-py';

export const updateAppState = (opt) => {
  // console.log('[SessionAction] updateAppState=>', opt);
  return (dispatch) => {
    // upsert user

    dispatch({
      type: SESSION_UPDATE_APP_STATE,
      payload: opt.appState
    });
  };
};
export const sessionSetVersion = (v) => {
  // console.log('[SessionAction] sessionSetVersion=>', v);
  return (dispatch) => {
    // upsert user

    dispatch({
      type: SESSION_SET_VERSION,
      payload: v
    });
  };
};
export const updateSession = (opt) => {
  // console.log('[SessionAction] update updateSession =>', opt);
  return (dispatch) => {
    dispatch({
      type: SESSION_UPDATE,
      payload: {
        authToken: opt.token,
        loggedAccount: opt.account,
      }
    });
  };
};
export const exitProper = (opt) => {
  return (dispatch) => {
    dispatch({
      type: SESSION_EXIT_PROPER,
      payload: opt
    });
  };
};
export const sessionLoginBackend = (opt) => {
  // loginApi({
  //   phone_number: opt.phone_number
  // }).then((response) => {
  //   // console.log('[SessionAction] response===>', response);
  //   // console.log('[SessionAction] response.o===>', response.o);
  //
  //   // if (response.status) {
  //   //
  //   // }
  //   // dispatch(fetchAllSuccess(response));
  //   // callback(response.e, response.o);
  //   // callback();
  // }).catch((err) => {
  //   // console.log('[SessionAction] err:', err);
  //   // dispatch({ type: SS_FETCH_ALL_ERROR });
  //   // callback(err, null);
  //   // callback();
  // });
};
const getApnsToken = (cb = () => {}) => {
  if (Platform.OS === 'ios') {
    FCM.getAPNSToken().then((token) => {
      cb(token);
    });
  } else {
    cb('');
  }
};

export const sessionDisplay = (opt) => {
  // console.log('[SessionAction] sessionDisplay=>', opt);
  return (dispatch) => {
    firebase.database().ref(`/users/${opt.selfNumber}`)
    .update({
      display_name: `${opt.display_name}`
    })
    .then(() => {
      // console.log('[SessionAction] save display_name success');
      dispatch({
        type: SESSION_UPDATE_DISPLAY_NAME,
        payload: {
          display_name: opt.display_name
        }
      });
    })
    .catch((err) => {
      // console.log(err);
    });
  };
};

export const sessionPicture = (opt) => {
  // console.log('[SessionAction] sessionPicture=>', opt);
  return (dispatch) => {
      // upsert profilepicture
      if (opt && 'selfNumber' in opt && opt.selfNumber !== '') {
        firebase.database().ref(`/users/${opt.selfNumber}`)
        .update({
          profile_picture: `${opt.profile_picture}`
        })
        .then(() => {
          // console.log('[SessionAction] save profilepicture success', opt.profile_picture_device);
          // upsert user
          dispatch({
            type: SESSION_UPDATE_PROFILE_PICTURE,
            payload: {
              profile_picture: opt.profile_picture,
              profile_picture_device: opt.profile_picture_device
            }
          });
        })
        .catch((err) => {
          // console.log('Error save profilepicture:',err);
        });
    }
  };
};

export const sessionLogin = (command, isLoggedIn, opt, cb = () => {}) => {
  console.log('[SessionAction] sessionLogin=>', opt);
  console.log('[SessionAction] sessionLogin=>', isLoggedIn);
  console.log('[SessionAction] sessionLogin=>', command);
  const createdon = getGMTunixtime();
  return (dispatch) => {
    if (isLoggedIn === 'yes') return cb('USER_ALREADY_LOGEDIN', null);
    // if (isLoggedIn === 'yes' && command === 'doLogin') return cb('USER_ALREADY_LOGEDIN', null);
    if (!(opt.sessionPhoneNumber && opt.sessionPhoneNumber !== '')) return cb('MSISDN_NOT_FOUND', null);

      FCM.getFCMToken().then((fcmToken) => {
        getApnsToken((apnsToken) => {
          // //console.log('[SessionAction] sessionLogin fcmToken=>', fcmToken);
          const newDataUser = {
            createdon,
            fullname: `${opt.sessionPhoneNumber}`,
            modifiedon: createdon,
            phone_number: `${opt.sessionPhoneNumber}`,
            uid: `${opt.sessionPhoneNumber}`,
            fcm_token: `${fcmToken}`,
            apn_token: `${apnsToken}`,
            fb_token: `${opt.token.token}`,
            device_id: opt.deviceId,
            platform: Platform.OS,
            profile_picture: `${opt.profile_picture}`,
            display_name: `${opt.display_name}`
          };
          loginApi({
            apn_token: `${apnsToken}`,
            createdon: `${createdon}`,
            device_id: opt.deviceId,
            fb_token: `${opt.token.token}`,
            fcm_token: `${fcmToken}`,
            msisdn: `${opt.sessionPhoneNumber}`,
            platform: Platform.OS,
          })
          .then((resp) => {
            console.log('[SessionAction] resp=>', resp);
            if (resp.status && resp.o.status) {
              const newDataUserResp = (resp.o.resp_task || {}).dataUser || {};
              cb(null, {
                ...newDataUser,
                display_name: newDataUserResp.display_name,
                profile_picture: newDataUserResp.profile_picture
              });

              // resubscribe
              resubscribeFcmTokenApi({
                msisdn: `${opt.sessionPhoneNumber}`,
                device_id: opt.deviceId
              }).then(() => {}).catch(() => {});
              
              // upsert user
              dispatch({
                type: SESSION_UPDATE,
                payload: {
                  isLoggedIn: opt.isLoggedIn,
                  token: opt.token,
                  account: opt.account,
                  deviceId: opt.deviceId,
                  sessionPhoneNumber: opt.sessionPhoneNumber,
                  profile_picture: opt.profile_picture,
                  profile_picture_device: opt.profile_picture_device
                }
              });
            } else {
              cb(resp.o.error_msg, null);
            }
          })
          .catch((e) => {
            console.log('[SessionAction] resp e=>', e);
            cb(e, null);
          });

          // firebase.database().ref(`/users/${opt.sessionPhoneNumber}`)
          // .set(newDataUser)
          // .then(() => {
          //   firebase.database().ref(`/user_devices/${opt.sessionPhoneNumber}/${opt.deviceId}`)
          //   .set({
          //     createdon,
          //     deviceId: opt.deviceId,
          //   })
          //   .then(() => {
          //     firebase.database().ref(`/device_users/${opt.deviceId}`)
          //     .set({
          //       fb_token: `${opt.token.token}`,
          //       phone_number: `${opt.sessionPhoneNumber}`
          //     }).then(() => {
          //       cb(newDataUser);
          //       // upsert user
          //       dispatch({
          //         type: SESSION_UPDATE,
          //         payload: {
          //           isLoggedIn: opt.isLoggedIn,
          //           token: opt.token,
          //           account: opt.account,
          //           deviceId: opt.deviceId,
          //           sessionPhoneNumber: opt.sessionPhoneNumber,
          //           profile_picture: opt.profile_picture,
          //           profile_picture_device: opt.profile_picture_device
          //         }
          //       });
          //     });
          //   });
          // });
        });
    })
    .catch((err) => {
      // //console.log('[SessionAction] sessionLogin error', err);
    });
  };
};
export const updateUserFirebase = (phoneNumber, dataUpdate) => {
  if (phoneNumber !== null && phoneNumber !== '') {
    firebase.database().ref(`/users/${phoneNumber}`)
    .update(dataUpdate)
    .then(() => {
      // //console.log("[SessionAction] success update user on firebase");
    });
  }
};

export const setFcmToken = (phoneNumber, fcmToken) => {
  if (!(phoneNumber && phoneNumber !== '')) return null;
  // update on firebase
  if (phoneNumber !== null && phoneNumber !== '') {
    firebase.database().ref(`/users/${phoneNumber}`)
    .update({
      fcm_token: `${fcmToken}`
    })
    .then(() => {
      // //console.log("[SessionAction] success update TOKEN on firebase");
    });
  }
};
export const setAppState = (phoneNumber, state) => {
  updateUserFirebase(phoneNumber, { state });
}
export const setPlatformOs = (phoneNumber, platform) => {
  updateUserFirebase(phoneNumber, { platform });
}
