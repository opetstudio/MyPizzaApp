
import {
  NOTIFICATION_PUSH,
  NOTIFICATION_FETCH_ALL_SUCCESS,
  NOTIFICATION_SET_RELOAD,
  NOTIFICATION_ON_LESTENING,
  NOTIFICATION_INC_BADGE,
  NOTIFICATION_RESET_BADGE,
  NOTIFICATION_ONVALUE_INPROGRESS,
  NOTIFICATION_ONVALUE_DONE,
  NOTIFICATION_INC_LAUNCH_BADGE,
  NOTIFICATION_RESET_LAUNCH_BADGE,
  NOTIFICATION_CONSUME_INPROGRESS,
  NOTIFICATION_CONSUME_DONE,
  NOTIFICATION_PUSH_NEWINCOMING_DONE,
  NOTIFICATION_PUSH_NEWINCOMING_INPROGRESS,
  NOTIFICATION_POPUP,
}
from '../constants';

const INITIAL_STATE = {
  onValueInprogress: false,
  launchBadge: 0,
  reLoad: false,
  onListening: false,
  badges: {},
  fetchAllInProcess: false,
  errorMessage: '',
  listAll: [],
  notificationUidQueue: [],
  consumeNotificationInprogress: false,
  pushNewByIdInprogress: {},
  newById: {},
  newAllIds: [],
  popupNotification: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_POPUP: return { ...state, popupNotification: action.payload.popupNotification };
    case NOTIFICATION_PUSH_NEWINCOMING_INPROGRESS: return { ...state, pushNewByIdInprogress: true };
    case NOTIFICATION_PUSH_NEWINCOMING_DONE: return {
      ...state,
      pushNewByIdInprogress: false,
      newById: action.payload.newById,
      newAllIds: action.payload.newAllIds
    };
    case NOTIFICATION_CONSUME_INPROGRESS: return { ...state, consumeNotificationInprogress: true };
    case NOTIFICATION_CONSUME_DONE: return { ...state, consumeNotificationInprogress: false };
    case NOTIFICATION_SET_RELOAD: return { ...state, reLoad: action.payload };
    case NOTIFICATION_ONVALUE_INPROGRESS: return { ...state, onValueInprogress: true };
    case NOTIFICATION_ONVALUE_DONE: return { ...state, onValueInprogress: false };
    case NOTIFICATION_FETCH_ALL_SUCCESS:
      return {
        ...state,
        listAll: action.payload,
        reLoad: false
      };
    case NOTIFICATION_PUSH:
      return {
        ...state,
        listAll: action.payload,
        reLoad: false
      };
    case NOTIFICATION_INC_BADGE:
      state.badges[action.payload] = state.badges[action.payload] || 0;
      state.badges[action.payload] += 1;
      return {
        ...state
      };
    case NOTIFICATION_RESET_BADGE:
      state.badges[action.payload] = state.badges[action.payload] || 0;
      state.badges[action.payload] = 0;
      return {
        ...state
      };
    case NOTIFICATION_ON_LESTENING:
      return {
        ...state,
        onListening: action.payload
      };
    case NOTIFICATION_INC_LAUNCH_BADGE:
      return {
        ...state
      };
    case NOTIFICATION_RESET_LAUNCH_BADGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
