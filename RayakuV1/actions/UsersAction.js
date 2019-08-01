import firebase from 'firebase';
import _ from 'lodash';

import {
  USER_UPSERT_INPROGRESS,
  USER_UPSERT_SUCCESS
} from '../constants';


const fetchUserDetailSuccess = (dispatch) => {
  // //console.log('[UsersAction] fetchUserDetailSuccess');
  dispatch({
    type: USER_UPSERT_SUCCESS
  });
};

export const fetchUserDetail = (opt) => (dispatch, getState) => {
  let user_phone_number = opt.friendPhoneNumberB64;
  let myPhoneNumberB64 = opt.myPhoneNumberB64;
  // //console.log('[UsersAction] fetchUserDetail user_phone_number=', user_phone_number);
  dispatch({
    type: USER_UPSERT_INPROGRESS
  });
  if (!(user_phone_number && user_phone_number !== '')) {
    return fetchUserDetailSuccess(dispatch);
  }

  const ref = firebase.database().ref(`/users/${user_phone_number}`);
  ref.once('value', (snapshot) => {
    const user_detail = snapshot.val();
    // //console.log('[UsersAction] fetchUserDetail user_detail=', user_detail);
    if (!user_detail) {
      // delete from list friendChats
      if (opt.callbackUserNotFound) opt.callbackUserNotFound(user_phone_number);
      return fetchUserDetailSuccess(dispatch);
    }

    const out = (myDetailInContact) => {
      const byId = getState().UsersReducer.byId;
      const allIds = getState().UsersReducer.allIds;

      if (allIds.indexOf(user_phone_number) === -1) {
        allIds.push(user_phone_number);
      }
      byId[user_phone_number] = {
        ...user_detail,
        me: myDetailInContact || {}
      };
      return fetchUserDetailSuccess(dispatch);
    };

    if (user_detail.device_id && myPhoneNumberB64) {
      firebase.database().ref(`/contacts/${user_detail.device_id}/${myPhoneNumberB64}`)
      .once('value', (snapshot2) => {
        return out(snapshot2.val());
      });
    } else {
      return out(null);
    }
  });
};
