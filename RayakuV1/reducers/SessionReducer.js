import {
  SESSION_UPDATE,
  SESSION_EXIT_PROPER,
  SESSION_SET_VERSION,
  SESSION_UPDATE_APP_STATE,
  SESSION_UPDATE_PROFILE_PICTURE,
  SESSION_UPDATE_DISPLAY_NAME
}
from '../constants';

const initialSession = {
  appState: '',
  sessionPhoneNumber: '',
  token: null,
  account: null,
  isLoggedIn: null,
  deviceId: '',
  exitProper: '',
  version: '',
  display_name: '',
  profile_picture: '',
  profile_picture_device: ''
};
const initialUserprofile = {
  fullname: ''
};
const INITIAL_STATE = {
  ...initialSession,
  ...initialUserprofile
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_UPDATE:
      ////console.log('[SessionReducer] SESSION_UPDATE', action.payload);
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
        account: action.payload.account,
        sessionPhoneNumber: action.payload.sessionPhoneNumber,
        deviceId: action.payload.deviceId,
        profile_picture: action.payload.profile_picture,
        profile_picture_device: action.payload.profile_picture_device
      };
    case SESSION_UPDATE_DISPLAY_NAME:
    ////console.log('[SessionReducer] SESSION_UPDATE_DISPLAY_NAME', action.payload);
      return {
          ...state,
          display_name: action.payload.display_name
      };
    case SESSION_UPDATE_PROFILE_PICTURE:
    ////console.log('[SessionReducer] SESSION_UPDATE_PROFILE_PICTURE', action.payload);
      return {
          ...state,
          profile_picture: action.payload.profile_picture,
          profile_picture_device: action.payload.profile_picture_device
      };


    case SESSION_EXIT_PROPER:
      return {
        ...state,
        exitProper: action.payload
      };
    case SESSION_SET_VERSION:
      return {
        ...state,
        version: action.payload
      };
    // case SESSION_UPDATE_APP_STATE:
    //   return {
    //     ...state,
    //     appState: action.payload
    //   };
    default:
      return state;
  }
};
