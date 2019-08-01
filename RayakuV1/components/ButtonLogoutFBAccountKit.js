import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import AccountKit from 'react-native-facebook-account-kit';

class ButtonLogoutFBAccountKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        authToken: null,
        loggedAccount: null
    };
    this._onLogoutPressed = this._onLogoutPressed.bind(this);
  }
  componentWillMount() {
  }
 _onLogoutPressed() {
    AccountKit.logout()
      .then(() => {
        this.props.onLogedOut();
      })
      .catch(e => {
        ////console.log('Failed to logout', e);
      });
  }
 render() {
   return (
     <View>
       <TouchableOpacity onPress={() => this._onLogoutPressed()}>
         <Text>Logout</Text>
       </TouchableOpacity>
     </View>
   );
 }
}

export default ButtonLogoutFBAccountKit;
