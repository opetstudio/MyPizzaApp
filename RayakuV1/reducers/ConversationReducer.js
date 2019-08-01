// import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE
import _ from 'lodash';

import {
  CONVERSATION_FETCH_ALL_INPROGRESS,
  CONVERSATION_DELETE_MESSAGE_INPROGRESS,
  CONVERSATION_DELETE_MESSAGE_SUCCESS,
  CONVERSATION_FETCH_ALL_SUCCESS,
  CONVERSATION_FETCH_ALL_ERROR,
  CONVERSATION_INPUTMESSAGE_MODIFICATION,
  CONVERSATION_SEND_MESSAGE_SUCCESS,
  CONVERSATION_SEND_MESSAGE_ERROR_NETWORK,
  CONVERSATION_SEND_MESSAGE_ERROR,
  CONVERSATION_SEND_MESSAGE_FAILED,
  CONVERSATION_SEND_MESSAGE_INPROGRESS,
  CONVERSATION_ACTIVATE_FETCHING,
  CONVERSATION_PUSH_LOCAL_NEW_MESSAGE,
  CONVERSATION_UPDATE_STATUS_MESSAGE,
  CONVERSATION_RESET_BADGE,
  CONVERSATION_SET_RELOAD,
  CONVERSATION_UPDATE_STATUS_READ,
  CONVERSATION_PUSH_NEW_CHAT,
  CONVERSATION_ON_FOCUS,
  CONVERSATION_FETCH_ALL_EACH_FINISH,
  CONVERSATION_FETCH_ALL_EACH_INPROGRESS,
  CONVERSATION_RESET_GROUP_BADGE,
  CONVERSATION_SAVE_CONVERSATION,
  CONVERSATION_FETCH_ALL_GROUP_MESSAGE_INPROGRESS,
  CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE,
  CONVERSATION_UPDATE_STATUS_READ_PER_MESSAGE_GROUP,
  CONVERSATION_DELETE_FRIENDCHAT
}
from '../constants';

const INITIAL_STATE = {
  isFetchAllGroupMessageInProgress: false,
  sendMessageInProgress: false,
  pleaseFetchNewMessage: false,
  fetchAllConversationInProgress: false,
  fetchAllInProcess: false,
  deleteMessageInprogress: false,
  errorMessage: '',
  newChatsUid: '',
  latestCreatedTimeOnDevice: 0,
  listObjFriendsPhoneNumber: {},
  listAll: [],
  listAllObj: {},
  listOne: {},
  inputMessageObj: {},
  conversationOnFocus: '',
  lastNewMessageCreatedon: 0,
  byId: {},
  allIds: [],
  friendMessages: {},
  friendChats: {},
  friendChatsBadge: {},
  friendChatsUidList: [],
  reLoad: false,
  autoIncrement: 0,
  networkErrorQueue: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case CONVERSATION_SEND_MESSAGE_FAILED: return {
      ...state,
      sendMessageInProgress: false,
      byId: {
        ...state.byId,
        [action.payload.messageid]: action.payload.messageDataFailed
      }
    };
    case CONVERSATION_DELETE_FRIENDCHAT: return {
      ...state,
      friendChats: {
        ..._.omit(state.friendChats, [action.payload.userid])
      }
    };
    case CONVERSATION_UPDATE_STATUS_READ_PER_MESSAGE_GROUP: return {
      ...state,
      byId: {
        ...state.byId,
        ...action.payload.updatedMessageData
      }
    };
    case CONVERSATION_FETCH_ALL_GROUP_MESSAGE_INPROGRESS: return { ...state, isFetchAllGroupMessageInProgress: true };
    case CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE: return { ...state, isFetchAllGroupMessageInProgress: false };
    case CONVERSATION_SAVE_CONVERSATION: return {
       ...state,
       friendMessages: {
         ...state.friendMessages,
         [action.payload.conversation_id]:
         [
           ...(state.friendMessages[action.payload.conversation_id] || []),
           ...action.payload.list_new_message_id_per_conversation
         ],
       },
       friendChats: {
         ...state.friendChats,
         ...action.payload.conversation_row
       },
       friendChatsUidList: [
         ...state.friendChatsUidList, ...action.payload.list_new_conversation_id
        ],
       byId: {
         ...state.byId,
         ...action.payload.new_message_data_byid
        },
       friendChatsBadge: {
         ...state.friendChatsBadge, ...action.payload.total_badge_per_conversation
        },
       allIds: [...state.allIds, ...action.payload.list_new_message_id]
      };
    case CONVERSATION_RESET_GROUP_BADGE: return {
      ...state,
      friendChatsBadge: {
        ...state.friendChatsBadge,
        ...action.payload.total_badge_per_conversation
      }
    };
    case CONVERSATION_FETCH_ALL_EACH_INPROGRESS: return { ...state, fetchAllConversationInProgress: true };
    case CONVERSATION_FETCH_ALL_EACH_FINISH: return { ...state, fetchAllConversationInProgress: false };
    case CONVERSATION_SET_RELOAD: return { ...state, reLoad: true };
    case CONVERSATION_ON_FOCUS: return { ...state, conversationOnFocus: action.payload };

    case CONVERSATION_FETCH_ALL_INPROGRESS:
      // //console.log('[ConversationReducer] CONVERSATION_FETCH_ALL_INPROGRESS');
      return {
        ...state,
        fetchAllInProcess: true,
        pleaseFetchNewMessage: false,
        reLoad: false
      };
    case CONVERSATION_ACTIVATE_FETCHING:
      state.listObjFriendsPhoneNumber[action.payload] = true;
      return {
        ...state,
        pleaseFetchNewMessage: true
      };
    case CONVERSATION_FETCH_ALL_SUCCESS:
      // ////console.log('[ConversationReducer] CONVERSATION_FETCH_ALL_SUCCESS ', state.byId);
      return {
        ...state,
        fetchAllInProcess: false,
        reLoad: false,
        // byId: action.payload.byId,
        // allIds: action.payload.allIds,
        // friendMessages: action.payload.friendMessages,
        // lastNewMessageCreatedon: action.payload.lastNewMessageCreatedon,
        // friendChats: action.payload.friendChats,
        // friendChatsBadge: action.payload.friendChatsBadge,
        // friendChatsUidList: action.payload.friendChatsUidList
      };
    case CONVERSATION_PUSH_NEW_CHAT:
      return {
        ...state,
        latestCreatedTimeOnDevice: action.payload
      };
    case CONVERSATION_FETCH_ALL_ERROR:
      return {
        ...state,
        fetchAllInProcess: false
      };
    case CONVERSATION_RESET_BADGE:
      return {
        ...state,
        friendChats: action.payload
      };
    case CONVERSATION_INPUTMESSAGE_MODIFICATION:
      ////console.log('[ConversationReducer] CONVERSATION_INPUTMESSAGE_MODIFICATION');
      return {
        ...state,
        // inputMessageObj: action.payload
      };
    case CONVERSATION_SEND_MESSAGE_SUCCESS:
      // //console.log('[ConversationReducer] CONVERSATION_SEND_MESSAGE_SUCCESS');
      return {
        ...state,
        sendMessageInProgress: false
      };
    case CONVERSATION_SEND_MESSAGE_ERROR_NETWORK:
      return {
        ...state,
        sendMessageInProgress: false
        // networkErrorQueue: [...state.networkErrorQueue, action.payload.id_message]
      };
    case CONVERSATION_SEND_MESSAGE_ERROR:
      return {
        ...state,
        sendMessageInProgress: false
      };
    case CONVERSATION_UPDATE_STATUS_READ:
      return {
        ...state,
        byId: action.payload.byId,
        friendChatsBadge: action.payload.friendChatsBadge,
      };
    case CONVERSATION_UPDATE_STATUS_MESSAGE:
      return {
        ...state,
        // byId: action.payload.byId
      };
    case CONVERSATION_SEND_MESSAGE_INPROGRESS:
      return {
        ...state,
        sendMessageInProgress: true
      };
    case CONVERSATION_PUSH_LOCAL_NEW_MESSAGE:
      return {
        ...state,
      };
    case CONVERSATION_DELETE_MESSAGE_INPROGRESS:
      return {
        ...state,
        deleteMessageInprogress: true
      };
    case CONVERSATION_DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        deleteMessageInprogress: false
      };
    default:
      return state;
  }
};
