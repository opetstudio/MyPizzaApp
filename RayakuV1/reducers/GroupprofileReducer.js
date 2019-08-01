import {
  GROUPPROFILE_UPDATE_PHOTO_INPROGRESS,
  GROUPPROFILE_CLEAR_FORM_CREATEGROUP,
  GROUPPROFILE_UPDATE_PHOTO_SUCCESS,
  GROUPPROFILE_UPDATE_INPROGRESS,
  GROUPPROFILE_UPDATE_SUCCESS,
  GROUPPROFILE_UPDATE_ERROR,
  GROUPPROFILE_ONCHANGE_GROUPNAME,
  GROUPPROFILE_ONCHANGE_GROUPPICTURE,
  GROUPPROFILE_CREATE_INPROGRESS,
  GROUPPROFILE_CREATE_SUCCESS,
  GROUPPROFILE_CREATE_ERROR,
  GROUPPROFILE_MODAL_GROUPRENAME_TOGGLE,
  GROUPPROFILE_SET_GROUPID
}
from '../constants';

const INITIAL_STATE = {
  update_photo_profile_inprogress: false,
  update_photo_inprogress: false,
  create_inprogress: false,
  group_id: '',
  group_name: '',
  group_profile_picture: '', // base64
  group_profile_picture_device: '', // base64
  file_id: '',
  isOpenModalGroupRename: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case GROUPPROFILE_SET_GROUPID:
      return {
        ...state,
        group_id: action.payload,
      };
    case GROUPPROFILE_CLEAR_FORM_CREATEGROUP:
      return {
        ...state,
        group_id: '',
        group_name: '',
        group_profile_picture: '',
        group_profile_picture_device: ''
      };
    case GROUPPROFILE_CREATE_INPROGRESS:
      return {
        ...state,
        create_inprogress: true
      };
    case GROUPPROFILE_CREATE_SUCCESS:
      return {
        ...state,
        create_inprogress: false,
        group_name: '',
        group_profile_picture: '',
        group_profile_picture_device: ''
      };
    case GROUPPROFILE_CREATE_ERROR:
      return {
        ...state,
        create_inprogress: false
      };
    case GROUPPROFILE_ONCHANGE_GROUPNAME:
      return {
        ...state,
        group_name: action.payload
      };
    case GROUPPROFILE_ONCHANGE_GROUPPICTURE:
      return {
        ...state,
        group_profile_picture: action.payload.group_profile_picture,
        group_profile_picture_device: action.payload.group_profile_picture_device
      };
    case GROUPPROFILE_UPDATE_PHOTO_INPROGRESS:
      return {
        ...state,
        update_group_photo_profile_inprogress: true
      };
    case GROUPPROFILE_UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        update_group_photo_profile_inprogress: false
      };
    case GROUPPROFILE_UPDATE_INPROGRESS:
      return {
        ...state,
        update_photo_inprogress: true
      };
    case GROUPPROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        update_photo_inprogress: false,
        ...action.payload
      };
    case GROUPPROFILE_UPDATE_ERROR:
      return {
        ...state,
        update_photo_inprogress: false
      };
    case GROUPPROFILE_MODAL_GROUPRENAME_TOGGLE:
      return {
        ...state,
        isOpenModalGroupRename: action.payload.visible
      };
    default:
      return state;
  }
};
