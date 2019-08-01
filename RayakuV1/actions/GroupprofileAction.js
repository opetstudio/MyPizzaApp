import firebase from 'firebase';

import {
  GROUPPROFILE_UPDATE_PHOTO_INPROGRESS,
  GROUPPROFILE_CLEAR_FORM_CREATEGROUP,
  GROUPPROFILE_UPDATE_PHOTO_SUCCESS,
  GROUPPROFILE_UPDATE_INPROGRESS,
  GROUPPROFILE_SET_GROUPID,
  GROUPPROFILE_ONCHANGE_GROUPNAME,
  GROUPPROFILE_ONCHANGE_GROUPPICTURE,
  GROUPPROFILE_UPDATE_SUCCESS,
  GROUP_SET_LAST_MESSAGE,
  GROUPPROFILE_UPDATE_ERROR,
  SELECTED_GROUP_MEMBERS_KEY,
  GROUPPROFILE_MODAL_GROUPRENAME_TOGGLE,
  GROUP_READ_SUCCESS,
  GROUP_UPDATE_PICTURE_BY_ID
}
from '../constants';

export const updateGroupPictureById = ({ groupid, picture }) => (dispatch) => {
  dispatch({ type: GROUP_UPDATE_PICTURE_BY_ID, payload: { groupid, picture } });
};
export const updateGroupProfile = (opt, update_on_firebase = true) => (dispatch, getState) => {
  console.log('GroupprofileAction');
  dispatch({ type: GROUPPROFILE_UPDATE_INPROGRESS });
  if(!opt || opt === {}) return;
  // if(!(opt.phone_number && opt.phone_number !== '')) return;

  // const UserprofileReducer = getState().UserprofileReducer;
  const datagroupprofile = {};
  if(opt.group_name && opt.group_name !== '') datagroupprofile.group_name = opt.group_name || '';
  if(opt.group_profile_picture && opt.group_profile_picture !== '') datagroupprofile.group_profile_picture = opt.group_profile_picture || '';
  if(opt.group_profile_picture_device && opt.group_profile_picture_device !== '') datagroupprofile.group_profile_picture_device = opt.group_profile_picture_device || '';
  if(opt.version && opt.version !== '') datagroupprofile.version = opt.version || '';
  console.log('GroupprofileAction datagroupprofile =>', datagroupprofile);
  // if(update_on_firebase) {
  //   const ref = firebase.database().ref(`/users/${opt.phone_number}`);
  //    ref.update({ ...dataprofile })
  //    .then(() => {
  //      dispatch({ type: GROUPPROFILE_UPDATE_SUCCESS, payload: dataprofile });
  //    })
  //    .catch(err => {
  //      ////console.log('[UserprofileAction] failed update users on firebase. err=', err);
  //      dispatch({ type: GROUPPROFILE_UPDATE_ERROR });
  //    });
  //  } else {
  //    dispatch({ type: GROUPPROFILE_UPDATE_SUCCESS, payload: dataprofile });
  //  }
};

export const saveGroupProfilePicture = (opt) => (dispatch, getState) => {
  dispatch({ type: GROUPPROFILE_UPDATE_PHOTO_INPROGRESS });
  if(!opt || opt === {}) return;
  const GroupprofileReducer = getState().GroupprofileReducer;
  GroupprofileReducer.group_profile_picture = opt.group_profile_picture || '';
  GroupprofileReducer.group_profile_picture_device = opt.group_profile_picture_device || '';
  dispatch({ type: GROUPPROFILE_UPDATE_PHOTO_SUCCESS });
};
export const saveGroupProfileId = (groupid) => (dispatch) => {
  dispatch({ type: GROUPPROFILE_SET_GROUPID, payload: groupid });
};
export const onChangeGroupNameInputText = (txt) => (dispatch) => {
  console.log('txt', txt);
  dispatch({ type: GROUPPROFILE_ONCHANGE_GROUPNAME, payload: txt });
};

export const onChangeGroupPicture =
({ group_profile_picture, group_profile_picture_device }) => (dispatch) => {
  console.log('[GroupprofileAction] onChangeGroupPicture ', group_profile_picture);
  console.log('[GroupprofileAction] onChangeGroupPicture ', group_profile_picture_device);
  dispatch({
      type: GROUPPROFILE_ONCHANGE_GROUPPICTURE,
      payload: {
        group_profile_picture, group_profile_picture_device
      }
  });
};

export const clearFormCreateGroup = () => (dispatch, getState) => {
  dispatch({ type: GROUPPROFILE_CLEAR_FORM_CREATEGROUP });
};
// export const modificationContactEmail = (opt) => {
//   console.log(email);
//   return {
//     type: MODIFICATION_CONTACT_EMAIL,
//     payload: email
//   };
// };
export const setLastMessageToGroupById = (opt) => (dispatch, getState) => {
  console.log('[GroupprofileAction] setLastMessageToGroupById opt=', opt);
  const groupId = opt.groupId;
  const lastMessage = opt.lastMessage;
  const lastMessageTime = opt.createdTimeOnDevice;
  const byId = getState().GroupReducer.byId;
  byId[groupId] = byId[groupId] || {};
  byId[groupId] = {
    ...byId[groupId],
    lastMessage,
    lastMessageTime
  };

  dispatch({ type: GROUP_SET_LAST_MESSAGE, payload: { groupId, lastMessage, byId } });
};
export const modalGroupRenameToggle = (visible) => {
  return {
    type: GROUPPROFILE_MODAL_GROUPRENAME_TOGGLE,
    payload: { visible }
  };
};

export const setInProgressFetchListGroupFalse = () => {
  return {
    type: GROUP_READ_SUCCESS
  };
};

