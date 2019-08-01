import firebase from 'firebase';
import gql from 'graphql-tag';
import _ from 'lodash';
import { AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getGMTunixtime } from '../utils/util';
import {
  CONVERSATION_FETCH_ALL_SUCCESS,
  CONVERSATION_FETCH_ALL_INPROGRESS,
  CONVERSATION_INPUTMESSAGE_MODIFICATION,
  CONVERSATION_SEND_MESSAGE_SUCCESS,
  CONVERSATION_SEND_MESSAGE_INPROGRESS,
  CONVERSATION_PUSH_NEW_CHAT,
  CONVERSATION_SET_RELOAD,
  CONVERSATION_UPDATE_STATUS_READ,
  CONVERSATION_PUSH_LOCAL_NEW_MESSAGE,
  CONVERSATION_UPDATE_STATUS_MESSAGE,
  CONVERSATION_FETCH_ALL_EACH_INPROGRESS,
  CONVERSATION_FETCH_ALL_EACH_FINISH,
  CONVERSATION_DELETE_MESSAGE_INPROGRESS,
  CONVERSATION_DELETE_MESSAGE_SUCCESS,
  CONVERSATION_RESET_GROUP_BADGE,
  CONVERSATION_FETCH_ALL_GROUP_MESSAGE_INPROGRESS,
  CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE,
  CONVERSATION_UPDATE_STATUS_READ_PER_MESSAGE_GROUP,
  CONVERSATION_SAVE_CONVERSATION,
  CONVERSATION_DELETE_FRIENDCHAT,
  CONVERSATION_SEND_MESSAGE_FAILED
} from '../constants';

import { setTotalbadgeAsyncStorage } from '../api/asyncstorageApi';
import { sendFCM, sendMessageApi } from '../api/rayaku-fcm-js';
import { sendRemoteData, sendRemoteNotif } from '../api/fcm_api';

import { decrementBadgeNumber } from './NotificationAction';
import client from '../apolloClient';


export const setReload = () => (dispatch) => {
  dispatch({
    type: CONVERSATION_SET_RELOAD
  });
};
const updateMessage = (messageData, cb = () => {}) => {
  // console.log('[ConversationAction] updateMessage =>', messageData);

  firebase.database()
  .ref(`/messages/${messageData.sender_phone_number}` +
    `/${messageData.receiver_phone_number}/${messageData.uid}`)
  .update({
    ...messageData,
    createdTimeOnDevice: messageData.localTimeStatusPending,
    type: 's'
  })
  .then(() => {
    // console.log('[ConversationAction] updateMessage sender success =>', messageData);
    firebase.database()
    .ref(`/messages/${messageData.receiver_phone_number}` +
      `/${messageData.sender_phone_number}/${messageData.uid}`)
    .set({
      ...messageData,
      type: 'r'
    })
    .then(() => {
      // console.log('[ConversationAction] updateMessage receiver success =>', messageData);
      cb();
    });
  });
};
const updateMessageStatusToRead = (messageData, cb = () => {}) => {
  // console.log('[ConversationAction] updateMessageStatusToRead =>', messageData);
  const modifiedon = getGMTunixtime();
  const serverTimeStatusRead = firebase.database.ServerValue.TIMESTAMP;
  const localTimeStatusRead = new Date().getTime();

  const dataUpdate = {
    status: 4,
    modifiedon,
    serverTimeStatusRead,
    localTimeStatusRead
  };

  firebase.database()
  .ref(`/messages/${messageData.sender_phone_number}` +
    `/${messageData.receiver_phone_number}/${messageData.uid}`)
  .update(dataUpdate)
  .then(() => {
    // console.log('[ConversationAction] updateMessage sender success =>', messageData);
    firebase.database()
    .ref(`/messages/${messageData.receiver_phone_number}` +
      `/${messageData.sender_phone_number}/${messageData.uid}`)
    .update(dataUpdate)
    .then(() => {
      // console.log('[ConversationAction] updateMessage receiver success =>', messageData);
      cb();
    });
  });
};
const updateMessageStatusToReadGroup = ({ messageStatusReadData, my_msisdn }, cb = () => {}) => {
  const messageData = messageStatusReadData;
  // console.log('[ConversationAction] updateMessageStatusToRead =>', messageData);
  const modifiedon = getGMTunixtime();
  const serverTimeStatusRead = firebase.database.ServerValue.TIMESTAMP;
  const localTimeStatusRead = new Date().getTime();

  const userGroupMessageDataUpdate = {
    status: messageData.status,
    modifiedon,
    serverTimeStatusRead,
    localTimeStatusRead
  };
  // set status message on tb_message to "3" (delivered)
  const messageDataUpdate = {
    status_message: 3
  };
  // const sender = messageData.sender_phone_number || messageData.sender;
  const receiver = messageData.receiver_phone_number || messageData.receiver;
  const messageid = messageData.id || messageData.uid;

  firebase.database()
  .ref(`/user_group_message/${my_msisdn}` +
    `/${receiver}/${messageid}`)
  .update(userGroupMessageDataUpdate)
  .then(() => {
    // console.log('[ConversationAction] updateMessage sender success =>', messageData);
    // firebase.database()
    // .ref(`/tb_messages/${messageid}`)
    // .update(messageDataUpdate)
    // .then(() => {
    //   // console.log('[ConversationAction] updateMessage receiver success =>', messageData);
      cb(userGroupMessageDataUpdate, messageDataUpdate);
    // });
  });
};

const createMessage = (messageData, cb = () => {}) => {
  cb();
  // firebase.database()
  // .ref(`/messages/${messageData.sender_phone_number}` +
  //   `/${messageData.receiver_phone_number}/${messageData.uid}`)
  // .set({
  //   ...messageData,
  //   type: 's'
  // })
  // .then(() => {
  //   firebase.database()
  //   .ref(`/messages/${messageData.receiver_phone_number}` +
  //     `/${messageData.sender_phone_number}/${messageData.uid}`)
  //   .set({
  //     ...messageData,
  //     type: 'r'
  //   })
  //   .then(() => {
  //     cb();
  //   });
  // });
};
const updateStatusRead = (dispatch, getState, messageUnRead, cb = () => {}) => {
  // console.log('[ConversationAction] updateStatusRead =>', messageUnRead);
  const byId = getState().ConversationReducer.byId;
  const friendChatsBadge = getState().ConversationReducer.friendChatsBadge;
  const modifiedon = getGMTunixtime();
  const serverTimeStatusRead = firebase.database.ServerValue.TIMESTAMP;
  const localTimeStatusRead = new Date().getTime();
  if (AppState.currentState !== 'active') {
    return null;
  }
  messageUnRead.forEach((msg) => {
    const messageStatusReadData = {
      ...msg,
      status: 4,
      modifiedon,
      serverTimeStatusRead,
      localTimeStatusRead,
    };
    if (msg !== null && msg !== undefined) {
      const v = msg.uid;
      if (byId[v] !== null && byId[v] !== undefined) {
        if (byId[v].status < 4 && byId[v].type === 'r') {
          updateMessageStatusToRead(messageStatusReadData, () => {
            if (byId[v].type === 'r') {
              console.log('tracebadge messageStatusReadData=', messageStatusReadData);

              const createdon = getGMTunixtime();
              const notificationData = {
                message: {
                  title: '',
                  content: ''
                },
                servertimestamp: firebase.database.ServerValue.TIMESTAMP,
                createdon,
                modifiedon: createdon,
                command: 'update_status_message',
                params: {
                  msg_uid: messageStatusReadData.uid,
                  status: messageStatusReadData.status,
                  serverTimeStatusRead,
                  localTimeStatusRead
                },
                show_on_localnotif: 'no'
              };
              firebase.database().ref(`/notifications/${messageStatusReadData.sender_phone_number}`)
              .push(notificationData).then(() => {
                // console.log('[ConversationAction] push notification success =>', notificationData);
                byId[v] = messageStatusReadData;
                const friendBadge =
                friendChatsBadge[messageStatusReadData.sender_phone_number] || 0;
                if (friendBadge > 0) {
                  friendChatsBadge[byId[v].sender_phone_number] = friendBadge - 1;
                  decrementBadgeNumber(messageStatusReadData.receiver_phone_number, messageStatusReadData.sender_phone_number, friendBadge - 1);
                }
                dispatch({
                  type: CONVERSATION_UPDATE_STATUS_READ,
                  payload: {
                    byId,
                    friendChatsBadge
                  }
                });

              });
            }
          });
        }
      }
    }
  });
};
const pushRemoteNotification = (notificationData, receiver_device, userDetail, cb = () => {}) => {
  // console.log('[ConversationAction][pushRemoteNotification] notificationData=', notificationData);
  firebase.database().ref(`/notifications/${receiver_device}`)
  .push(notificationData).then((p,p2) => {
    // console.log('[ConversationAction][pushRemoteNotification] sent notifications success p=',p.key);
    // console.log('[ConversationAction][pushRemoteNotification] sent notifications success p2',p2);
    // console.log('[ConversationAction][pushRemoteNotification] userDetail=', userDetail);

    if(userDetail && userDetail !== {}) {

      let registrationToken = userDetail.fcm_token;
      let platform = userDetail.platform;
      let me = userDetail.me || {};
      let fcm_server = false;

      const payload_data = {
        data: {
          id: p.key,
          title: me.name || notificationData.params.sender_phone_number,
          body: notificationData.message.content,
          sound: 'default',
          content_available: 'true',
          // 'testing': 'testing',
          notif: JSON.stringify(notificationData)
          // 'key': `${p.key}---${receiver_device}`,
          // 'key-testing': `${p.key}---${receiver_device}`
        }
      };

      if (fcm_server) {
          sendRemoteData(registrationToken, payload_data.data);
          if (platform === 'ios') {
            sendRemoteNotif(registrationToken, payload_data.data);
          }
      } else {
        sendFCM({
          dest_phone_number: receiver_device,
          notification: notificationData,
          payload_data: payload_data.data,
          key: p.key
        })
        .then((respJson) => {
          // console.log('[ConversationAction][pushRemoteNotification] success sendFCM respJson=', respJson);
        })
        .catch((err) => {
          // console.log('[ConversationAction][pushRemoteNotification] error sendFCM err=', err);
        });
      }
    }

    if (cb && typeof cb === 'function') { cb(); }
  });
};
export const setConversationOnFocus = (phoneNumber) => (dispatch, getState) => {
  const ConversationReducer = getState().ConversationReducer;
  ConversationReducer.conversationOnFocus = phoneNumber;
};
export const updateMessageToDeliveredOnServer =
(messageForSender, messageForReceiver, cb = () => {}) => {
  firebase.database()
  .ref(`/messages/${messageForSender.sender_phone_number}` +
    `/${messageForSender.receiver_phone_number}/${messageForSender.uid}`)
  .set(messageForSender)
  .then(() => {
    firebase.database()
    .ref(`/messages/${messageForReceiver.receiver_phone_number}` +
      `/${messageForReceiver.sender_phone_number}/${messageForReceiver.uid}`)
    .set(messageForReceiver)
    .then(() => {
      // //console.log('[ConversationAction] updateMessageToDelivered done', messageForReceiver);
      cb({
        messageForSender,
        messageForReceiver
      });
    });
  });
};
export const updateMessageToDelivered = (messageData, cb = () => {}) => (dispatch, getState) => {
  // console.log('[ConversationAction] updateMessageToDelivered', messageData);
  const currentMessage = getState().ConversationReducer.byId[messageData.uid] || {};
  if (
    currentMessage !== {}
    && currentMessage.status !== 4
  ) {
    const modifiedon = getGMTunixtime();
    const messageForSender = {
      ...messageData,
      createdTimeOnDevice: messageData.localTimeStatusPending,
      modifiedon,
      type: 's'
    };
    const messageForReceiver = {
      ...messageData,
      modifiedon,
      type: 'r'
    };

    updateMessageToDeliveredOnServer(messageForSender, messageForReceiver, () => {
      // console.log('[ConversationAction] updateMessageToDelivered done', messageData);
      if (getState().ConversationReducer.conversationOnFocus
      === messageForSender.sender_phone_number
      && AppState.currentState === 'active'
    && Actions.currentScene === 'conversations1') {
        updateStatusRead(dispatch, getState, [messageForReceiver]);
      } else {
        cb({
          messageForSender,
          messageForReceiver
        });
      }
    });
  }
};

export const updateMessageToDeliveredGroup = ({ newMessageData, my_msisdn }, cb = () => {}) => (dispatch, getState) => {
  const messageData = newMessageData;
  // return {
  //   ...xMessageData,
  //   modifiedon: createdon,
  //   status: 3,
  //   serverTimeStatusDelivered: firebase.database.ServerValue.TIMESTAMP,
  //   serverTimeStatusRead: 0,
  //   localTimeStatusRead: 0,
  //   localTimeStatusDelivered,
  //   createdTimeOnDevice: localTimeStatusDelivered,
  //   type: 'r'
  // };
  // console.log('[ConversationAction] updateMessageStatusToRead =>', messageData);
  const modifiedon = messageData.modifiedon;
  const serverTimeStatusDelivered = messageData.serverTimeStatusDelivered;
  const localTimeStatusDelivered = messageData.localTimeStatusDelivered;
  const createdTimeOnDevice = messageData.createdTimeOnDevice;

  const userGroupMessageDataUpdate = {
    createdTimeOnDevice,
    status: 3,
    modifiedon,
    serverTimeStatusDelivered,
    localTimeStatusDelivered
  };
  // set status message on tb_message to "3" (delivered)
  const messageDataUpdate = {
    status_message: 3
  };
  // const sender = messageData.sender_phone_number || messageData.sender;
  const receiver = messageData.receiver_phone_number || messageData.receiver;
  const messageid = messageData.id || messageData.uid;

  firebase.database()
  .ref(`/user_group_message/${my_msisdn}` +
    `/${receiver}/${messageid}`)
  .update(userGroupMessageDataUpdate)
  .then(() => {
    // console.log('[ConversationAction] updateMessage sender success =>', messageData);
    // firebase.database()
    // .ref(`/tb_messages/${messageid}`)
    // .update(messageDataUpdate)
    // .then(() => {
    //   // console.log('[ConversationAction] updateMessage receiver success =>', messageData);
      cb(userGroupMessageDataUpdate, messageDataUpdate);
    // });
  });
};
// export const conversationResetBadge = () => (dispatch, getState) => {
//   // console.log('[ConversationAction] conversationResetBadge');
//   let totalBadge = 0;
//   _.map(getState().ConversationReducer.friendChatsBadge, (v) => {
//     totalBadge += v;
//   });
//   // console.log('[ConversationAction] conversationResetBadge run asyncstorageApi.setTotalbadgeAsyncStorage');
//   setTotalbadgeAsyncStorage(totalBadge).then(() => {
//     // console.log('[ConversationAction] success setTotalbadgeAsyncStorage totalBadge=', totalBadge);
//   }).catch(err => {
//     // console.log('[ConversationAction] error setTotalbadgeAsyncStorage', err);
//   });
//   PushNotification.setApplicationIconBadgeNumber(totalBadge);
// };
export const dispatchChatsList = (createdTimeOnDevice) => (dispatch) => {
  dispatch({
    type: CONVERSATION_PUSH_NEW_CHAT,
    payload: createdTimeOnDevice
  });
};

export const setMessageDataFromNotification = (xMessageData) => {
  const createdon = getGMTunixtime();
  const localTimeStatusDelivered = new Date().getTime();
  return {
    ...xMessageData,
    modifiedon: createdon,
    status: 3,
    serverTimeStatusDelivered: firebase.database.ServerValue.TIMESTAMP,
    serverTimeStatusRead: 0,
    localTimeStatusRead: 0,
    localTimeStatusDelivered,
    createdTimeOnDevice: localTimeStatusDelivered,
    type: 'r'
  };
};

export const receiveMessage = (xMessageData, cb = () => {}) => (dispatch, getState) => {
  const allIds = getState().ConversationReducer.allIds;
  const byId = getState().ConversationReducer.byId;
  const friendMessages = getState().ConversationReducer.friendMessages;
  const friendChats = getState().ConversationReducer.friendChats;
  const friendChatsUidList = getState().ConversationReducer.friendChatsUidList;
  const friendChatsBadge = getState().ConversationReducer.friendChatsBadge;
  const is_group_msg = ('is_group_msg' in xMessageData && xMessageData.is_group_msg === 'yes');
  const messageData = xMessageData;
  const createdon = getGMTunixtime();
  const friendPhoneNumberB64 =
  (is_group_msg) ? xMessageData.receiver : xMessageData.sender_phone_number || xMessageData.sender;
  const message_id = messageData.uid || messageData.id;
  const chatData = {
    fullname: '',
    phone_number: friendPhoneNumberB64,
    last_message: messageData.message,
    createdon,
    modifiedon: createdon,
    createdTimeOnDevice: messageData.createdTimeOnDevice,
    contact: {},
    uid: friendPhoneNumberB64
  };
  byId[message_id] = messageData;
  if (allIds.indexOf(message_id) === -1) {
    allIds.push(message_id);
    friendMessages[friendPhoneNumberB64] =
    friendMessages[friendPhoneNumberB64] || [];
    friendMessages[friendPhoneNumberB64].push(message_id);

    friendChatsBadge[friendPhoneNumberB64] = friendChatsBadge[friendPhoneNumberB64] || 0;
    friendChatsBadge[friendPhoneNumberB64] += 1;
    if (!is_group_msg) {
      friendChats[friendPhoneNumberB64] = friendChats[friendPhoneNumberB64] || {};
      friendChats[friendPhoneNumberB64] = chatData;
      if (friendChatsUidList.indexOf(friendPhoneNumberB64) === -1) {
        friendChatsUidList.push(friendPhoneNumberB64);
      }
    }

    dispatch({
      type: CONVERSATION_PUSH_LOCAL_NEW_MESSAGE
    });
    cb(messageData);
  } else {
    cb(null);
  }
};
export const sendGroupMessage = (opt) => {

};
export const sendMessage = (opt) => {
  // //console.log('[ConversationAction] sendMessage', opt);
  const message = opt.msg;
  const friendPhoneNumberB64 = opt.friendPhoneNumberB64;
  const myPhoneNumberB64 = opt.myPhoneNumberB64;
  const userDetail = opt.userDetail;
  const isGroup = opt.isGroup;

  if (message !== null
    && friendPhoneNumberB64 !== null && friendPhoneNumberB64 !== ''
    && myPhoneNumberB64 !== null && myPhoneNumberB64 !== ''
    && message !== '') {
      // //console.log('[ConversationAction] validasi mandatory ok', opt);
  } else {
    return null;
  }

  const createdon = getGMTunixtime();
  const localTimeStatusPending = new Date().getTime();
  return (dispatch, getState) => {
    const uid_message = `${createdon}-${myPhoneNumberB64}`;
    const receiver_phone_number = friendPhoneNumberB64;
    const sender_phone_number = myPhoneNumberB64;

    const datasend = {
      localTimeStatusPending,
      receiver_phone_number,
      sender_phone_number,
      message,
      uid: uid_message,
    };
    const messageData = {
      createdon,
      modifiedon: createdon,
      servertimestamp: firebase.database.ServerValue.TIMESTAMP,
      message,
      receiver_phone_number,
      sender_phone_number,
      status: 1,
      serverTimeStatusPending: firebase.database.ServerValue.TIMESTAMP,
      localTimeStatusPending,
      createdTimeOnDevice: localTimeStatusPending,
      uid: uid_message,
      type: 's'
    };
    // //console.log('[ConversationAction] sendMessage setup messageData=', messageData);

    const chatData = {
      fullname: '',
      phone_number: friendPhoneNumberB64,
      last_message: message,
      createdon,
      modifiedon: createdon,
      createdTimeOnDevice: messageData.createdTimeOnDevice,
      badge: 0,
      uid: friendPhoneNumberB64
    };
    // //console.log('[ConversationAction] sendMessage setup chatData=', chatData);
    const inputMessageObj = getState().ConversationReducer.inputMessageObj;
    const allIds = getState().ConversationReducer.allIds;
    const byId = getState().ConversationReducer.byId;
    const friendMessages = getState().ConversationReducer.friendMessages;
    const friendChats = getState().ConversationReducer.friendChats;
    const friendChatsUidList = getState().ConversationReducer.friendChatsUidList;
    let pushNewChat = false;
    if (!(chatData.uid in friendChats)) { pushNewChat = true; }

    inputMessageObj[opt.friendPhoneNumberB64] = '';

    opt.messagePendingCallback({
      messageData,
      byId,
      allIds
    });

    if (allIds.indexOf(messageData.uid) === -1) {
      allIds.push(messageData.uid);
      byId[messageData.uid] = messageData;
      friendMessages[friendPhoneNumberB64] =
      friendMessages[friendPhoneNumberB64] || [];
      friendMessages[friendPhoneNumberB64].push(messageData.uid);
      friendChats[friendPhoneNumberB64] = chatData;
      if (friendChatsUidList.indexOf(friendPhoneNumberB64) === -1) {
        friendChatsUidList.push(friendPhoneNumberB64);
      }

      if (pushNewChat) {
        // new chats
        dispatch({
          type: CONVERSATION_PUSH_NEW_CHAT,
          payload: chatData.uid
        });
      }

      // //console.log('[ConversationAction] sendMessage CONVERSATION_SEND_MESSAGE_INPROGRESS');
      dispatch({
        type: CONVERSATION_SEND_MESSAGE_INPROGRESS,
        payload: {
          messageData, chatData
        }
      });

      const notificationData = {
        message: {
          title: receiver_phone_number,
          content: `${message}`
        },
        createdon,
        modifiedon: createdon,
        friend_phone_number: myPhoneNumberB64,
        command: 'fetch_new_message',
        params: {
          sender_phone_number,
          messageData
        },
        show_on_localnotif: 'yes'
      };

      if (sender_phone_number !== null && receiver_phone_number !== null) {

        sendMessageApi(datasend)
        .then((resp) => {
              // //console.log('[ConversationAction] sendMessage status message sent');
              if (receiver_phone_number !== sender_phone_number) {
                // pushRemoteNotification(notificationData, receiver_phone_number, userDetail, () => {
                  // update status to sent
                  const modifiedon = getGMTunixtime();
                  // console.log('[ConversationAction] sendMessage update ready status to sent');
                  const messageDataUpdateSent = {
                    ...messageData,
                    modifiedon,
                    status: 2,
                    serverTimeStatusSent: firebase.database.ServerValue.TIMESTAMP,
                    localTimeStatusSent: new Date().getTime(),
                  };
                  // updateMessage(messageDataUpdateSent, () => {
                    byId[messageDataUpdateSent.uid] = messageDataUpdateSent;
                    opt.messageSentCallback({
                      messageData: messageDataUpdateSent,
                      byId,
                      allIds
                    });
                    // console.log('[ConversationAction] sendMessage update status to sent, success');
                    // console.log('[ConversationAction] sendMessage CONVERSATION_SEND_MESSAGE_SUCCESS');
                    dispatch({
                      type: CONVERSATION_SEND_MESSAGE_SUCCESS,
                    });

                  // });
                // });
              }
              // firebase.database().ref(`/user_chats/${sender_phone_number}/${receiver_phone_number}`)
              // .set({
              //   ...chatData
              // });
              // firebase.database().ref(`/user_chats/${receiver_phone_number}/${sender_phone_number}`)
              // .set({
              //   ...chatData,
              //   fullname: `${sender_phone_number}`,
              //   phone_number: sender_phone_number,
              //   uid: sender_phone_number
              // });
        })
        .catch(() => {
          const messageDataUpdateFailed = {
            ...messageData,
            modifiedon: Date.now(),
            status: 6,
            serverTimeStatusSent: firebase.database.ServerValue.TIMESTAMP,
            localTimeStatusSent: new Date().getTime(),
          };
          dispatch({
            type: CONVERSATION_SEND_MESSAGE_FAILED,
            payload: {
              messageid: messageData.uid,
              messageDataFailed: messageDataUpdateFailed
            }
          });
        });
      }
    } // if (allIds.indexOf(messageData.uid) === -1) {
  }; // return (dispatch, getState) => {
};
export const inputMessageModification = (opt) => (dispatch, getState) => {
  // console.log('[ConversationAction] inputMessageModification ', opt);
  const inputMessageObj = getState().ConversationReducer.inputMessageObj;
  inputMessageObj[opt.friendPhoneNumberB64] = opt.text;
  dispatch({ type: CONVERSATION_INPUTMESSAGE_MODIFICATION });
};

// fetch messages each conversation from firebase
const fetchAllPerConversation = (opt, cb = () => {}) => {
  const { my_msisdn, conversation_id } = opt;
  const limitToLast = opt.limitToLast;
  const ref = firebase.database().ref(`/messages/${my_msisdn}/${conversation_id}`);
  const query = ref.orderByKey().limitToLast(limitToLast).startAt('0');
  query.once('value', (snapshot2) => {
    cb(snapshot2);
  });
};
const fetchAllPerConversationGroup = (opt, cb = () => {}) => {
  console.log('[ConversationAction.fetchAllPerConversationGroup] opt=', opt);
  const userGroupMessageQuery = gql`query userGroupMessageQuery($user_id: String!, $group_id: String!) {
      user_group_message(user_id:$user_id, group_id:$group_id) {
      id
      message
      sender
      receiver
      serverTimeStatusRead
      localTimeStatusPending
      createdTimeOnDevice
      modifiedon
      status
      type
  } }`;
  const user_id = opt.my_msisdn;
  const group_id = opt.conversation_id;
  const args = {
      user_id,
      group_id
  };
  client.query({
      query: userGroupMessageQuery,
      variables: {
          user_id: args.user_id, group_id: args.group_id
      }
  })
  .then((resp) => {
    console.log('[ConversationAction.fetchAllPerConversationGroup] resp==>', resp);
      if (!(resp && 'user_group_message' in resp.data)) return cb('data not found', null);
        const data_user_group_message = resp.data.user_group_message || [];
        return cb(null, data_user_group_message);
    }).catch((e) => {
      cb(e, null);
    });
};

/* save list messages for each conversation */
const saveMessagePerConversationToLocal = (opt) => {
  const {
    dispatch, getState, listMessage, conversationData, my_msisdn, isGroup
  } = opt;
  const friendPhoneNumberB64 = conversationData.uid || conversationData.id;
  const conversation_id = conversationData.uid || conversationData.id;
  const list_new_message_id_per_conversation = [];
  const list_new_message_id = [];
  const conversation_data = conversationData || {};
  const conversation_row = {};
  const list_new_conversation_id = [];
  const new_message_data_byid = {};
  const total_badge_per_conversation = {};
  if (
    getState().ConversationReducer.friendChatsUidList.indexOf(conversation_id) === -1
  ) {
    list_new_conversation_id.push(conversation_id);
  }
  let totalBadge = 0;

  // begin foreach
  listMessage.forEach((messageData) => {
    const message_id = messageData.uid || messageData.id;
    new_message_data_byid[message_id] = { ...(getState().ConversationReducer.byId[message_id] || {}), ...messageData };
    if (getState().ConversationReducer.allIds.indexOf(message_id) === -1) {
      list_new_message_id.push(message_id);
    }
    if (
      (getState().ConversationReducer.friendMessages[friendPhoneNumberB64] || [])
      .indexOf(message_id) === -1
    ) {
      list_new_message_id_per_conversation.push(message_id);
    }
    // checek weather as reciver or as a sender of message
    const isReceiver =
      (my_msisdn !== (messageData.sender_phone_number || messageData.sender));
    // if as recever, then increment total badge
    if (isReceiver && messageData.status !== 4 && !isGroup) totalBadge += 1;
    if (isReceiver && messageData.status !== 4 && isGroup) totalBadge += 1;
  });
  // end foreach

  // set total badge per conversation
  total_badge_per_conversation[conversation_id] = totalBadge;
  if (!isGroup) conversation_row[conversation_id] = conversation_data;
  // submit dispatch
  dispatch({
    type: CONVERSATION_SAVE_CONVERSATION,
    payload: {
      conversation_id,
      list_new_message_id_per_conversation,
      conversation_data,
      list_new_conversation_id,
      new_message_data_byid,
      total_badge_per_conversation,
      list_new_message_id,
      conversation_row
    }
  });
};
/* fetch All message by conversation id */
export const fetchAllEachConversation = (opt) => (dispatch, getState) => {
    const { my_msisdn, conversation_id, isGroup } = opt;
    const page = opt.page || 1;
    const limitToLast = page * 70;
    const conversationData = getState().ConversationReducer.friendChats[conversation_id] || {};

    if (!isGroup && getState().ConversationReducer.fetchAllConversationInProgress) return null;
    dispatch({ type: CONVERSATION_FETCH_ALL_EACH_INPROGRESS });

    // const byId = getState().ConversationReducer.byId;
    // const allIds = getState().ConversationReducer.allIds;
    // const friendMessages = getState().ConversationReducer.friendMessages;
    if (isGroup) {
      return fetchAllPerConversationGroup({
        my_msisdn,
        conversation_id,
        limitToLast
      }, (e, o) => {
        // const allMessageObj = snapshot2.val() || {};
        // const listMessage = _.map(allMessageObj, (val, uid) => ({ ...val, uid })) || [];
        const listMessage = o || [];
        // console.log('[ConversationAction.fetchAll] total message = ', listMessage.length);
        console.log('[ConversationAction.fetchAllEachConversation] listMessage = ', listMessage);
        // saveMessageToLocal(listConversation);
        saveMessagePerConversationToLocal({
          dispatch, getState, listMessage, conversationData, my_msisdn, isGroup: true
        });
        return dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
        // if (i === listConversation.length - 1) {
        //   dispatch({ type: CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE, payload: { status: true, message: 'success' } });
        // }
      });
    }

    return fetchAllPerConversation({
      my_msisdn,
      conversation_id,
      limitToLast
    }, (snapshot2) => {
      if (!snapshot2.val()) return dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
      const listMessage = _.map(snapshot2.val(), (val, uid) => ({ ...val, uid })) || [];
      if (listMessage.length === 0) return dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
      saveMessagePerConversationToLocal({
        dispatch, getState, listMessage, conversationData, my_msisdn, isGroup: false
      });
      return dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
        // const friendPhoneNumberB64 = myFriendPhoneNumberB64;
        // friendMessages[conversation_id] =
        // friendMessages[conversation_id] || [];
        // const dispatchFetchAllConversationSuccess = (i) => {
        //   if (i === listMessage.length - 1) {
        //     dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
        //   }
        // };
        
        // if (listMessage && listMessage.length > 0) {
        //   listMessage.forEach((messageData, i) => {
        //     byId[messageData.uid] = messageData;
        //     if (allIds.indexOf(messageData.uid) === -1) {
        //       allIds.push(messageData.uid);
        //     }
        //     if (friendMessages[conversation_id].indexOf(messageData.uid) === -1) {
        //       friendMessages[conversation_id].push(messageData.uid);
        //     }
        //     dispatchFetchAllConversationSuccess(i);
        //   });
        // } else {
        //   dispatch({ type: CONVERSATION_FETCH_ALL_EACH_FINISH });
        // }
    });
};
/* fetch All Message */
export const fetchAll = (opt) => (dispatch, getState) => {
    console.log('[ConversationAction.fetchAll] opt = ', opt);
    const { my_msisdn } = opt;
    const page = opt.page || 1;
    const limitToLast = page * 70;

    // check whether still in process
    if (getState().ConversationReducer.fetchAllInProcess) return null;

    // set in progress/ in process true
    dispatch({ type: CONVERSATION_FETCH_ALL_INPROGRESS });

    return firebase.database().ref(`/user_chats/${my_msisdn}`)
    .once('value')
    .then((snapshot) => {
        if (!snapshot.val()) return dispatch({ type: CONVERSATION_FETCH_ALL_SUCCESS, payload: { status: false, message: 'conversation is not found' } });
        const listConversation = _.map(snapshot.val(), (val, uid) => ({ ...val, uid })) || [];
        if (listConversation.length === 0) {
          return dispatch({ type: CONVERSATION_FETCH_ALL_SUCCESS, payload: { status: false, message: 'conversation is empty' } });
        }
        // begin foreach list all conversation
        return listConversation.forEach((conversationData, i) => {
          fetchAllPerConversation({
            my_msisdn,
            conversation_id: conversationData.uid || conversationData.id,
            limitToLast
          }, (snapshot2) => {
            const allMessageObj = snapshot2.val() || {};
            const listMessage = _.map(allMessageObj, (val, uid) => ({ ...val, uid })) || [];
            console.log('[ConversationAction.fetchAll] total message = ', listMessage.length);
            // saveMessageToLocal(listConversation);
            saveMessagePerConversationToLocal({
              dispatch, getState, listMessage, conversationData, my_msisdn, isGroup: false
            });
            if (i === listConversation.length - 1) {
              dispatch({ type: CONVERSATION_FETCH_ALL_SUCCESS, payload: { status: true, message: 'success' } });
            }
          });
        });
        // end foreach list all conversation
    });
};
/* fetch all Message Group */
export const fetchAllMessageGroup = (opt) => (dispatch, getState) => {
  const { my_msisdn } = opt;
  const page = opt.page || 1;
  const limitToLast = page * 70;
  // check whether still in process
  if (getState().ConversationReducer.isFetchAllGroupMessageInProgress) return null;

  // set in progress/ in process true
  dispatch({ type: CONVERSATION_FETCH_ALL_GROUP_MESSAGE_INPROGRESS });
  return firebase.database().ref(`/user_groups/${my_msisdn}`)
  .once('value')
  .then((snapshot) => {
    if (!snapshot.val()) return dispatch({ type: CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE, payload: { status: false, message: 'conversation is not found' } });
    const listConversation = _.map(snapshot.val(), (val, uid) => ({ ...val, uid })) || [];
    if (listConversation.length === 0) {
      return dispatch({ type: CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE, payload: { status: false, message: 'conversation is empty' } });
    }

    const byId = getState().GroupReducer.byId;
    const allIds = getState().GroupReducer.allIds;
    const currentAllIds = [...allIds];
 
    // const allIdsOnServer = [];
    // begin foreach list all conversation
    listConversation.forEach((conversationData, i) => {
      const conversation_id = conversationData.uid || conversationData.id;
      currentAllIds.splice(currentAllIds.indexOf(conversation_id), 1);

      fetchAllPerConversationGroup({
        my_msisdn,
        conversation_id,
        limitToLast
      }, (e, o) => {
        // const allMessageObj = snapshot2.val() || {};
        // const listMessage = _.map(allMessageObj, (val, uid) => ({ ...val, uid })) || [];
        const listMessage = o || [];
        console.log('[ConversationAction.fetchAll] total message = ', listMessage.length);
        // saveMessageToLocal(listConversation);
        saveMessagePerConversationToLocal({
          dispatch, getState, listMessage, conversationData, my_msisdn, isGroup: true
        });
        if (i === listConversation.length - 1) {
          dispatch({ type: CONVERSATION_FETCH_ALL_GROUP_MESSAGE_DONE, payload: { status: true, message: 'success' } });
        }
      });
    });

    // delete groups that don't exist on server
    currentAllIds.forEach((v) => {
      allIds.splice(allIds.indexOf(v), 1);
      delete byId[v];
    });

    return true;
    // end foreach list all conversation
  });
};
export const updateStatusMessage = (uid, status) => (dispatch, getState) => {
  const modifiedon = getGMTunixtime();
  const msg_uid = uid;
  const msg_status = status;
  const byId = getState().ConversationReducer.byId;
  const messageData = byId[msg_uid] || {};
  if (messageData !== {}) {
    byId[msg_uid] = {
      ...byId[msg_uid],
      status: msg_status,
      modifiedon
    };
    dispatch({
      type: CONVERSATION_UPDATE_STATUS_MESSAGE,
    });
  }
};
export const updateStatusMessageRead = (messageUnRead) => (dispatch, getState) => {
  updateStatusRead(dispatch, getState, messageUnRead);
};
export const updateStatusMessageReadGroup = (messageUnRead) => (dispatch, getState) => {
  console.log('[ConversationAction.updateStatusMessageReadGroup] messageUnRead=', messageUnRead);
  const byId = getState().ConversationReducer.byId;
  const my_msisdn = getState().SessionReducer.sessionPhoneNumber;
  const friendChatsBadge = getState().ConversationReducer.friendChatsBadge;
  const modifiedon = getGMTunixtime();
  const serverTimeStatusRead = firebase.database.ServerValue.TIMESTAMP;
  const localTimeStatusRead = new Date().getTime();
  if (AppState.currentState !== 'active') {
    return null;
  }
  messageUnRead.forEach((msg) => {
    const messageStatusReadData = {
      ...msg,
      status: 4,
      modifiedon,
      serverTimeStatusRead,
      localTimeStatusRead,
    };
    if (msg !== null && msg !== undefined) {
      const v = msg.uid || msg.id;
      const statusMessage = byId[v].sender === my_msisdn ? 3 : 4; // set status message to 3 (delivered) for sender, and 4(read) for receiver
      messageStatusReadData.status = statusMessage;
      if (byId[v] !== null && byId[v] !== undefined) {
        if (byId[v].status < 4 && byId[v].sender !== my_msisdn) {
        // if (byId[v].status < 4) {
          updateMessageStatusToReadGroup({ messageStatusReadData, my_msisdn }, (dataUpdate) => {
            const updatedMessageData = {};
            updatedMessageData[v] = {
              ...messageStatusReadData,
              ...dataUpdate
             };
            dispatch({
              type: CONVERSATION_UPDATE_STATUS_READ_PER_MESSAGE_GROUP,
              payload: {
                updatedMessageData
              }
            });
          });
        }
      }
    }
  });
};
export const deleteMessage = (message_uid) => (dispatch, getState) => {
  dispatch({ type: CONVERSATION_DELETE_MESSAGE_INPROGRESS });
  try {
    const byId = getState().ConversationReducer.byId || {};
    const allIds = getState().ConversationReducer.allIds || [];
    const message_index = allIds.indexOf(message_uid);
    if (index > -1) {
        allIds.splice(index, 1);
    }
    delete byId[message_uid];
  } catch (e) { }
  dispatch({ type: CONVERSATION_DELETE_MESSAGE_SUCCESS });
};
export const resetGroupBadge = (groupId) => (dispatch) => {
  const total_badge_per_conversation = {};
  total_badge_per_conversation[groupId] = 0;
  dispatch({ type: CONVERSATION_RESET_GROUP_BADGE, payload: { total_badge_per_conversation } });
};
export const deleteFriendChat = ({ userid, myuserid }) => (dispatch) => {
  if (myuserid && userid) firebase.database().ref(`/user_chats/${myuserid}/${userid}`).set(null).then(() => {});
  dispatch({ type: CONVERSATION_DELETE_FRIENDCHAT, payload: { userid } });
};
