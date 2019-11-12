import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput } from 'react-native'
import Icon from '@builderx/icons'
import MaterialButtonViolet1 from '../symbols/ScreenCard/MaterialButtonViolet1'
import { Center } from '@builderx/utils'
import Header from '../Header'

export default class Untitled2 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <Header
          hasBack
            // isHomePage
            // hasHamburger
            // hasSearch
            navigation={this.props.navigation}
            // noBackground
            title='screen-title-addcard'
          />
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{flex: 1}}>

          {/* <Center>
            <View style={styles.rect} />
            <Icon onPress={() => this.props.navigation.navigate('ScreenDashboard')}
              name='arrow-left'
              style={styles.icon}
        />
          </Center> */}
          <Center horizontal>
            <TextInput style={styles.textinput}
              placeholder='Card Number'
              selectionColor='#000'
              textAlign={'left'}
              />
          </Center>
          <Center horizontal>
            <TextInput style={styles.textinput1}
              placeholder='DD/MM/YYYY'
              selectionColor='#000'
              textAlign={'left'}
              />
          </Center>
          <Center horizontal>
            <TextInput style={styles.textinput2}
              placeholder='SSC'
              selectionColor='#000'
              textAlign={'left'}
              />
          </Center>
          <MaterialButtonViolet1 style={styles.ButtonVioletOk} />
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
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
