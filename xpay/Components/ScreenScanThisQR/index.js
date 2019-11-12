import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Center } from '@builderx/utils'
import Icon from '@builderx/icons'
import { Images, Metrics } from '../../Themes'

export default class Untitled5 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <Center>
          <View style={styles.rect} />
          <Icon onPress={() => this.props.navigation.navigate('ScreenDashboard')}
            name='arrow-left'
            style={styles.icon}
        />
          <Center horizontal>
            <Text style={styles.text2}>Scan This QR Code</Text>
          </Center>

          <Image source={Images.qrcode} style={styles.images} onPress={() => this.props.navigation.navigate('ScreenAmount')} />
          <View style={styles.centered}>
            <Text onPress={() => this.props.navigation.navigate('ScreenAmount')} >Next</Text>
          </View>
        </Center>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eb1c24'
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
  text2: {
    top: '15.00%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30
  },
  images: {
    top: '27.11%',
    position: 'absolute',
    color: 'rgba(0,0,0,1)'
  },
  text3: {
    top: 416.54,
    left: '11.37%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  centered: {
    alignItems: 'center',
    top: '40.58%'
  }
})
