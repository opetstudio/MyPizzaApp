import React from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput, Alert, ImageBackground, Image, TouchableHighlight, StatusBar} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Images, Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import {isLoggedIn} from '../../Lib/Utils'

import PrimarynButton from '../Button/PrimaryButton'

class ScreenLogin extends React.Component {
  static propTypes = {
    loginRequest: PropTypes.func,
    sessionToken: PropTypes.string,
    isLoggedIn: PropTypes.bool
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
  async componentDidUpdate (prevProps) {
    console.log('componentDidUpdate this.props.sessionToken=', this.props.sessionToken)
    console.log('componentDidUpdate prevProps.sessionToken=', prevProps.sessionToken)
    if (this.props.isLoggedIn !== null && !_.isEqual(prevProps.isLoggedIn, this.props.isLoggedIn)) {
      const isLogin = await isLoggedIn()
      console.log('isLogin=', isLogin)
      if (this.props.isLoggedIn) this.props.navigation.navigate('loggedinNavigator')
      // if (isLogin) this.props.navigation.navigate('loggedinNavigator')
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
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <ScrollView style={styles.container}>
            {/* <View style={{marginTop: 50, alignItems: 'center'}}>
              <Image source={Images.logoBayar2} style={styles.logo} />
            </View> */}
            <View style={{marginTop: 80}}>
              <View style={styles.centered}>
                <TextInput style={styles.inputBox}
                  placeholder='Email'
                  underlineColorAndroid='rgba(0,0,0,0.5)'
                  selectionColor='#000'
                  keyboardType='email-address'
                  onChangeText={(v) => this.setState({userid: v})}
                  textAlign={'center'}
              />
                <TextInput style={styles.inputBox}
                  placeholder='Password'
                  underlineColorAndroid='rgba(0,0,0,0.5)'
                  selectionColor='#000'
                  secureTextEntry
                  onChangeText={(v) => this.setState({password: v})}
                  textAlign={'center'}
              />
              </View>
              <View style={{marginTop: 20}}>
                <PrimarynButton colors={'darkgrey'} title={'LOGIN'} onPress={() => this._doLogin()} />
              </View>
              <View style={styles.centered}>
                <Text>Dont have an acoount yet?</Text>
                <Text style={styles.textSignup} onPress={() => this.props.navigation.navigate('ScreenSignup')} >SignUp</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        {/* <StatusBar
          animated
          hidden={false}
          backgroundColor={'rgba(189,12,12,1)'}
          style={styles.statusBar}
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    paddingBottom: Metrics.baseMargin
  },
  centered: {
    alignItems: 'center'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    fontSize: 16,
    color: Colors.blackSecondaryOpacity,
    marginBottom: 10
  },
  label: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.blackSecondaryOpacity
  },
  textSignup: {
    textDecorationLine: 'underline'
  },
  statusBar: {}

})

export default ScreenLogin
