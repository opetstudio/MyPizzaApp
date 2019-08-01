import { getConf } from '../conf';
import { futch } from './util';

const conf = getConf('rayaku-file-js');
const host = conf.host;

export const upload_file = (opt, onProgress) =>
  new Promise((resolve, reject) => {
    console.log('[rayaku-file-js][upload_file] BEGIN opt=', opt);
    const PicturePath = opt.PicturePath;
    const new_name = opt.new_name;
    if (PicturePath && PicturePath !== '') {
      const data = new FormData();
      data.append('photo', {
        // uri: photo.uri,
        // type: photo.type,
        // name: photo.fileName,
        // uri: PicturePath,
        uri: opt.sourceURL,
        name: opt.filename,
        type: opt.mime || 'image/jpg'
      });
      if (opt.entity) {
        data.append('groupid', opt.groupid);
        data.append('userid', opt.userid);
      }

      data.append('newname', new_name);
      data.append('trxid', Date.now());
      data.append('msisdn', opt.msisdn);
      data.append('entity', opt.entity);
      const config = {
       method: 'post',
       headers: {
        //  'Accept': 'application/json',
         'Content-Type': 'multipart/form-data;'
         // 'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
       },
       body: data,
      };

      const endpoint = `${host}/v2/upload_file`;
      // //console.log('[rayaku-file-js][upload_file] endpoint=', endpoint);
      futch(endpoint, config, (e) => {
        const progress = e.loaded / e.total;
        console.log(progress);
        onProgress(progress);
      }).then((resp) => {
        //  console.log('[rayaku-file-js][upload_file] resp=', resp);
         console.log('[rayaku-file-js][upload_file] END opt=', opt);
         if (resp) {
           const responseApi = (resp || {}).response || {};
          console.log('[rayaku-file-js][upload_file] responseApi=', responseApi);
          if (responseApi && responseApi.status) {
            resolve({ status: true, e: null, o: (resp.json() || {}).response });
          } else {
            resolve({ status: true, e: null, o: {} });
          }
         } else {
          console.log('[rayaku-file-js][upload_file] END error resp=', resp);
           resolve({ status: true, e: null, o: {} });
         }
      }, (err) => {
         console.log('[rayaku-file-js][upload_file] err=', err);
         reject(err);
      });

      // fetch(endpoint, config) //change with API_URL
      //  .then((resp) => {
      //    ////console.log('[rayaku-file-js][upload_file] resp=', resp);
      //    ////console.log('[rayaku-file-js][upload_file] END opt=', opt);
      //    if (resp){
      //      resolve({ status: true, e: null, o: resp.json() });
      //    } else {
      //      resolve({ status: true, e: null, o: {} });
      //    }
      //  })
      //  .catch(err => {
      //    ////console.log('[rayaku-file-js][upload_file] err=', err);
      //    reject(err);
      //    throw err;
      //  });

    } else {
      resolve({ status: false, e: 'picture is empty', o: {} });
    }
  });
