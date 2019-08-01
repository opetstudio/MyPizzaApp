
import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

class CallScreen extends React.Component {
  componentWillMount() {
    ////console.log('routerflux component componentWillMount');
    // const notifOpt = {};
    // notifOpt.title = 'Notif title';
    // notifOpt.message = 'Notif message';
    // PushNotification.localNotification(notifOpt);
  }
  render() {
    return (
        <View
          style={{
            flex: 1,
            marginBottom: 15,
            marginLeft: 12,
            marginRight: 12,
            justifyContent: 'center'
          }}
        >
        {/*<View style={{ backgroundColor: '#FD5B31', elevation: 4, marginBottom: 6 }}>
          <View>
            <TextInput
              placeholder="Search"
              underlineColorAndroid='transparent'
              style={{
                backgroundColor: 'white',
                fontSize: 18,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            />
          </View>
        </View>
        <View>
          <Text>Call Screen</Text>
        </View>*/}
          <Text style={{ fontWeight: '100', textAlign: 'center' }}>
          Rayaku Team is working passionately to make sure you can use this feature
          as soon as possible :)
          </Text>
        </View>
    );
  }
}

export default CallScreen;
