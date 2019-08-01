import phonenumbers from 'libphonenumber-js';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';


export const checkValue = (v) => v
  && typeof v !== 'undefined' && v !== undefined && v !== 'undefined' && v !== null && v !== '';

export const setPhoneNumberName = (givenName, mid, familyName) => {
  try {
    let theName = checkValue(givenName) ? `${givenName}` : '';
    if (checkValue(mid)) {
        theName = `${theName !== '' ? `${theName} ` : ''}${mid}`;
    }
    if (checkValue(familyName)) {
      theName = `${theName !== '' ? `${theName} ` : ''}${familyName}`;
    }
    return theName;
  } catch (e) {
    return '';
  }
};
export const normalizePhoneNumber = (xPhoneNumber) => {
  try {
    let contact_phone_number = '';
    let xxPhoneNumber = '';
    if (xPhoneNumber.startsWith('+')) {
      xxPhoneNumber = xPhoneNumber.substring('1');
      contact_phone_number = xxPhoneNumber.replace(/[^A-Za-z0-9]+/g, '');
      contact_phone_number = `+${contact_phone_number}`;
    } else {
      contact_phone_number = xPhoneNumber.replace(/[^A-Za-z0-9]+/g, '');
    }


    let country_code = '62';
    let phone_number = '';
    if (contact_phone_number.startsWith('+')) {
      // ////console.log('contact startsWith +');
      try {
        const x = phonenumbers.parse(contact_phone_number);
        const region_code = x.country; //ID
        country_code = phonenumbers.getPhoneCode(region_code); //62
        phone_number = x.phone;
        return `${country_code}${phone_number}`;
      } catch (e) {
        return this.phone_numer_normalize(contact_phone_number.substring(1));
      }
    } else if (contact_phone_number.startsWith('0')) {
      // ////console.log('contact startsWith 0');
      country_code = '62';
      phone_number = contact_phone_number.substring('1');
      return `${country_code}${phone_number}`;
    } else if (contact_phone_number.startsWith('62')) {
      // ////console.log('contact startsWith 0');
      return contact_phone_number;
    } else {
      country_code = '62';
      phone_number = contact_phone_number;
      return `${country_code}${phone_number}`;
    }
  } catch (e) {
    return '';
  }
};
export const getGMTunixtime = () => {
  const x = new Date();
  // return x.getTime() + (x.getTimezoneOffset() * 60 * 1000);
  return x.getTime();
};
export const getVersion = (cb = () => {}) => {
  try {
    codePush.getUpdateMetadata().then((metadata) => {
      // this.setState({
      //   label: metadata.label, version: metadata.appVersion, description: metadata.description
      // });
      const v = `${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}` +
        `.${((metadata || {}).label || '').substring(1) || 'x'}`;
        cb(v);
    }).catch(e => { throw e; });
  } catch (e) {
    cb('-.-.-.-');
    ////console.log('[RayakuApp] componentWillMount e==>', e);
  }
}
