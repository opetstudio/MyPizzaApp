import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import {
  Actions,
  View
} from 'react-native-router-flux';

import {
  setPhoneNumberName
} from '../utils/util';
import Row from './Row';

class MyListItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const v = this.props.item;
    const phoneName = setPhoneNumberName(v.givenName, v.middleName, v.familyName);
    const contactType = 'MOBILE';

    return (
      <TouchableOpacity
        {...this.props}
        key={v.uid}
        onPress={() => {
          if (v.rayaku_status === 0) { alert('invite number'); }
          if (v.rayaku_status === 1) {
            Actions.conversations({
              title: phoneName,
              friendsPhoneNumber: v.phoneNumberNormalized,
            });
          }
        }}
      >
        <View>
          <Row
            key={v.uid}
            data={{
              name: phoneName,
              phone_number: v.phoneNumberNormalized,
              time: contactType,
              badge: null }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
export default MyListItem;
