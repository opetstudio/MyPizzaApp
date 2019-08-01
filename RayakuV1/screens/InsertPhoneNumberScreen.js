import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  WebView
  // StatusBarIOS
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import styles, { colors } from '../styles/index.style';
import InputPhoneNumber from '../components/InputPhoneNumber';

const bg = require('../assets/images/confetti-bg.png');
const indexHtml = require('../web/index.html');

class InsertPhoneNumberScreen extends React.Component {
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
    this._submitPhoneNumber = this._submitPhoneNumber.bind(this);
    this._onChangeInputPhoneNumber = this._onChangeInputPhoneNumber.bind(this);
    ////console.log('');
  }
  componentWillMount() {
    this.setState({
      phone: '',
      language: '',
      countryCode: '62',
      completPhoneNumber: ''
    });
  }
  componentDidMount() {
  }
  _submitPhoneNumber() {
    const phoneNumber = this.state.completPhoneNumber;
    // alert(phoneNumber);
    Actions.verificationCode({ phoneNumber });
  }
  _onChangeInputPhoneNumber(completPhoneNumber) {
    this.setState({
      completPhoneNumber
    });
  }

  render() {
    // const title = this.state.title || 'No Title';
    // const data = this.state.data || 'No Data';
    // ////console.log('Login RENDER');
    const html = ''
    + '<script src="https://www.gstatic.com/firebasejs/4.3.1/firebase.js"></script>'
    + '<script>alert("halo");</script>'
    // + '<script>'
    // + '  var config = {'
    // + '    apiKey: "AIzaSyD58G4sYKgJq6yWa5jdtjRl9JhtsFkf_kE",'
    // + '    authDomain: "rayaku-testbed.firebaseapp.com",'
    // + '    databaseURL: "https://rayaku-testbed.firebaseio.com",'
    // + '    projectId: "rayaku-testbed",'
    // + '    storageBucket: "rayaku-testbed.appspot.com",'
    // + '    messagingSenderId: "1060562171114"'
    // + '  };'
    // + '  firebase.initializeApp(config);'
    // + '</script>'
    // + '<div><button id="sign-in-button">signin</button></div>'
    // + '<script>'
    // + 'alert("cek");'
    // + 'window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {'
    // + '  "size": "invisible",'
    // + '  "callback": function(response) {'
    // + '    // reCAPTCHA solved, allow signInWithPhoneNumber.'
    // + '    alert("callback");'
    // + '    //onSignInSubmit();'
    // + '  }'
    // + '});'
    // + '</script>'
    + '';
    const js = 'alert("cek");';
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
              <Text style={{ fontSize: 25, color: '#fff' }}>Insert Your Phone Number</Text>
              <View style={{ height: 50, marginTop: 50, marginBottom: 20 }}>
                <InputPhoneNumber onChangeInputPhoneNumber={this._onChangeInputPhoneNumber} />
              </View>
              <Button
                onPress={() => { this._submitPhoneNumber(); }}
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
            {/* <View
              style={{
                flex: 1,
                // backgroundColor: 'blue'
              }}
            >
              <WebView
                // source={{ uri: 'https://github.com/facebook/react-native' }}
                source={indexHtml}
                style={{ marginTop: 20 }}
                injectedJavaScript={js}
              />
            </View> */}
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

export default InsertPhoneNumberScreen;
