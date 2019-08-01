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
import { Actions } from 'react-native-router-flux';


import styles, { colors } from '../styles/index.style';

const bg = require('../assets/images/confetti-bg.png');
const verified_icon = require('../assets/images/verified-icon.png');

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
    setTimeout(() => {
      Actions.createProfile({ type: 'reset' });
    }, 3000);
  }
  _submitVerificationCode() {

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
              <Image style={{ }} source={verified_icon} />
              <Text style={{ fontSize: 25, color: '#fff', marginTop: 20 }}>Verified</Text>

            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'blue'
              }}
            >
              {/*  */}
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
