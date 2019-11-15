import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput, ScrollView } from 'react-native'
import Icon from '@builderx/icons'
import MaterialButtonViolet from '../Button/MaterialButtonViolet'
import MaterialFixedLabelTextbox from '../InputText/MaterialFixedLabelTextbox'
import { Center } from '@builderx/utils'
import Header from '../Header'

export default class Untitled2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    this.props.navigation.navigate('ScreenOTP')
  }
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{flex: 1}}>
          <Header
            hasBack
              // isHomePage
              // hasHamburger
              // hasSearch
              navigation={this.props.navigation}
              // noBackground
              title='screen-title-addcard'
            />
          <ScrollView>
            <MaterialFixedLabelTextbox name='cardnumber' onChangeText={this.handleChange} placeholder={'Card Number'} />
            <MaterialFixedLabelTextbox name='expirydate' onChangeText={this.handleChange} placeholder={'Expiry Date'} />
            <MaterialFixedLabelTextbox name='securecode' onChangeText={this.handleChange} placeholder={'secure code'} />
            <MaterialButtonViolet title='Submit Card' onPress={this.handleSubmit} />
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 56,
    backgroundColor: '#eb1c24',
    position: 'absolute'
  },
  icon: {
    top: 7,
    left: 10,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35
  },
  textinput: {
    top: '25.05%',
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 20
  },
  textinput1: {
    top: '40.05%',
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 20
  },
  textinput2: {
    top: '55.05%',
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 20
  },
  ButtonVioletOk: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    top: '70.05%',
    position: 'absolute'
  }
})
