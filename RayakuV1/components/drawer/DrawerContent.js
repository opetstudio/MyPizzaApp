/**
 * @flow
 */

import React from 'react';
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';

const icon_avatar = require('../../assets/images/Rayaku-text-logo-white.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30302D'
  },
  button: {
    paddingTop: 20,
    backgroundColor: 'transparent'
  }
});
////console.log('[DrawerContent] invoked');

class DrawerContent extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string,
  //   sceneStyle: ViewPropTypes.style,
  //   title: PropTypes.string,
  // }
  //
  // static contextTypes = {
  //   drawer: PropTypes.object,
  // }

  state = {
    version: '0.0.0.0'
  }

  constructor(props) {
    ////console.log('[DrawerContent] constructor');
    super(props);
  }

  componentWillMount() {
    ////console.log('[DrawerContent] componentWillMount');
  }
  componentDidMount() {
    ////console.log('[DrawerContent] componentDidMount');
  }
  render() {
    ////console.log('[DrawerContent] render');

    return (
      <View style={styles.container}>

          <View
            style={{ flex: 1,
            backgroundColor: '#30302D',
            justifyContent: 'flex-end',
            paddingLeft: 20
          }}
          >

            <Image
            source={icon_avatar}
            style={{
              height: 150,
              width: 240,
            }}
            resizeMode='contain'
            //backgroundColor='red'
            />
              <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                //addingLeft: 20,
                paddingBottom: 10,
              }}
              >
              </View>
          </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
            }}
        >
          <TouchableOpacity
          activeOpacity={10} onPress={() => { Actions.messages(); }}
          >
            <View style={styles.button} >
            <Text style={{ fontWeight: '100', color: '#FFF', fontSize: 16 }}>Messages</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button} onPress={() => { Actions.calls(); }}
          >
            <View style={{
             
            }}>
            <Text style={{ fontWeight: '100', color: '#FFF', fontSize: 16 }}>Calls</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button} onPress={() => { Actions.settings(); }}
          >
            <View style={{
              flexWrap: "wrap"
            }}>
              <Text style={{ fontWeight: '100', color: '#FFF', fontSize: 16 }}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 20,
          paddingTop: 10,
        //backgroundColor: 'blue'
      }}
        >
        <TouchableOpacity
        style={styles.button} onPress={() => { alert('This is Nearby toggle'); }}
        >
          <Text style={{ fontWeight: '100', color: '#FFF' }}>Nearby Option</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button} onPress={() => { alert('This is Help toggle'); }}
        >
          <Text style={{ fontWeight: '100', color: '#FFF' }}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button} onPress={() => { alert('This is About toggle'); }}
        >
          <Text style={{ fontWeight: '100', color: '#FFF' }}>About App</Text>
        </TouchableOpacity>{/*}<Button onPress={Actions.closeDrawer}>Back</Button>*/}
        </View>
      </View>
    );
  }
}

export default DrawerContent;
