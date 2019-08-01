import { getConf } from '../conf';

export const callApi = (url, options) =>
  new Promise((resolve) => {
        console.log('request');
        const apiName = options.apiName;
        const path = options.path;
        const method = options.method || 'GET';
        const bodyObj = {
            ...options.body,
            trxid: Date.now()
        };
        const headers = {
            ...options.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(bodyObj);
        //   const conf = getConf('rayaku-celery-rabbitmq-contacts-py');
        const conf = getConf(apiName);
        const host = conf.host;
    const endpoint = `${host}${path}`;
    console.log('[request] endpoint====>', endpoint);
    fetch(endpoint, {
      method,
      headers,
      body
    }).then((response) => {
      console.log('[request] response====>', response);
      if (response) return response.json();
      return {};
    }).then((responseJson) => {
      console.log('[request] responseJson====>', responseJson);
        resolve({ status: true, e: null, o: responseJson || {} });
      })
      .catch((error) => {
        resolve({ status: false, e: error, o: {} });
        throw error;
      });
  });
