import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput
  // StatusBarIOS
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';

import styles, { colors } from '../styles/index.style';
import { Actions } from 'react-native-router-flux';

const bg = require('../assets/images/confetti-bg.png');

class VerificationCodeScreen extends React.Component {
  /*global onEnter*/
  // static onEnter = () => {
    // ////console.log('onEnter');
    // Actions.refresh({
    //   title: 'Login!',
    //   rightTitle: 'rightTitle',
    //   onRight: () => {},
    // });
  // };
  constructor(props) {
    super(props);
    //  StatusBarIOS.setHidden(true);
    this._submitVerificationCode = this._submitVerificationCode.bind(this);
    ////console.log('');
  }
  componentWillMount() {
    this.setState({
      phoneNumber: this.props.phoneNumber
    });
  }
  componentDidMount() {
  }
  _submitVerificationCode() {
    Actions.verified();
  }


  render() {
    // const title = this.state.title || 'No Title';
    // const data = this.state.data || 'No Data';
    // ////console.log('Login RENDER');
    return (
      <View style={{ flex: 1, width: null }}>
        <StatusBar backgroundColor="#FD5B31" />
        <LinearGradient colors={['#FD5B31', '#E82F14']} style={styles.linearGradient}>
          <Image style={{ flex: 1, width: null }} source={bg}>
            <View
              style={{
                flex: 2,
                // textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red'
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center'
                }}
              >

                <Text style={{ fontSize: 18, color: '#fff' }}>Please check your message</Text>
                <Text style={{ fontSize: 18, color: '#fff' }}>for a verification code.</Text>

              </View>
              <View
                style={{
                  flex: 2,
                  // backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
              >
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#fff',
                      marginBottom: 20,
                    }}
                  >Verification Code</Text>
                  <TextInput
                    underlineColorAndroid='transparent'
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      textAlign: 'center',
                      width: 300,
                      borderBottomWidth: 1,
                      borderBottomColor: '#fff',
                      marginBottom: 10
                      // borderColor: 'gray',
                      // borderWidth: 1
                    }}
                    onChangeText={text => { console.log(text); }}
                    placeholder="_ _ _ _ _"
                    keyboardType='numeric'
                    placeholderTextColor='#a9acad'
                  />
                <Button
                  onPress={() => { this._submitVerificationCode(); }}
                  style={{
                    width: 300,
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 5,
                    borderColor: '#fff',
                    borderWidth: 1,
                    color: '#fff'
                  }}
                >
                  CONTINUE
                </Button>
              </View>

            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'blue'
              }}
            >
              <Text style={{ fontSize: 18, color: '#fff', marginBottom: 30, opacity: 0.8 }}>
                Doesn't receive any message?
              </Text>
              <Text style={{ fontSize: 18, color: '#fff', opacity: 0.8 }}>
                Please wait a minute or two.
              </Text>
              <Text style={{ fontSize: 18, color: '#fff', opacity: 0.8 }}>
                If there's still no message, please
              </Text>
              <Hyperlink
                onPress={url => alert('do resend sms')}
                linkStyle={{ color: '#fff', fontSize: 18, textDecorationLine: 'underline' }}
                linkText={url => url === 'https://taphere' ? 'Tap here to resend' : url}
              >
                <Text style={{ fontSize: 18, color: '#fff', opacity: 0.8 }}>
                  https://taphere
                </Text>
              </Hyperlink>
            </View>
        </Image>
        </LinearGradient>
      </View>
    );
  }

  // render() {
  //   // const title = this.props.title || 'No Title';
  //   // const data = this.props.data || 'No Data';
  //   ////console.log('Login RENDER');
  //   return (
  //     <View style={[styles.container, this.props.style]}>
  //       <Text>Login1 page</Text>
  //       <Button
  //         onPress={() => Actions.loginModal2()}
  //       >Login 2</Button>
  //     </View>
  //   );
  // }
}

export default VerificationCodeScreen;
