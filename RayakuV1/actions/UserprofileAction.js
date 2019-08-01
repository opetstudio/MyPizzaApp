import firebase from 'firebase';

import {
  USERPROFILE_UPDATE_PHOTO_INPROGRESS,
  USERPROFILE_UPDATE_PHOTO_SUCCESS,
  USERPROFILE_UPDATE_INPROGRESS,
  USERPROFILE_UPDATE_SUCCESS,
  USERPROFILE_UPDATE_ERROR
}
from '../constants';

export const update_userprofile = (opt, update_on_firebase = true) => (dispatch, getState) => {
  dispatch({ type: USERPROFILE_UPDATE_INPROGRESS });
  if (!opt || opt === {}) return;
  if (!(opt.phone_number && opt.phone_number !== '')) return;

  // const UserprofileReducer = getState().UserprofileReducer;
  const dataprofile = {};
  if (opt.fullname && opt.fullname !== '') dataprofile.fullname = opt.fullname || '';
  if (opt.phone_number && opt.phone_number !== '') dataprofile.phone_number = opt.phone_number || '';
  if (opt.display_name && opt.display_name !== '') dataprofile.display_name = opt.display_name || '';
  if (opt.profile_picture && opt.profile_picture !== '') dataprofile.profile_picture = opt.profile_picture || '';
  if (opt.profile_picture_device && opt.profile_picture_device !== '') dataprofile.profile_picture_device = opt.profile_picture_device || '';
  if (opt.version && opt.version !== '') dataprofile.version = opt.version || '';

  if (update_on_firebase) {
    const ref = firebase.database().ref(`/users/${opt.phone_number}`);
     ref.update({ ...dataprofile })
     .then(() => {
       dispatch({ type: USERPROFILE_UPDATE_SUCCESS, payload: dataprofile });
     })
     .catch((err) => {
       // //console.log('[UserprofileAction] failed update users on firebase. err=', err);
       dispatch({ type: USERPROFILE_UPDATE_ERROR });
     });
   } else {
     dispatch({ type: USERPROFILE_UPDATE_SUCCESS, payload: dataprofile });
   }
};

export const saveProfilePicture = (opt) => (dispatch, getState) => {
  dispatch({ type: USERPROFILE_UPDATE_PHOTO_INPROGRESS });
  if(!opt || opt === {}) return;
  const UserprofileReducer = getState().UserprofileReducer;
  UserprofileReducer.profile_picture = opt.profile_picture || '';
  UserprofileReducer.profile_picture_device = opt.profile_picture_device || '';
  dispatch({ type: USERPROFILE_UPDATE_PHOTO_SUCCESS });
}
