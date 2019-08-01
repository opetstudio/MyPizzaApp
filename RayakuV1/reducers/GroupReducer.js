import {
  GROUP_CREATE_INPROGRESS,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_ERROR,
  GROUP_READ_INPROGRESS,
  GROUP_READ_SUCCESS,
  GROUP_READ_ERROR,
  GROUP_SET_LAST_MESSAGE,
  GROUP_UPDATE_PICTURE_BY_ID,
  GROUP_RENAME_INPROGRESS,
  GROUP_RENAME_SUCCESS,
  GROUP_RENAME_ERROR,
  GROUP_RM_ONE_MEMBER_INPROGRESS,
  GROUP_RM_ONE_MEMBER_SUCCESS,
  GROUP_RM_ONE_MEMBER_ERROR
} from '../constants';

const INITIAL_STATE = {
  isRmOneGroupMemberInprogress: false,
  isGroupRenameInprogress: false,
  createInProgress: false,
  readInProgress: false,
  newGroupData: {},
  byId: {},
  allIds: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case GROUP_UPDATE_PICTURE_BY_ID:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.groupid]: {
            ...state.byId[action.payload.groupid] || {},
            picture: action.payload.picture
          }
        }
      };
    case GROUP_RENAME_INPROGRESS:
      return {
        ...state,
        isGroupRenameInprogress: true
      };
    case GROUP_RENAME_SUCCESS:
      return {
        ...state,
        isGroupRenameInprogress: false,
        byId: {
          ...state.byId,
          ...action.payload
        }
      };
    case GROUP_RENAME_ERROR:
      return {
        ...state,
        isGroupRenameInprogress: false
      };
    case GROUP_SET_LAST_MESSAGE:
      return {
        ...state,
        byId: action.payload.byId
      };
    case GROUP_CREATE_INPROGRESS:
      return {
        ...state,
        createInProgress: true
      };
    case GROUP_CREATE_SUCCESS:
      return {
        ...state,
        createInProgress: false
      };
    case GROUP_CREATE_ERROR:
      return {
        ...state,
        createInProgress: false
      };
    case GROUP_READ_INPROGRESS:
      return {
        ...state,
        readInProgress: true
      };
    case GROUP_READ_SUCCESS:
      return {
        ...state,
        readInProgress: false
      };
    case GROUP_READ_ERROR:
      return {
        ...state,
        readInProgress: false
      };
    case GROUP_RM_ONE_MEMBER_INPROGRESS:
      return {
        ...state,
        isRmOneGroupMemberInprogress: true
      };
    case GROUP_RM_ONE_MEMBER_SUCCESS:
      return {
        ...state,
        isRmOneGroupMemberInprogress: false,
        byId: {
          ...state.byId,
          ...action.payload
        }
      };
    case GROUP_RM_ONE_MEMBER_ERROR:
      return {
        ...state,
        isRmOneGroupMemberInprogress: false
      };
    default:
      return state;
  }
};
