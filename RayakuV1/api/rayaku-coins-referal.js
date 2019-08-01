import { callApi } from '../utils/request';

export const referalAPI = (opt) =>
  new Promise((resolve, reject) => {
    console.log('JADI');
    callApi(null, {
      apiName: 'rayaku-coins-referal',
      path: '/api/v1/invokeFunctionInsertReferral',
      method: 'POST',
      body: {
        ...opt,
      },
      headers: {
        'x-access-token': 'TOKEN',
        'TRX_ID': Date.now(),
        'EVENT_ID' : 'EVENT001',
      }
    })
    .then((resp) => { resolve(resp); 
        console.log('resp',resp);
    })
    .catch((e) => {reject(e);
        console.log('error',e);
    });
  });
