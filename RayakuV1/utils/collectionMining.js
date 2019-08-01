import _ from 'lodash';

export const extractListSSPerminggu = (listData) => {
  const result = [];
  listData.forEach((v) => {
      if (new Date(v.tanggal).getDay() + 1 === 7) {
        result.push(v);
      }
  });
  return result;
};
const merging_collection = (data_a, data_b) => {
  //const data_a = [{username:'root1', pass:'p'}];
  //const data_b = [{username:'root', pass:'ps'}, {username:'root1', pass:'pshhh'}];
  const new_data_a = _.map(data_a, (obj) => {
      const row_data_b = _.find(data_b, { uid: obj.uid }); //firebase
      // const row_data_b = _.find(data_b, { _id: obj._id }); //mongodb
      if (row_data_b) {
          data_b.splice(data_b.indexOf(row_data_b), 1);
          return _.assign(obj, row_data_b);
      }
      return obj;
  });
  return {
    merged_data: new_data_a,
    dif_data: data_b
  };
};
export const merge = (data_a, data_b) => {
  const { merged_data, dif_data } = merging_collection(data_a, data_b);
  //const data_a = [{username:'root1', pass:'p'}];
  //const data_b = [{username:'root', pass:'ps'}, {username:'root1', pass:'pshhh'}];
  const new_data_a = merged_data;
  dif_data.forEach((v) => {
      new_data_a.push(v);
  });
  return new_data_a;
};
export const merge_v2 = (data_a, data_b) => {
  const { merged_data, dif_data } = merging_collection(data_a, data_b);
  const new_data_a = merged_data;
  dif_data.forEach((v) => {
      new_data_a.push(v);
  });
  return {
    joinall_data: new_data_a,
    dif_data
  };
};
export const merge_local_contacts = (index_uid_obj, new_data_queue, data_a, data_b) => {
  let result_data_a = [];
  let result_index_uid_obj = {};

  for (let i = 0; i < data_b.length; i++) {
    if (data_b[i] !== null && typeof data_b[i] === 'object') {
      result_data_a.push(data_b[i]);
      const index_uid_key = `${data_b[i].uid}`;
      result_index_uid_obj[index_uid_key] = true;
      const check_index_exist = index_uid_obj[index_uid_key];
      if (!(check_index_exist !== null && check_index_exist)) {
        //new data index
        //cek udah ada di queue apa belum.
        if (new_data_queue.indexOf(data_b[i].uid) === -1) {
          new_data_queue.push(data_b[i].uid);
        }
      }
    }
  }
  if (result_data_a.length === 0) result_data_a = data_a;
  if (result_index_uid_obj === {}) result_index_uid_obj = index_uid_obj;

  result_data_a =
  _.orderBy(result_data_a, ['givenName', 'middleName', 'familyName'], ['asc', 'asc', 'asc']);

  return {
    listAllLocal: result_data_a,
    allLocalIndexUidObj: result_index_uid_obj,
    new_data_queue
  };
};

export const merge_data_conversation = (data_a, data_b) => {
}
export const merge_data_chats = (data_a, data_b, contacts) => {
  // const newData = _.maxBy(data_b, 'modifiedon');
  const newData = [];
  if (data_b) {
    for (const val in data_b) {
      if (val && data_b[val]) {
        const resultRow = data_b[val];
        //cek apakah resultRow adalah object
        if (resultRow !== null && typeof resultRow === 'object') {
          for (let i = 0; i < data_a.length; i++) {
            if (resultRow.phone_number === data_a[i].phone_number) {
              let badge = data_a[i].badge || 0;
              if (resultRow.modifiedon !== data_a[i].modifiedon) {
                //update data
                badge += 1;
              }
              resultRow.badge = badge;
            }
          }
          newData.push({
            ...resultRow,
            contact: _.find(contacts, { uid: resultRow.phone_number }),
            uid: val
          });
        }
      }
    }
  }
  if (newData.length > 0) {
    return newData;
  }
  return data_a;
};
export const getLatestModifiedon = (dataCurrent) => {
  ////console.log('getLatestModifiedon dataCurrent==>', dataCurrent);
  if (dataCurrent && dataCurrent.length > 0) {
    const dataCurrentOrdered = _.orderBy(dataCurrent, ['modifiedon'], ['desc']);
    return dataCurrentOrdered[0].modifiedon;
  }
  return 0;
};
export const mergeUpdate = (data_a, data_b) => {
  ////console.log('');
  return merge(data_a, data_b);
};
export const mergeDelete = (data_a, data_b) => {
  //const data_a = [{username:'root1', pass:'p'}];
  //const data_b = [{username:'root', pass:'ps'}, {username:'root1', pass:'pshhh'}];
  let new_data_a = _.map(data_a, (obj) => {
      const row_data_b = _.find(data_b, { username: obj.username });
      if (row_data_b) {
          data_b.splice(data_b.indexOf(row_data_b), 1);
          return _.assign(obj, row_data_b);
      }
      return null;
  });
  new_data_a = _.compact(new_data_a);
  data_b.forEach((v) => {
      new_data_a.push(v);
  });
  return new_data_a;
};
