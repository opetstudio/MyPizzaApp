import firebase from 'firebase';

import {
  CHATS_FETCH_ALL_SUCCESS,
  CHATS_FETCH_ALL_INPROGRESS,
  CHATS_SET_RELOAD
} from '../constants';

import {
  merge_data_chats
} from '../utils/collectionMining';

export const setReload = () => dispatch => {
  dispatch({
    type: CHATS_SET_RELOAD
  });
};

export const fetchAll = (opt) => {
  ////console.log('[ChatsAction] fetchAll', opt);
  // const phoneNumberB64 = opt.phoneNumberB64;
  //   return (dispatch, getState) => {
  //     dispatch({ type: CHATS_FETCH_ALL_INPROGRESS });
  //     if (phoneNumberB64 !== '') {
  //       firebase.database().ref(`/user_chats/${phoneNumberB64}`).off();
  //       firebase.database().ref(`/user_chats/${phoneNumberB64}`)
  //       .once('value', snapshot => {
  //         ////console.log('[ChatsAction] firebase onValue ', snapshot.val());
  //         const listAll = merge_data_chats(
  //           getState().ChatsReducer.listAll,
  //           snapshot.val(),
  //           getState().ContactsReducer.listAllLocal
  //         );
  //         dispatch({ type: CHATS_FETCH_ALL_SUCCESS, payload: listAll });
  //       });
  //     }
  //   };
};
