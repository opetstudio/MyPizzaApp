import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, StatusBar } from 'react-native'
import { Center } from '@builderx/utils'
import Svg, { Ellipse } from 'react-native-svg'
import MaterialButtonViolet from '../symbols/ScreenDashboard/MaterialButtonViolet'
import MaterialButtonViolet1 from '../symbols/ScreenDashboard/MaterialButtonViolet1'
import MaterialButtonViolet2 from '../symbols/ScreenDashboard/MaterialButtonViolet2'
import MaterialButtonViolet3 from '../symbols/ScreenDashboard/MaterialButtonViolet3'
import MaterialIconButtonsFooter from '../symbols/MaterialIconButtonsFooter'

export default class Untitled1 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.rect} />
          <Center horizontal>
            <Svg viewBox={NaN} style={styles.ellipse2}>
              <Ellipse
                strokeWidth={1}
                fill={'rgba(230, 230, 230,1)'}
                stroke={'rgba(230, 230, 230,1)'}
                cx={50}
                cy={50}
                rx={49.5}
                ry={49.5}
            />
            </Svg>
          </Center>
          <Center horizontal>
            <Text style={styles.text}>Berty Tumatangtang</Text>
          </Center>
          <Center horizontal>
            <Text style={styles.text2}>2.730,330,00</Text>
          </Center>
          <MaterialButtonViolet style={styles.materialButtonViolet} />
          <MaterialButtonViolet1 style={styles.materialButtonViolet1} />
          <MaterialButtonViolet2 style={styles.materialButtonViolet2} />
          <MaterialButtonViolet3 style={styles.materialButtonViolet3} />
          <MaterialIconButtonsFooter style={styles.materialIconButtonsFooter} />
        </ImageBackground>
        <StatusBar
          animated
          hidden={false}
          backgroundColor={'rgba(189,12,12,1)'}
          style={styles.statusBar}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  image: {
    top: '13.84%',
    width: '190.64%',
    height: '86.16%',
    position: 'absolute'
  },
  rect: {
    top: '0%',
    left: '0%',
    width: '100%',
    height: '34.92%',
    backgroundColor: '#eb1c24',
    position: 'absolute'
  },
  ellipse2: {
    top: '05.00%',
    width: 100,
    height: 100,
    position: 'absolute'
  },
  text: {
    top: '21.94%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text2: {
    top: '26.48%',
    color: 'rgba(126,211,33,1)',
    position: 'absolute',
    fontSize: 30
  },
  materialButtonViolet: {
    width: 118.71,
    height: 81.74,
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    right: '57.06%',
    bottom: '39.07%',
    borderRadius: 25
  },
  materialButtonViolet1: {
    left: '57.08%',
    width: 118.69,
    height: 81.77,
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    bottom: '39.07%',
    borderRadius: 25
  },
  materialButtonViolet2: {
    width: 118.71,
    height: 81.76,
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    right: '57.06%',
    bottom: '19.68%',
    borderRadius: 25
  },
  materialButtonViolet3: {
    left: '57.4%',
    width: 116.35,
    height: 81.77,
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    bottom: '19.68%',
    borderRadius: 25
  },
  materialIconButtonsFooter: {
    left: 0,
    width: '100%',
    height: 55.97,
    backgroundColor: '#2d2d2d',
    position: 'absolute',
    bottom: 0.03
  },
  statusBar: {}
})
