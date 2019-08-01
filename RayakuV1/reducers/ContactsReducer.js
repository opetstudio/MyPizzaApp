import {
  CONTACTS_FETCH_ALL_FAILED,
  CONTACTS_FETCH_ALL_SUCCESS,
  CONTACTS_FETCH_ALL_INPROGRESS,

  CONTACTS_FETCH_ONCE_FAILED,
  CONTACTS_FETCH_ONCE_INPROGRESS,
  CONTACTS_FETCH_ONCE_SUCCESS,

  CONTACTS_FETCH_ALL_RAYAKU_SUCCESS,
  CONTACTS_FETCH_ALL_NONRAYAKU_SUCCESS,
  CONTACTS_SET_RELOAD,
  CONTACTS_PUSH_INPROGRESS,
  CONTACTS_PUSH_FINISH,
  CONTACTS_UPDATE_STATUS_RAYAKU,
} from '../constants';

const INITIAL_STATE = {
  pushContactsInprgress: false,
  fetchAllLocalInProcess: false,
  fetchOnceInProcess: false,
  fetchAllInProcess: false,
  firstLoaded: true,
  reLoad: false,
  rePush: false,
  errorMessage: '',
  listAllLocal: [],
  allLocalIndexUidObj: {},
  new_data_queue: [],
  listAll: [],
  listAllRayaku: [],
  listAllNotRayaku: [],
  listAllObj: {},
  listOne: {},
  inputMessageObj: {},
  byId: {},
  allIds: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case CONTACTS_SET_RELOAD:
      return {
        ...state,
        reLoad: true
      };
    case CONTACTS_FETCH_ONCE_INPROGRESS:
      return {
        ...state,
        fetchOnceInProcess: true,
      };
    case CONTACTS_FETCH_ONCE_FAILED:
      return {
        ...state,
        fetchOnceInProcess: false,
      };
    case CONTACTS_FETCH_ONCE_SUCCESS:
      return {
        ...state,
        fetchOnceInProcess: false,
      };

    case CONTACTS_FETCH_ALL_INPROGRESS:
      return {
        ...state,
        fetchAllInProcess: true,
        reLoad: false,
        firstLoaded: false,
        fetchAllLocalInProcess: true,
      };

    case CONTACTS_FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchAllInProcess: false,
        fetchAllLocalInProcess: false,
        firstLoaded: false,
        reLoad: false
      };
    case CONTACTS_FETCH_ALL_FAILED:
      return {
        ...state,
        fetchAllInProcess: false,
        fetchAllLocalInProcess: false,
        firstLoaded: false,
        reLoad: false
      };

    case CONTACTS_FETCH_ALL_RAYAKU_SUCCESS:
      return {
        ...state,
        fetchAllInProcess: false,
        listAllRayaku: action.payload,
        firstLoaded: false,
        reLoad: false
      };
    case CONTACTS_FETCH_ALL_NONRAYAKU_SUCCESS:
      return {
        ...state,
        fetchAllInProcess: false,
        listAllNotRayaku: action.payload,
        firstLoaded: false,
        reLoad: false
      };
    case CONTACTS_PUSH_INPROGRESS:
      return {
        ...state,
        pushContactsInprgress: true,
        rePush: false
      };
    case CONTACTS_PUSH_FINISH:
      return {
        ...state,
        pushContactsInprgress: false,
        rePush: false
      };
    case CONTACTS_UPDATE_STATUS_RAYAKU:
      return {
        ...state,
        byId: action.payload.byId,
      };
    default:
      return state;
  }
};
