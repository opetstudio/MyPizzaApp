import gql from 'graphql-tag';
import {
    GROUPPROFILE_CREATE_INPROGRESS,
    GROUPPROFILE_CREATE_SUCCESS,
    GROUPPROFILE_CREATE_ERROR,
    GROUP_CREATE_INPROGRESS,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_ERROR,
    GROUP_READ_INPROGRESS,
    GROUP_READ_SUCCESS,
    GROUP_READ_ERROR,
    GROUP_UPDATE_INPROGRESS,
    GROUP_UPDATE_SUCCESS,
    GROUP_UPDATE_ERROR,
    CONVERSATION_SEND_MESSAGE_INPROGRESS,
    CONVERSATION_SEND_MESSAGE_SUCCESS,
    CONVERSATION_SEND_MESSAGE_ERROR_NETWORK,
    CONVERSATION_SEND_MESSAGE_ERROR,
    MESSAGE_READ_INPROGRESS,
    MESSAGE_READ_SUCCESS,
    MESSAGE_READ_ERROR,
    SELECTED_GROUP_MEMBERS_KEY,
    GROUPPROFILE_RENAME_INPROGRESS,
    GROUP_RM_ONE_MEMBER_INPROGRESS,
    GROUP_RM_ONE_MEMBER_SUCCESS,
    GROUP_RM_ONE_MEMBER_ERROR,
    GROUP_RENAME_INPROGRESS,
    GROUP_RENAME_SUCCESS,
    GROUP_RENAME_ERROR,
    CONVERSATION_SEND_MESSAGE_FAILED
  } from '../constants';
// import { gql } from 'react-apollo';
// import { graphql } from 'react-apollo';

import client from '../apolloClient';
// here we create a query opearation

export const user_group = (args, cb = () => {}) => (dispatch, getState) => {
    const now_datetime = new Date().getTime();
    // here we create a query opearation
    const CurrentGroupForUser = gql`query CurrentGroupForUser($user_id: String!, $trxid: String!, $deviceid: String!) {
        user_group(user_id:$user_id, trxid:$trxid, deviceid:$deviceid) {
        id
        name
        picture
        status
        createdon
        lastMessage
        lastMessageTime
        modifiedon
        members
        owner
    } }`;
    dispatch({ type: GROUP_READ_INPROGRESS });
    console.log('[GroupsContainer] a===> begin ', args);
    client.query({ query: CurrentGroupForUser, variables: { user_id: args.user_id, trxid: now_datetime, deviceid: args.deviceid || '' } })
    .then((resp) => {
      console.log('[GroupsContainer] a===> a1', resp);
      if (resp && 'user_group' in resp.data) {
        const data_user_group = resp.data.user_group || [];
        const byId = getState().GroupReducer.byId;
        const allIds = getState().GroupReducer.allIds;
        const currentAllIds = [...allIds];
        data_user_group.forEach((v) => {
            if (v && v !== null) {
                byId[v.id] = v;
                if (allIds.indexOf(v.id) === -1) allIds.push(v.id);
                currentAllIds.splice(currentAllIds.indexOf(v.id), 1);
            }
        });
        // delete group id from redux that didn exist on server
        currentAllIds.forEach((v) => {
            delete byId[v];
            allIds.splice(allIds.indexOf(v), 1);
        });
      }
      dispatch({ type: GROUP_READ_SUCCESS });
      cb();
    }).catch((e) => {
        dispatch({ type: GROUP_READ_ERROR, payload: e });
    });
};
export const addMessage = (opt) => (dispatch, getState) => {
    const now_datetime = new Date().getTime();
    const MutateAddMessage = gql`mutation MutateAddMessage($id: String!, $message: String!, $sender: String!, $receiver: String!, $localTimeStatusPending: Float!, $trxid: String!, $deviceid: String!) {
        addMessage(id:$id, message: $message, sender: $sender, receiver: $receiver, localTimeStatusPending: $localTimeStatusPending, trxid: $trxid, deviceid: $deviceid){
        id
        }
    }`;

    const inputMessageObj = getState().ConversationReducer.inputMessageObj;
    const allIds = getState().ConversationReducer.allIds;
    const byId = getState().ConversationReducer.byId;
    const friendMessages = getState().ConversationReducer.friendMessages;
    const friendChats = getState().ConversationReducer.friendChats;
    const friendChatsUidList = getState().ConversationReducer.friendChatsUidList;

  const message = opt.msg;
  const friendPhoneNumberB64 = opt.friendPhoneNumberB64;
  const myPhoneNumberB64 = opt.myPhoneNumberB64;
  const userDetail = opt.userDetail; // group detail
  const isGroup = opt.isGroup;
  const deviceid = opt.deviceid || '';

  if (message !== null
    && friendPhoneNumberB64 !== null && friendPhoneNumberB64 !== ''
    && myPhoneNumberB64 !== null && myPhoneNumberB64 !== ''
    && message !== '') {
      // //console.log('[ConversationAction] validasi mandatory ok', opt);
  } else {
    return null;
  }

  const createdon = Date.now();
  const localTimeStatusPending = new Date().getTime();

  const id_message = `${createdon}-${myPhoneNumberB64}`;
  const receiver = friendPhoneNumberB64;
  const sender = myPhoneNumberB64;

  const messageData = {
    createdon,
    modifiedon: createdon,
    servertimestamp: 0,
    message,
    receiver,
    sender,
    status: 1,
    serverTimeStatusPending: 0,
    localTimeStatusPending,
    createdTimeOnDevice: localTimeStatusPending,
    id: id_message,
  };

  opt.messagePendingCallback({
    messageData,
    byId,
    allIds,
    isGroup
  });

  if (allIds.indexOf(messageData.id) === -1) {
        allIds.push(messageData.id);
        byId[messageData.id] = messageData;
        friendMessages[friendPhoneNumberB64] =
        friendMessages[friendPhoneNumberB64] || [];
        friendMessages[friendPhoneNumberB64].push(messageData.id);

        inputMessageObj[receiver] = '';

        dispatch({
            type: CONVERSATION_SEND_MESSAGE_INPROGRESS,
            payload: {
                messageData
            }
        });
        client.mutate({
            mutation: MutateAddMessage,
            variables: {
                id: id_message, message, sender, receiver, localTimeStatusPending, trxid: now_datetime, deviceid
            }
        })
        .then(() => {
            const modifiedon = Date.now();
            const messageDataUpdateSent = {
                ...messageData,
                modifiedon,
                status: 2,
                serverTimeStatusSent: 0,
                localTimeStatusSent: new Date().getTime(),
            };
            byId[messageDataUpdateSent.id] = messageDataUpdateSent;
            opt.messageSentCallback({
                messageData: messageDataUpdateSent,
                byId,
                allIds
            });
            dispatch({
                type: CONVERSATION_SEND_MESSAGE_SUCCESS
            });
        })
        .catch((e) => {
            console.log('[GraphqlAction] error when send message: ', e);
            console.dir(e);
            let { message: errorMessage } = e;
            errorMessage = errorMessage.toUpperCase();
            const isNetworkError = errorMessage.includes('NETWORK ERROR');
            if (isNetworkError) {
                dispatch({
                    type: CONVERSATION_SEND_MESSAGE_ERROR_NETWORK,
                    payload: {
                        id_message
                    }
                });
            } else {
                dispatch({
                    type: CONVERSATION_SEND_MESSAGE_ERROR
                });
            }

            const messageDataUpdateFailed = {
                ...messageData,
                modifiedon: Date.now(),
                status: 6
              };
              dispatch({
                type: CONVERSATION_SEND_MESSAGE_FAILED,
                payload: {
                  messageid: messageData.id,
                  messageDataFailed: messageDataUpdateFailed
                }
              });
        });
    }
    return true;
};
export const user_group_message = (opt) => (dispatch, getState) => {
    dispatch({ type: MESSAGE_READ_INPROGRESS });
    const now_datetime = Date.now();
    const userGroupMessageQuery = gql`query userGroupMessageQuery($user_id: String!, $group_id: String!, $trxid: String!, $deviceid: String!) {
        user_group_message(user_id:$user_id, group_id:$group_id, trxid:$trxid, deviceid:$deviceid) {
        id
        message
        sender
        receiver
        localTimeStatusPending
        modifiedon
        status
    } }`;
    const group_allIds = getState().GroupReducer.allIds;
    const friendMessages = getState().ConversationReducer.friendMessages;

    const trxid = now_datetime;
    const deviceid = opt.deviceid || '';

    group_allIds.forEach((group_id) => {
        const args = {
            user_id: opt.user_id,
            group_id
        };
        client.query({
            query: userGroupMessageQuery,
            variables: {
                user_id: args.user_id, group_id: args.group_id, trxid, deviceid
            }
        })
        .then((resp) => {
          if (resp && 'user_group_message' in resp.data) {
            const data_user_group_message = resp.data.user_group_message || [];
            const conversation_id = group_id;
            const byId = getState().MessageReducer.byId;
            const allIds = getState().MessageReducer.allIds;
            data_user_group_message.forEach((v) => {
                byId[v.id] = v;
                if (allIds.indexOf(v.id) === -1) allIds.push(v.id);
            });
          }
          dispatch({ type: MESSAGE_READ_SUCCESS });
        }).catch(() => {
            dispatch({ type: MESSAGE_READ_ERROR });
        });
    });
};
export const renameGroup = (opt, callback = () => {}) => (dispatch, getState) => {
    console.log('[GraphqlAction] renameGroup. opt=', opt);
    const now_datetime = Date.now();
    const trxid = now_datetime;
    const deviceid = opt.deviceid || '';
    const renameby = opt.myId || '';
    const groupid = opt.groupid || '';
    const data = opt.data || {};
    // data update
    const name = data.name;
    console.log('[GraphqlAction] updateGroup name=', name);

    dispatch({ type: GROUP_RENAME_INPROGRESS });
    const MutateRenameGroup = gql`mutation MutateRenameGroup($groupid: String!, $name: String!, $renameby: String!, $trxid: String!, $deviceid: String!) {
        renameGroup(groupid: $groupid, name:$name, renameby: $renameby, trxid: $trxid, deviceid: $deviceid){
        id
        picture
        members
        createdon
        lastMessage
        lastMessageTime
        topicname
        modifiedon
        name
        status
        owner
        }
    }`;
    client.mutate({
        mutation: MutateRenameGroup,
        variables: {
            renameby, groupid, name, trxid, deviceid
        }
    })
    .then((resp) => {
        console.log('[GraphqlAction] renameGroup success resp=', resp);
        // console.log('===>>>>resp=', resp);
        const newGroupData = resp.data.renameGroup;
        const currGroupData = getState().GroupReducer.byId[groupid] || {};
        // const currGroupDataObj = Object.create(currGroupData);
        // const currGroupData = Object.create(getState().GroupReducer.byId[groupid] || {});
        const commitGroupData = {
            ...currGroupData,
            ...newGroupData
        };
        const payload = {};
        payload[groupid] = commitGroupData;

        console.log('[GraphqlAction] renameGroup success newGroupData=', newGroupData);
        console.log('[GraphqlAction] renameGroup success currGroupData=', currGroupData);
        // console.log('[GraphqlAction] renameGroup success currGroupDataObj=', currGroupDataObj);
        // console.log('[GraphqlAction] renameGroup success payload=', payload);
        // const byId = getState().GroupReducer.byId;
        // const allIds = getState().GroupReducer.allIds;
        // data_user_group.forEach((v) => {
        //     byId[v.id] = v;
        //     if (allIds.indexOf(v.id) === -1) allIds.push(v.id);
        // });

        // dispatch({ type: GROUPPROFILE_CREATE_SUCCESS, payload: resp });
        // opt.submitSuccessCallback(resp.data.addGroup);

        dispatch({ type: GROUP_RENAME_SUCCESS, payload });
        callback(true, '');
    })
    .catch((e) => {
        dispatch({ type: GROUP_RENAME_ERROR, payload: e });
        callback(false, e.message, null);
    });
};
export const updateGroup = (opt) => (dispatch, getState) => {
    console.log('[GraphqlAction] updateGroup', opt);
    const now_datetime = Date.now();
    const trxid = now_datetime;
    const deviceid = opt.deviceid || '';
    const myId = opt.myId || '';
    const groupId = opt.groupId || '';
    const data = opt.data || {};
    // data update
    const name = data.name;
    const picture = data.picture;
    console.log('[GraphqlAction] updateGroup picture=', picture);
    console.log('[GraphqlAction] updateGroup name=', name);

    // dispatch({ type: GROUP_UPDATE_INPROGRESS });
    const MutateUpdateGroup = gql`mutation MutateUpdateGroup($name: String!, $picture: String!, $members: [String]!, $owner: String!, $trxid: String!, $deviceid: String!) {
        addGroup(name:$name, picture: $picture, members: $members, owner: $owner, trxid: $trxid, deviceid: $deviceid){
        id
        picture
        members
        createdon
        lastMessage
        lastMessageTime
        topicname
        modifiedon
        name
        status
        owner
        }
    }`;
    // client.mutate({
    //     mutation: MutateUpdateGroup,
    //     variables: {
    //         myId, groupId, name, picture
    //     }
    // })
    // .then(() => {

    // })
    // .catch((e) => {

    // });
};
export const removeOneMemberGroup = (opt, callback = () => {}) => (dispatch, getState) => {
    const now_datetime = Date.now();
    const trxid = now_datetime;
    const deviceid = opt.deviceid || '';
    const owner = opt.owner || '';
    const groupid = opt.groupid || '';
    const member = opt.member || '';
    
    dispatch({ type: GROUP_RM_ONE_MEMBER_INPROGRESS });
    const removeOneMemberGroupGQL = gql`mutation removeOneMemberGroup($owner: String!, $member: String!, $groupid: String!, $deviceid: String!, $trxid: String!) {
        removeOneMemberGroup(owner:$owner, member: $member, groupid: $groupid, deviceid: $deviceid, trxid: $trxid){
        id
        picture
        members
        createdon
        lastMessage
        lastMessageTime
        topicname
        modifiedon
        name
        status
        owner
        }
    }`;
    client.mutate({
        mutation: removeOneMemberGroupGQL,
        variables: {
            owner, groupid, member, trxid, deviceid
        }
    })
    .then((resp) => {
        const newGroupData = resp.data.removeOneMemberGroup;
        const currGroupData = getState().GroupReducer.byId[groupid] || {};
        const commitGroupData = {
            ...currGroupData,
            ...newGroupData
        };
        const payload = {};
        payload[groupid] = commitGroupData;
        dispatch({ type: GROUP_RM_ONE_MEMBER_SUCCESS, payload });
        callback(true, '');
    })
    .catch((e) => {
        dispatch({ type: GROUP_RM_ONE_MEMBER_ERROR, payload: e });
        callback(false, e.message, null);
    });
};
export const addMemberGroup = (opt, callback = () => {}) => (dispatch, getState) => {
    console.log('[GraphqlAction] addMemberGroup opt=', opt)
    const now_datetime = Date.now();
    const trxid = now_datetime;
    const deviceid = opt.data.deviceid || '';
    const owner = opt.data.owner || '';
    const groupid = opt.data.groupid || '';
    const members = opt.data.members || [];
    
    // addMemberGroup(
    //     owner: String!
    //     members: [String]!
    //     groupid: String!
    //     deviceid: String
    //     trxid: String
    //     ): Group
    
    dispatch({ type: GROUP_RM_ONE_MEMBER_INPROGRESS });
    const addMemberGroupGQL = gql`mutation addMemberGroup($owner: String!, $members: [String]!, $groupid: String!, $deviceid: String!, $trxid: String!) {
        addMemberGroup(owner:$owner, members: $members, groupid: $groupid, deviceid: $deviceid, trxid: $trxid){
        id
        picture
        members
        createdon
        lastMessage
        lastMessageTime
        topicname
        modifiedon
        name
        status
        owner
        }
    }`;
    client.mutate({
        mutation: addMemberGroupGQL,
        variables: {
            owner, groupid, members, trxid, deviceid
        }
    })
    .then((resp) => {
        const newGroupData = resp.data.addMemberGroup;
        const currGroupData = getState().GroupReducer.byId[groupid] || {};
        const commitGroupData = {
            ...currGroupData,
            ...newGroupData
        };
        const payload = {};
        payload[groupid] = commitGroupData;
        dispatch({ type: GROUP_RM_ONE_MEMBER_SUCCESS, payload });
        callback(true, '');
    })
    .catch((e) => {
        dispatch({ type: GROUP_RM_ONE_MEMBER_ERROR, payload: e });
        callback(false, e.message, null);
    });
};
export const addGroup = (opt) => (dispatch, getState) => {
    console.log('[GraphqlAction] addGroup ', opt);
    const now_datetime = Date.now();
    const trxid = now_datetime;
    const deviceid = opt.deviceid || '';
   const data = opt.data;
   if (getState().GroupprofileReducer.create_inprogress) {
       return null;
    }
   dispatch({ type: GROUPPROFILE_CREATE_INPROGRESS });
   const MutateAddGroup = gql`mutation MutateAddGroup($name: String!, $picture: String!, $members: [String]!, $owner: String!, $trxid: String!, $deviceid: String!) {
        addGroup(name:$name, picture: $picture, members: $members, owner: $owner, trxid: $trxid, deviceid: $deviceid){
        id
        picture
        members
        createdon
        lastMessage
        lastMessageTime
        topicname
        modifiedon
        name
        status
        owner
        }
    }`;
  const name = data.groupName || '';
  const picture = data.groupProfilePicture;
  const members = data.listChecked || [];
  const owner = data.owner;
  let error_msg = '';


    if (!(members.length > 0)) {
        error_msg = 'anggota group tidak boleh kosong';
        dispatch({ type: GROUPPROFILE_CREATE_ERROR, payload: error_msg });
        return opt.submitErrorCallback(error_msg);
    }
    if (!(name && name !== '')) {
        error_msg = 'nama group tidak boleh kosong';
        dispatch({ type: GROUPPROFILE_CREATE_ERROR, payload: error_msg });
        return opt.submitErrorCallback(error_msg);
    }

    // set owner as a member
    if (members.indexOf(owner) === -1) members.push(owner);

    client.mutate({
        mutation: MutateAddGroup,
        variables: {
            name, picture, members, owner, trxid, deviceid
        }
    })
    .then((resp) => {
        console.log('[GraphqlAction] addGroup resp=', resp);
        const data_user_group = [resp.data.addGroup];
        const byId = getState().GroupReducer.byId;
        const allIds = getState().GroupReducer.allIds;
        data_user_group.forEach((v) => {
            byId[v.id] = v;
            if (allIds.indexOf(v.id) === -1) allIds.push(v.id);
        });

        dispatch({ type: GROUPPROFILE_CREATE_SUCCESS, payload: resp });
        opt.submitSuccessCallback(resp.data.addGroup);
    })
    .catch((e) => {
        console.log('[GraphqlAction] addGroup e=', e);
        console.dir(e);
        console.log('message:', e.message);
        dispatch({ type: GROUPPROFILE_CREATE_ERROR, payload: e });
        opt.submitErrorCallback(e);
    });
};

export default {
    user_group,
    addMessage,
    user_group_message
};

