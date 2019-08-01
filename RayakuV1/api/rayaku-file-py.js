import { getConf } from '../conf';
import { futch, fetchProgress } from './util';

const conf = getConf('rayaku-file-py');
const host = conf.host;

export const upload_file = (opt, onProgress) =>
  new Promise((resolve, reject) => {
    console.log('[rayaku-file-py][upload_file] BEGIN optssss=', opt);
    const PicturePath = opt.PicturePath;
    const new_name = opt.new_name;
    if (PicturePath && PicturePath !== '') {
      const data = new FormData();
      data.append('file', {
        // uri: photo.uri,
        // type: photo.type,
        // name: photo.fileName,
        // uri: PicturePath,
        uri: opt.sourceURL,
        name: opt.filename,
        filename: opt.filename,
        type: opt.mime || 'image/jpg'
      });
      if (opt.entity) {
        data.append('id', opt.groupid || opt.userid);
      }

      data.append('newname', new_name);
      data.append('trxid', Date.now());
      data.append('msisdn', opt.msisdn);
      data.append('entity', opt.entity);
      const config = {
       method: 'post',
       headers: {
        'X-Progress-ID': new_name
        //  'Accept': 'application/json',
        //  'Content-Type': 'multipart/form-data;'
         // 'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
       },
       body: data,
       progressid: new_name,
       onProgress
      };

      const endpoint = `${host}/api/v1/thumbnail?X-Progress-ID=${new_name}`;

      console.log('[rayaku-file-py][upload_file] data=', data);
      console.log('[rayaku-file-py][upload_file] endpointtt=', endpoint);
      
      futch(endpoint, config, (e) => {
        const progress = e.loaded / e.total;
        // console.log(progress);
        onProgress(progress);
        if (progress === 1) {
          // fetchProgress(endpointProgress, 'tes123');
        }
      }).then((resp) => {
        //  console.log('[rayaku-file-py][upload_file] resp=', resp);
         console.log('[rayaku-file-py][upload_file] END opt=', opt);
         if (resp) {
           const responseApi = JSON.parse((resp || {}).response || {});
          console.log('[rayaku-file-py][upload_file] responseApi=', responseApi);
          if (responseApi && responseApi.STATUS) {
            resolve({ status: true, e: null, o: {} });
          } else {
            resolve({ status: false, e: responseApi.MESSAGE, o: {} });
          }
         } else {
          console.log('[rayaku-file-py][upload_file] END error resp=', resp);
           resolve({ status: false, e: 'upload failed. Please try again.', o: {} });
         }
      }, (err) => {
         console.log('[rayaku-file-py][upload_file] err=', err);
         reject(err);
      });

      // fetch(endpoint, config) //change with API_URL
      //  .then((resp) => {
      //    ////console.log('[rayaku-file-py][upload_file] resp=', resp);
      //    ////console.log('[rayaku-file-py][upload_file] END opt=', opt);
      //    if (resp){
      //      resolve({ status: true, e: null, o: resp.json() });
      //    } else {
      //      resolve({ status: true, e: null, o: {} });
      //    }
      //  })
      //  .catch(err => {
      //    ////console.log('[rayaku-file-py][upload_file] err=', err);
      //    reject(err);
      //    throw err;
      //  });
    } else {
      console.log('[rayaku-file-py][upload_file] END picture is empty');
      resolve({ status: false, e: 'picture is empty', o: {} });
    }
  });
