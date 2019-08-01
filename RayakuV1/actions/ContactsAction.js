import firebase from 'firebase';
import _ from 'lodash';
import reactContacs from 'react-native-contacts';
// const reactContacs = require('react-native-contacts')

import {
  CONTACTS_FETCH_ALL_FAILED,
  CONTACTS_FETCH_ALL_INPROGRESS,
  CONTACTS_FETCH_ALL_SUCCESS,

  CONTACTS_FETCH_ONCE_FAILED,
  CONTACTS_FETCH_ONCE_INPROGRESS,
  CONTACTS_FETCH_ONCE_SUCCESS,

  CONTACTS_SET_RELOAD,
  CONTACTS_PUSH_INPROGRESS,
  CONTACTS_PUSH_FINISH,
  CONTACTS_UPDATE_STATUS_RAYAKU
} from '../constants';
import {
  pushContactsApi,
  pushNewContactsApi
} from '../api/rayaku-celery-rabbitmq-contacts-py';

import {
  setContactsAsyncStorage,
} from '../api/asyncstorageApi';

import {
  normalizePhoneNumber,
  setPhoneNumberName,
  getGMTunixtime
} from '../utils/util';

export const setReload = () => dispatch => {
  dispatch({
    type: CONTACTS_SET_RELOAD
  });
};

const fetchAllSuccess = (dispatch, opt) => {
  dispatch({
    type: CONTACTS_FETCH_ALL_SUCCESS,
    payload: opt.listAll
  });
};

const fetchOnce = (dispatch, getState, phone_number, cb = () => {}) => {
  // //console.log('[ContactsAction]  fetchOnce', phone_number);
  dispatch({ type: CONTACTS_FETCH_ONCE_INPROGRESS });
  const byId = getState().ContactsReducer.byId;
  const allIds = getState().ContactsReducer.allIds;
  const createdon = getGMTunixtime();
  firebase.database().ref(`/contacts/${phone_number}`).off();
  firebase.database().ref(`/contacts/${phone_number}`)
  .once('value', (snapshot) => {
    // ////console.log('[ContactsAction]  firebase onValue ', snapshot.val());
    if (snapshot.val() && snapshot.val() !== null) {
      // const currentListAllLocal = getState().ContactsReducer.listAllLocal;
      const myContactsRayakuMemberOnServer =
      _.filter(_.map(snapshot.val(), (val, uid) => ({ ...val, uid })), { rayaku_status: 1 });
      if (myContactsRayakuMemberOnServer.length > 0) {
          myContactsRayakuMemberOnServer.forEach((v) => {
            if (v && v !== {} && typeof v === 'object' && 'uid' in v) {
              // ////console.log('[ContactsAction] myContactsRayakuMemberOnServer', v);
              // ////console.log('[ContactsAction] myContactsRayakuMemberOnServer', byId[v.uid]);
              if (byId[v.uid]) {
                byId[v.uid].rayaku_status = 1;
                byId[v.uid].modifiedon = createdon;
                if (allIds.indexOf(v.uid) === -1) { allIds.push(v.uid); }
              }
            }
          });
          // dispatch({
          //   type: CONTACTS_UPDATE_STATUS_RAYAKU,
          //   payload: {
          //     byId
          //   }
          // });
      }
      if (cb && typeof cb === 'function') { cb(); }
    } else if (cb && typeof cb === 'function') { cb(); }
    dispatch({ type: CONTACTS_FETCH_ONCE_SUCCESS });
  }, (error) => {
    console.log('[ContactsAction]fetchOnce error=', error);
    dispatch({ type: CONTACTS_FETCH_ONCE_FAILED });
  });
};
const fetchByUid = (phoneNumberNormalized, cb) => {
  firebase.database().ref(`/users/${phoneNumberNormalized}`)
  .once('value', (snapshot) => {
    cb(snapshot);
  });
};
const updateStatusRayaku = (dispatch, getState, phoneNumberNormalized, rayaku_status) => {
  const byId = getState().ContactsReducer.byId;
  const createdon = getGMTunixtime();
  byId[phoneNumberNormalized].rayaku_status = rayaku_status;
  byId[phoneNumberNormalized].modifiedon = createdon;
  dispatch({
    type: CONTACTS_UPDATE_STATUS_RAYAKU,
    payload: {
      byId
    }
  });
};
export const fetchOnceByUid = (phoneNumberNormalized, cb) => (dispatch, getState) => {
  fetchByUid(phoneNumberNormalized, (snapshot) => {
    if (snapshot.val()) {
      cb(snapshot.val());
      updateStatusRayaku(dispatch, getState, phoneNumberNormalized, 1);
    } else {
      cb(false);
    }
  });
};
const batchChackingRayakuStatus = (dispatch, getState, listAllLocal) => {
  for (let i = 0; i < listAllLocal.length; i++) {
    if (getState().ContactsReducer.reLoad) {
      break;
    }
    const v = listAllLocal[i];
    if (v.rayaku_status === 0) {
      fetchByUid(v.phoneNumberNormalized, (snapshot) => {
        if (snapshot.val()) {
          updateStatusRayaku(dispatch, getState, v.phoneNumberNormalized, 1);
        } else {
          updateStatusRayaku(dispatch, getState, v.phoneNumberNormalized, 0);
        }
      });
    }
  }
};

const setupDetailContact = (currentById, v, v2) => {
  const createdon = new Date().getTime();
  let contactData = {};
  if (
    v2 !== null && v2 !== undefined && v2 !== {} && typeof v2 === 'object'
    && 'number' in v2
    && v2.number
  ) {
    // ////console.log('[ContactsAction]  saveToLocal setupDetailContact ', v2);

    const n = v2.number || '';
    if (n !== '') {
      const phoneNumberNormalized = normalizePhoneNumber(n) || '';
      const contact_name = setPhoneNumberName(v.givenName, v.middleName, v.familyName) || '';
      if (phoneNumberNormalized && phoneNumberNormalized !== '') {
        const uid = phoneNumberNormalized;

        contactData = {
          givenName: v.givenName,
          middleName: v.middleName,
          familyName: v.familyName,
          recordID: v.recordID,
          phoneNumber: n,
          createdon,
          modifiedon: createdon,
          rayaku_status: (currentById[uid] || {}).rayaku_status || 0,
          name: contact_name,
          phoneNumberNormalized,
          uid
          // uid2: `${v.givenName}-${v.middleName}-${v.familyName}-${n}`,
          // uid: v.recordID
        };
      }
    }
  }
  return contactData;
};
const setupListContacts = (getState, v, listAllLocal) => {
  const byId = getState().ContactsReducer.byId;
  const allIds = getState().ContactsReducer.allIds;
  try {
    if (v && v !== {} && typeof v === 'object'
      && 'phoneNumbers' in v
      && v.phoneNumbers
      && v.phoneNumbers.constructor === Array
      ) {
        v.phoneNumbers.forEach((v2) => {
          const contactData = setupDetailContact(byId, v, v2 || {}) || {};
          listAllLocal.push(contactData);
          if (contactData !== {}) {
            byId[contactData.uid] = contactData;
            if (allIds.indexOf(contactData.uid) === -1) { allIds.push(contactData.uid); }
          }
        });
    }
  } catch (e) {
    //
  }
  return listAllLocal;
};
const saveToLocal = (dispatch, contacts, phone_number, getState, cb) => {
  ////console.log('[ContactsAction]  saveToLocal ', contacts);
  const listAllLocal = [];
  contacts.forEach((v) => {
    setupListContacts(getState, v || {}, listAllLocal);
  });

  if (listAllLocal.length > 0) {
    //push ke server
    pushNewContactsApi({
      phone_number,
      contacts: listAllLocal
    }).then(() => {
      fetchOnce(dispatch, getState, phone_number, cb);
    }).catch((e) => {});

    setContactsAsyncStorage(getState().ContactsReducer)
    .then(() => { })
    .catch((e) => {});
    ////console.log('[ContactsAction]  ready to saveToLocal');
    dispatch({ type: CONTACTS_FETCH_ALL_SUCCESS });
  } else {
    dispatch({ type: CONTACTS_FETCH_ALL_FAILED, payload: 'listAllLocal = 0' });
  }
};
export const pushContacts = (opt) => {
  ////console.log('[ContactsAction] pushContacts ', opt);

  const phone_number = opt.phone_number; //my phone number
  const new_data_queue = opt.new_data_queue;
  const listAllLocal = opt.listAllLocal;

  const listAllNewLocalContact = [];
  return dispatch => {
    dispatch({ type: CONTACTS_PUSH_INPROGRESS, payload: 'denied' });
    if (!(new_data_queue !== null && new_data_queue.length > 0)) {
      dispatch({
        type: CONTACTS_PUSH_FINISH, payload: { status: false, msg: 'new_data_queue empty' } });
      return null;
    }
    for (let i = 0; i < new_data_queue.length; i++) {
      if (new_data_queue[i] !== null && new_data_queue[i] !== '') {
        const new_item_local_contact = _.find(listAllLocal, { uid: new_data_queue[i] });
        if (new_item_local_contact !== null
          && new_item_local_contact !== 'undefined'
          && typeof new_item_local_contact === 'object'
        ) {
          listAllNewLocalContact.push(new_item_local_contact);
        }
      }
    }

    if (listAllNewLocalContact.length > 0) {
      //push ke server
      pushNewContactsApi({
        phone_number,
        contacts: listAllNewLocalContact
      }).then((response) => {
        ////console.log('[ContactsAction] pushNewContactsApi ', response);

        dispatch({
          type: CONTACTS_PUSH_FINISH, payload: { status: false, msg: 'new_data_queue empty' } });
      }).catch((e) => {});
    }
  };
};
export const reloadLocalContacts = (opt) => {
  console.log('[ContactsAction] reloadLocalContacts ', reactContacs);
  const deviceId = opt.deviceId || '';
  const actionFlow = opt.actionFlow || [];
  actionFlow.push('ContactsAction.reloadLocalContacts');
  return (dispatch, getState) => {
    dispatch({ type: CONTACTS_FETCH_ALL_INPROGRESS, payload: { actionFlow } });
    if (deviceId !== null && deviceId !== undefined && deviceId !== '') {
      reactContacs.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
          dispatch({ type: CONTACTS_FETCH_ALL_FAILED, payload: 'denied' });
        } else if (contacts !== null && contacts !== undefined) {
          saveToLocal(dispatch, contacts || [], opt.deviceId, getState, opt.cb);
        } else {
          dispatch({ type: CONTACTS_FETCH_ALL_FAILED, payload: 'contacts is empty' });
        }
      });
    } else {
      dispatch({ type: CONTACTS_FETCH_ALL_FAILED, payload: 'deviceId is empty' });
    }
  };
};

export const fetchOnceContact = (phone_number, cb) => (dispatch, getState) => {
    ////console.log('[ContactsAction] fetchOnceContact ', phone_number);
    ////console.log('[ContactsAction] fetchOnceContact cb', cb);
    fetchOnce(dispatch, getState, phone_number, cb);
};
export const getContactDetail = (opt) => {
  const currentListAllLocal = opt.currentListAllLocal;
  const phone_number = opt.phone_number;
  return 'tesss';
  // return _.find(currentListAllLocal, { phoneNumberNormalized: phone_number });
};
