import {
  CHATS_FETCH_ALL_INPROGRESS,
  CHATS_FETCH_ALL_SUCCESS,
  CHATS_FETCH_ALL_ERROR,
  CHATS_JOIN_CONTACT,
  CHATS_SET_RELOAD,
  CHATS_RESET_BADGE
}
from '../constants';

const INITIAL_STATE = {
  reLoad: false,
  onListening: false,
  fetchAllInProcess: false,
  errorMessage: '',
  listAll: [],
  listAllObj: {},
  listOne: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
    return {
      ...INITIAL_STATE
    };
    case CHATS_SET_RELOAD: return { ...state, reLoad: true };
    case CHATS_FETCH_ALL_INPROGRESS:
      return {
        ...state,
        fetchAllInProcess: true,
        reLoad: false
      };
    case CHATS_FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchAllInProcess: false,
        reLoad: false,
        listAll: action.payload
      };
    case CHATS_JOIN_CONTACT:
      ////console.log('[ChatsReducer] CHATS_JOIN_CONTACT', action.payload);
      return {
        ...state
      };
    case CHATS_FETCH_ALL_ERROR:
      return {
        ...state,
        fetchAllInProcess: false,
        reLoad: false
      };
    case CHATS_RESET_BADGE:
      return {
        ...state,
        listAll: action.payload
      };
    default:
      return state;
  }
};
