import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput } from 'react-native'
import Icon from '@builderx/icons'
import MaterialButtonViolet from '../symbols/MaterialButtonViolet'
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
          <Text style={styles.text}>Amount</Text>
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
          <MaterialButtonViolet title={'Ok'} style={styles.ButtonVioletOk} onPress={() => this.props.navigation.navigate('ScreenTransactiondetail')} />
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
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  textinput: {
    top: 230,
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 20
  },
  textinput1: {
    top: 300,
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
    top: 400,
  }
})
