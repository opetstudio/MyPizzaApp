import { getConf } from '../conf';

const conf = getConf('rayaku-celery-rabbitmq-contacts-py');
const host = conf.host;

export const pushContactsApi = (opt) =>
  new Promise((resolve) => {
    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   })
    // })
    console.log('[rayaku-celery-rabbitmq-contacts-py] pushContactsApi ', opt);
    const phone_number = opt.phone_number;
    const contacts = opt.contacts;
    const endpoint = `${host}/push_user_contacts`;
    // //console.log('[rayaku-celery-rabbitmq-contacts-py] endpoint====>', endpoint);
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_phone_number: phone_number,
        trxid: Date.now(),
        data: contacts,
      })
    }).then((response) => {
      // //console.log('[rayaku-celery-rabbitmq-contacts-py] response=', response);
      if (response) return response.json();
      return {};
    }).then((responseJson) => {
        // //console.log('[rayaku-celery-rabbitmq-contacts-py] responseJson====>', responseJson);
        // resolve(responseJson);
        resolve({ status: true, e: null, o: responseJson });
        // if (responseJson.alldata) resolve({ status: true, e: null, o: responseJson.alldata || [] });
        // else {
        //   resolve({ status: false, e: 'data is empty', o: [] });
        // }
    //     // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     // this.setState({
    //     //   isLoading: false,
    //     //   dataSource: ds.cloneWithRows(responseJson.movies),
    //     // }, function() {
    //     //   // do something with new state
    //     // });
      })
      .catch((error) => {
        // //console.log('[rayaku-celery-rabbitmq-contacts-py] errooooorrrr====>', error);
        // console.error(error);
        resolve({ status: false, e: error, o: null });
        throw error;
      });

    // if (ipcRenderer !== null) {
    //     ipcRenderer.send('/gurustaffFetchAllApi', neDBDataPath);
    // }
    // ipcRenderer.on('/gurustaffFetchAllApiResponse', (event, e, o) => {
    //     // // //console.log(message); // logs out "Hello second window!"
    //     // // //console.log('[rayaku-celery-rabbitmq-contacts-py] e==>', e);
    //     // // //console.log('[rayaku-celery-rabbitmq-contacts-py] o==>', o);
    //     resolve({ e, o: JSON.parse(o) });
    // });
  });
export const pushNewContactsApi = (opt) =>
  new Promise((resolve) => {
    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   })
    // })
    // //console.log('[rayaku-celery-rabbitmq-contacts-py] pushNewContactsApi ', opt);
    const trxid = new Date().getTime();
    const phone_number = opt.phone_number;
    const contacts = opt.contacts;
    const endpoint = `${host}/push_user_new_contacts`;
    console.log('[rayaku-celery-rabbitmq-contacts-py] pushNewContactsApi endpoint====>', endpoint);
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_phone_number: phone_number,
        trxid,
        data: contacts,
      })
    }).then((response) => {
      // //console.log('[rayaku-celery-rabbitmq-contacts-py] response=', response);
      if (response) return response.json();
      return {};
    }).then((responseJson) => {
        // //console.log('[rayaku-celery-rabbitmq-contacts-py] responseJson====>', responseJson);
        // resolve(responseJson);
        resolve({ status: true, e: null, o: responseJson });
        // if (responseJson.alldata) resolve({ status: true, e: null, o: responseJson.alldata || [] });
        // else {
        //   resolve({ status: false, e: 'data is empty', o: [] });
        // }
    //     // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     // this.setState({
    //     //   isLoading: false,
    //     //   dataSource: ds.cloneWithRows(responseJson.movies),
    //     // }, function() {
    //     //   // do something with new state
    //     // });
      })
      .catch((error) => {
        // // //console.log('[rayaku-celery-rabbitmq-contacts-py] errooooorrrr====>', error);
        // console.error(error);
        resolve({ status: false, e: error, o: null });
        throw error;
      });

    // if (ipcRenderer !== null) {
    //     ipcRenderer.send('/gurustaffFetchAllApi', neDBDataPath);
    // }
    // ipcRenderer.on('/gurustaffFetchAllApiResponse', (event, e, o) => {
    //     // // //console.log(message); // logs out "Hello second window!"
    //     // // //console.log('[rayaku-celery-rabbitmq-contacts-py] e==>', e);
    //     // // //console.log('[rayaku-celery-rabbitmq-contacts-py] o==>', o);
    //     resolve({ e, o: JSON.parse(o) });
    // });
  });
