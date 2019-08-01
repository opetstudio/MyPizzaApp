import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const LIST_COUNTRY = ['ID', 'PH', 'BR', 'FR'];

class LoginPhoneNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    //  StatusBarIOS.setHidden(true);
    this._onPressFlag = this._onPressFlag.bind(this);
    this._selectCountry = this._selectCountry.bind(this);
    this._onChangeInputPhoneNumber = this._onChangeInputPhoneNumber.bind(this);
    this.state = {
        cca2: 'ID',
        phone: '',
        completPhoneNumber: '',
        language: '',
        countryCode: '62',
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
      countryCode: '62',
      completPhoneNumber: ''
    });
  }
  componentDidMount() {
  }
  _onPressFlag() {
  }

  _selectCountry(country) {
    ////console.log('country===>', country);
    const completPhoneNumber = `${country.callingCode}${this.state.phone}`;
      this.setState({
        cca2: country.cca2,
        countryCode: country.callingCode,
        completPhoneNumber
      });
      this.props.onChangeInputPhoneNumber(completPhoneNumber);
  }
  _onChangeInputPhoneNumber(text) {
    const completPhoneNumber = `${this.state.countryCode}${text}`;
    this.setState({ phone: text, completPhoneNumber });
    this.props.onChangeInputPhoneNumber(completPhoneNumber);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 50,
          borderBottomWidth: 1,
          borderBottomColor: '#fff'
        }}
      >
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
          <Text
            style={{
              color: '#fff',
              fontSize: 20
            }}
          >+{this.state.countryCode}</Text>
        </View>
        <View style={{ width: 200, height: 50 }}>
          <TextInput
            underlineColorAndroid='transparent'
            style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
            onChangeText={text => { this._onChangeInputPhoneNumber(text); }}
            placeholder="123456789"
            keyboardType='numeric'
            placeholderTextColor='#a9acad'
          />
        </View>
      </View>
    );
  }
}

export default LoginPhoneNumberContainer;
