import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native'
import Icon from '@builderx/icons'
import { Center } from '@builderx/utils'
import MaterialButtonViolet from '../symbols/MaterialButtonViolet'

export default class Untitled4 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.rect} />
          <Icon onPress={() => this.props.navigation.navigate('ScreenCard')}
            name='arrow-left'
            style={styles.icon}
        />
          <Text style={styles.text}>OTP</Text>
          <Center horizontal>
            <TextInput style={styles.rect2}
              selectionColor='#000'
              textAlign={'center'}
              maxLength={6}
              placeholder='******'
              secureTextEntry
              />
          
          <Text style={styles.text3}>6 DIGITS</Text>
          <MaterialButtonViolet title={'Request OTP'} style={styles.materialButtonViolet8} onPress={() => this.props.navigation.navigate('ScreenSuccessBind')} />
          </Center>
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
  rect2: {
    top: 230,
    width: 350,
    height: 52.67,
    borderRadius: 5,
    backgroundColor: 'rgba(230, 230, 230,1)',
    position: 'absolute',
    fontSize: 30
  },
  text3: {
    top: 290,
    color: 'rgba(208,2,27,1)',
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold'
  },
  materialButtonViolet8: {
    top: 350,
    width: '44.321399264865455%',
    height: 46,
    backgroundColor: '#eb1c24',
    position: 'absolute',
    borderRadius: 5
  }
})
