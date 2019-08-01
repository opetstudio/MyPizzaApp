import React from 'react';
import {
  View,
  Text
} from 'react-native';
import AccountKit, { LoginButton, Color } from 'react-native-facebook-account-kit';
import { colors } from '../styles/color.style';

class ButtonLoginFBAccountKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        authToken: null,
        loggedAccount: null
    };
    this._configureAccountKit = this._configureAccountKit.bind(this);
    this._onErrorFbAccountKit = this._onErrorFbAccountKit.bind(this);
    this._configureAccountKit = this._configureAccountKit.bind(this);
    this._onLogoutPressed = this._onLogoutPressed.bind(this);
  }
  componentWillMount() {
    this._configureAccountKit();
    AccountKit.getCurrentAccessToken()
      .then(token => {
        if (token) {
          AccountKit.getCurrentAccount().then(account => {
            this.setState({
              authToken: token,
              loggedAccount: account,
            });
            if (account) {
              this.props.onLogedIn(token, account);
            } else {
              alert('belum logedin');
            }
          });
        } else {
          ////console.log('No user account logged');
        }
      })
      .catch(e => {
        ////console.log('Failed to get current access token', e)
      });
  }
  _configureAccountKit() {
    AccountKit.configure({
     theme: {
       backgroundColor: Color.hex(colors.acckitBg),
       //backgroundImage: '../assets/images/gradient_bg.png',
       buttonBackgroundColor: Color.hex(colors.white),
       buttonDisabledBackgroundColor: Color.rgba(0, 0, 0, 0.1),
       buttonTextColor: Color.hex(colors.black),
       textColor: Color.hex(colors.white),
       headerBackgroundColor: Color.hex(colors.acckitOrange),
      //  headerTextColor: Color.rgba(0, 255, 0, 1),
      //  headerButtonTextColor: Color.rgba(0, 255, 0, 1),
      //  iconColor: Color.rgba(0, 255, 0, 1),
       inputBackgroundColor: Color.rgba(0, 0, 0, 0.1),
      // inputBorderColor: Color.hex(colors.lightGray),
       inputTextColor: Color.hex(colors.lightGray),
       titleColor: Color.hex(colors.white),
      //  // backgroundImage:       "background.png",
     },
     //countryWhitelist: ['ID', 'PH'],
     countryBlacklist: ['IN', 'BR'],
     defaultCountry: 'ID',
    //  initialEmail: 'example.com',
     initialPhoneCountryPrefix: '+62',
     initialPhoneNumber: '',
   });
  }
  _onErrorFbAccountKit(e) {
    ////console.log(e);
    alert('errrrror');
  }
  _onLogin(token) {
   if (!token) {
     console.warn('User canceled login');
   } else {
     AccountKit.getCurrentAccount().then(account => {
       this.setState({
         authToken: token,
         loggedAccount: account,
       });
       if (account) {
         this.props.onLogedIn(token, account);
       }
     });
   }
 }
 _onLogoutPressed() {
    AccountKit.logout()
      .then(() => {
        this.setState({
          authToken: null,
          loggedAccount: null,
        });
      })
      .catch(e => {
        ////console.log('Failed to logout', e);
      });
  }
 render() {
   const label = this.props.label || 'Login';
   return (
     <View>
       <LoginButton
         type="phone"
         onLogin={token => this._onLogin(token)}
         onError={e => this._onLogin(e)}
       >
        {this.props.children}
       </LoginButton>
     </View>
   );
 }
}

export default ButtonLoginFBAccountKit;
