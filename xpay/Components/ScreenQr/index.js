import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text } from 'react-native'
import Icon from '@builderx/icons'
import { Center } from '@builderx/utils'

export default class Untitled2 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <Center>
            <View style={styles.rect} />
            <Icon onPress={() => this.props.navigation.navigate('ScreenDashboard')}
              name='arrow-left'
              style={styles.icon}
        />
            <Text style={styles.text}>QR Check Payment</Text>
            <Icon type={'Ionicons'} name={'md-apps'} style={styles.icon2} />
            <Text style={styles.text2}>Pastikan Qr Code{'\n'}Tidak Rusak</Text>
            <View style={styles.rect2} />
            <Icon
              type={'MaterialCommunityIcons'}
              name={'qrcode-scan'}
              style={styles.icon3}
        />
          </Center>
          <View style={styles.centered}>
            <Text onPress={() => this.props.navigation.navigate('ScreenTransactiondetail')} >Next</Text>
          </View>
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
  icon2: {
    top: 7,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    right: 20
  },
  text2: {
    top: '75.58%',
    color: 'rgba(208,2,27,1)',
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  rect2: {
    top: '27.98%',
    left: '8.85%',
    width: '81.96%',
    height: '39.51%',
    backgroundColor: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  icon3: {
    top: '32.11%',
    position: 'absolute',
    color: 'rgba(0,0,0,1)',
    fontSize: 200
  },
  centered: {
    alignItems: 'center',
    top: '85.58%'
  }
})
