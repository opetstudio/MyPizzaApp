import {
  USERPROFILE_UPDATE_PHOTO_INPROGRESS,
  USERPROFILE_UPDATE_PHOTO_SUCCESS,
  USERPROFILE_UPDATE_INPROGRESS,
  USERPROFILE_UPDATE_SUCCESS,
  USERPROFILE_UPDATE_ERROR
}
from '../constants';

const INITIAL_STATE = {
  update_photo_profile_inprogress: false,
  update_inprogress: false,
  fullname: '',
  phone_number: '',
  display_name: '',
  profile_picture: '', //base64
  profile_picture_device: '', //base64
  file_id: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case USERPROFILE_UPDATE_PHOTO_INPROGRESS:
      return {
        ...state,
        update_photo_profile_inprogress: true
      };
    case USERPROFILE_UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        update_photo_profile_inprogress: false
      };
    case USERPROFILE_UPDATE_INPROGRESS:
      return {
        ...state,
        update_inprogress: true
      };
    case USERPROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        update_inprogress: false,
        ...action.payload
      };
    case USERPROFILE_UPDATE_ERROR:
      return {
        ...state,
        update_inprogress: false
      };
    default:
      return state;
  }
};
