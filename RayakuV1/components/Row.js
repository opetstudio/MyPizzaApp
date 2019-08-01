import React from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

import RowPicture from './RowPicture';

class Row extends React.Component {
  render() {
    const badge = this.props.data.badge !== 0 ? this.props.data.badge : null;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          marginHorizontal: 7
        }}
      >
        <RowPicture profile_picture={this.props.data.profile_picture || ''} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            borderBottomWidth: 0.5,
            borderBottomColor: '#97979740',
            height: 70,
            marginLeft: 8,
            paddingLeft: 4,
            paddingTop: 10,
            paddingRight: 4,
            paddingBottom: 2
          }}
        >
          <Text
          adjustsFontSizeToFit
          minimumFontScale={0.9}
          style={{
            color: 'black',
            fontSize: 16
          }}
          >{this.props.data.name || '-'}</Text>
          <Text
          numberOfLines={2}
          style={{
            fontSize: 12,
            color: '#1F1F1F50',
            paddingTop: (Platform.OS === 'ios') ? 9 : 6.5
           }}
          >{this.props.data.phone_number}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            height: 70,
            width: 60,
            borderBottomWidth: 0.5,
            borderBottomColor: '#97979740',
            paddingTop: 10,
            alignItems: 'flex-end',
            marginRight: 6
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: 12,
              color: '#AAAAA9',
              fontWeight: '500'
             }}
          >{this.props.data.time}</Text>
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
          <Text
          style={
            badge ?
              {
                fontSize: 12,
                color: '#FFFFFF',
                paddingTop: (Platform.OS === 'ios') ? 3 : 1,
                paddingLeft: (Platform.OS === 'ios') ? 1 : 0,
                textAlign: 'center',
                borderRadius: 10,
                backgroundColor: '#FD5B31',
                width: 20,
                height: 20,
                overflow: 'hidden'
              } :
            null
           }
          >{badge}</Text>
          </View>
        </View>
        </View>
    );
  }
}

export default Row;
