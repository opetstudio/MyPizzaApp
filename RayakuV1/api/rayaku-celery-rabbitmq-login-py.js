import { callApi } from '../utils/request';

export const loginApi = (opt) =>
  new Promise((resolve, reject) => {
    callApi(null, {
      apiName: 'rayaku-celery-rabbitmq-login-py',
      path: '/login',
      method: 'POST',
      body: {
        msisdn: '',
        ...opt
      },
      headers: {
        'x-token': 'asdfadsfdasf asdadsf asdf adsf'
      }
    })
    .then((resp) => { resolve(resp); })
    .catch((e) => reject(e));
  });
export const resubscribeFcmTokenApi = (opt) =>
  new Promise((resolve, reject) => {
    callApi(null, {
      apiName: 'rayaku-celery-rabbitmq-login-py',
      path: '/resubscribe_topic',
      method: 'POST',
      body: {
        msisdn: '',
        ...opt
      },
      headers: {
        'x-token': 'asdfadsfdasf asdadsf asdf adsf'
      }
    })
    .then((resp) => { resolve(resp); })
    .catch((e) => reject(e));
  });
