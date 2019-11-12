import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput } from 'react-native'
import Icon from '@builderx/icons'
import MaterialButtonViolet1 from '../symbols/ScreenAmount/MaterialButtonViolet1'
import { Center } from '@builderx/utils'

export default class Untitled2 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <Center>
            <View style={styles.rect} />
            <Icon onPress={() => this.props.navigation.navigate('ScreenScanThisQR')}
              name='arrow-left'
              style={styles.icon}
        />
          </Center>
          <Center horizontal>
            <TextInput style={styles.textinput}
              placeholder='Amount'
              selectionColor='#000'
              textAlign={'left'}
              />
          </Center>
          <Center horizontal>
            <TextInput style={styles.textinput1}
              placeholder='Ref Number'
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
    top: '35.05%',
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 20
  },
  textinput1: {
    top: '45.05%',
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
    top: '105.05%',
  }
})
