import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native'
import Icon from '@builderx/icons'
import { Center } from '@builderx/utils'
import MaterialButtonViolet8 from '../symbols/ScreenOTP/MaterialButtonViolet8'
import Header from '../Header'

export default class Untitled4 extends Component {
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
            title='screen-title-input-otp'
          />
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{flex: 1}}>
          <Center horizontal>
            <TextInput style={styles.rect2}
              selectionColor='#000'
              textAlign={'center'}
              maxLength={6}
              placeholder='******'
              secureTextEntry
              />
          </Center>
          <Text style={styles.text3}>6 DIGITS</Text>
          <MaterialButtonViolet8 style={styles.materialButtonViolet8} />
          <MaterialButtonViolet8 style={styles.materialButtonViolet8} />
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
  icon2: {
    top: 7,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    right: 20
  },
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  rect2: {
    top: '32.05%',
    width: 193.14,
    height: 52.67,
    borderRadius: 5,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 30
  },
  text3: {
    top: '42.05%',
    left: '39.01%',
    color: 'rgba(208,2,27,1)',
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold'
  },
  materialButtonViolet8: {
    top: '52.05%',
    left: '27.84%',
    width: '44.321399264865455%',
    height: 36,
    backgroundColor: '#f6f6f6',
    position: 'absolute',
    borderRadius: 5,
    borderColor: 'rgba(208,2,27,1)',
    borderWidth: 3
  }
})
