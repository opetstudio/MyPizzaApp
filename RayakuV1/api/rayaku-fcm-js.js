import { getConf } from '../conf';

const conf = getConf('rayaku-fcm-js');
const host = conf.host;

export const sendFCM = (opt) =>
  new Promise((resolve, reject) => {
    // //console.log('[rayaku-fcm-js][sendFCM] BEGIN opt=', opt);
    const endpoint = `${host}/sendFCM`;
    // //console.log('[rayaku-fcm-js][sendFCM] hit endpoint=', endpoint);
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...opt
      })
    })
    .then((resp) => {
      // //console.log('[rayaku-fcm-js][sendFCM] resp=', resp);
      // //console.log('[rayaku-fcm-js][sendFCM] END opt=', opt);
      if (resp) {
        resolve({ status: true, e: null, o: resp.json() });
      } else {
        resolve({ status: true, e: null, o: {} });
      }
    })
    .catch((err) => {
      // //console.log('[rayaku-fcm-js][sendFCM] err=', err);
      // //console.log('[rayaku-fcm-js][sendFCM] END opt=', opt);
      reject(err);
      throw err;
    });
  });
export const sendMessageApi = (opt) =>
  new Promise((resolve, reject) => {
    // //console.log('[rayaku-fcm-js][sendFCM] BEGIN opt=', opt);
    const endpoint = `${host}/sendMessage`;
    // //console.log('[rayaku-fcm-js][sendFCM] hit endpoint=', endpoint);
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...opt
      })
    })
    .then((resp) => {
      // //console.log('[rayaku-fcm-js][sendFCM] resp=', resp);
      // //console.log('[rayaku-fcm-js][sendFCM] END opt=', opt);
      if (resp) {
        resolve({ status: true, e: null, o: resp.json() });
      } else {
        resolve({ status: true, e: null, o: {} });
      }
    })
    .catch((err) => {
      // //console.log('[rayaku-fcm-js][sendFCM] err=', err);
      // //console.log('[rayaku-fcm-js][sendFCM] END opt=', opt);
      reject(err);
      throw err;
    });
  });
