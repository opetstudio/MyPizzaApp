import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, ImageBackground, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialFixedLabelTextbox from '../symbols/MaterialFixedLabelTextbox'
import MaterialButtonViolet from '../symbols/MaterialButtonViolet'
import {Images, Colors, Metrics} from '../../Themes'
import Header from '../Header'

export default class ScreenSingup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (name, value) {
    this.setState({form: {...this.state.form, [name]: value}})
  }
  handleSubmit () {
    console.log('submit form ', this.state.form)
    
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
        <Header
          hasBack
          // hasHamburger
          // hasSearch
          navigation={this.props.navigation}
          title={'Signup'}
        />
          <ScrollView style={styles.container}>

            <MaterialFixedLabelTextbox name='email' onChangeText={this.handleChange} placeholder={'Email'} style={styles.TextboxEmail} />
            <MaterialFixedLabelTextbox name='fullname' onChangeText={this.handleChange} placeholder={'Full Name'} style={styles.TextboxFullname} />
            <MaterialFixedLabelTextbox name='noId' onChangeText={this.handleChange} placeholder={'No. ID'} style={styles.TextboxNoID} />
            <MaterialFixedLabelTextbox name='address' onChangeText={this.handleChange} placeholder={'Address'} style={styles.TextboxAddress} />
            <MaterialFixedLabelTextbox name='phoneNumber' onChangeText={this.handleChange} placeholder={'Phone Number'} style={styles.TextboxNoHP} />
            <MaterialButtonViolet onPress={this.handleSubmit} style={styles.ButtonVioletSignUp} />

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
  rect: {
    width: '100%',
    height: 56,
    backgroundColor: '#eb1c24'
  },
  iconBack: {
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    height: 40,
    width: 40,
    marginTop: 7,
    marginLeft: 10
  },
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  TextboxEmail: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 26
  },
  TextboxFullname: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoID: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 14
  },
  TextboxAddress: {
    width: 350,
    height: 142,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoHP: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 12
  },
  ButtonVioletSignUp: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 24
  },
  statusBar: {}
})
