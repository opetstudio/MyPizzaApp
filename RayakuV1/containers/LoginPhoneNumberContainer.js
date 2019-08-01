import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Picker,
  StatusBarIOS
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import styles, { colors } from '../styles/index.style';

const LIST_COUNTRY = ['ID', 'PH', 'BR', 'FR'];

class LoginPhoneNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    //  StatusBarIOS.setHidden(true);
    this._onPressFlag = this._onPressFlag.bind(this);
    this._selectCountry = this._selectCountry.bind(this);
    this.state = {
        cca2: 'ID',
        phone: '',
        language: '',
        countryCode: '62'
    };
    // this.setState({
    //   title: 'No Title',
    //   data: 'No Data',
    // });
    ////console.log('');
  }
  componentWillMount() {
    this.setState({
      phone: '',
      language: '',
      countryCode: '62'
    });
  }
  componentDidMount() {
  }
  _onPressFlag() {
  }

  _selectCountry(country) {
    ////console.log('country===>', country);
      this.setState({ cca2: country.cca2, countryCode: country.callingCode });
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
        <View style={{ width: 50, height: 50 }}>
          <CountryPicker
              ref='countryPicker'
              onChange={(value) => this._selectCountry(value)}
              countryList={LIST_COUNTRY}
              translation='eng'
              cca2={this.state.cca2}
              filterable
              closeable
          />
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>+{this.state.countryCode}</Text>
        </View>
        <View style={{ width: 200, height: 50 }}>
          <TextInput
            style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
            onChangeText={text => { console.log(text); }}
            placeholder="Verification Code"
            keyboardType='numeric'
            placeholderTextColor='#a9acad'
          />
        </View>
      </View>
    );
  }
}

export default LoginPhoneNumberContainer;
