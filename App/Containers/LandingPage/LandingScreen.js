import React, { Component } from 'react'
import { View, Image, ScrollView, Text } from 'react-native'
import Images from '../../Themes/Images'
// import RoundedButton from '../../Components/RoundedButton'
import CustomButton from '../../Components/CustomButton'

import styles from '../LandingPage/LandingScreenStyles'

export default class LandingScreen extends Component {
  constructor (props) {
    super(props)
    this._doLogin = this._doLogin.bind(this)
    this._doSignup = this._doSignup.bind(this)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Image source={Images.landingPageBan} style={styles.banner} />
          </View>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={{marginTop: 30}}>
            <CustomButton onPress={() => this._doLogin()} title={'LOGIN'} />
            <CustomButton onPress={() => this._doSignup()} title={'SIGNUP'} />
          </View>
        </ScrollView>
      </View>
    )
  }
  // move to login page
  _doLogin () {
    this.props.navigation.navigate('LoginScreen2')
  }
  // move to signup page
  _doSignup () {
    this.props.navigation.navigate('SignupScreen', {otherParam: 'SIGNUP'})
  }
}
