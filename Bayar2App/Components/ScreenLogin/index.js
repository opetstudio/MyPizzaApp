import React from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput, Alert} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import styles from './styles'
import AppConfig from '../../Config/AppConfig'

import PrimarynButton from '../Button/PrimaryButton'
import Button from '../Button/StyledButton'
import HeaderMenu from '../Header'

class ScreenLogin extends React.Component {
  static propTypes = {
    loginRequest: PropTypes.func,
    sessionToken: PropTypes.string
  }
  static defaultProps = {
    loginRequest: () => {}
    // sessionToken: null
  }
  constructor (props) {
    super(props)
    this.state = {
      userid: '',
      password: '',
      sessionToken: this.props.sessionToken
    }
    this._doLogin = this._doLogin.bind(this)
  }
  componentDidUpdate (prevProps) {
    if (this.props.sessionToken !== null && !_.isEqual(prevProps.sessionToken, this.props.sessionToken)) {
      this.props.navigation.navigate('loggedinNavigator')
    }
  }
  _doLogin () {
    let username = this.state.userid
    let password = this.state.password

    if (username !== '' && password !== '') {
      this.props.loginRequest({userid: username, password: password})
    } else {
      Alert.alert('invalid userid or password')
    }
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <HeaderMenu
          hasBackIonicon
          navigation={this.props.navigation}
          noTitle
          noBackground
        />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Text style={styles.label}>Masuk</Text>
            <Text style={styles.placeholder}>Email</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0.5)'
              selectionColor='#000'
              keyboardType='email-address'
              onChangeText={(v) => this.setState({userid: v})}
              />
            <Text style={styles.placeholder}>Password</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0.5)'
              selectionColor='#000'
              secureTextEntry
              placeholderTextColor='#ffffff'
              onChangeText={(v) => this.setState({password: v})}
              />
          </View>
          <View style={{marginTop: 30}}>
            <PrimarynButton colors={'gradient'} title={'LOGIN'} onPress={() => this._doLogin()} />
            {/* <PrimarynButton colors={'gradient'} title={'LOGIN'} onPress={() => this._doLogin()} /> */}
          </View>
          <View style={styles.centered}>
            <Button
              type='link'
              onPress={() => { this.props.navigation.navigate('ScreenForgetpassword') }}
              i18nKey='Lupa kata sandi?'
              // noFeedback
              textStyle={'h10LtGreyS'}
              isMultipleTapAllowed
          />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ScreenLogin
