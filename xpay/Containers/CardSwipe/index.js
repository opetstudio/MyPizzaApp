import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text
} from 'react-native'
import {Images, Metrics} from '../../Themes'
import Swiper from 'react-native-page-swiper'

const width = Metrics.screenWidth
const height = Metrics.screenHeight

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
    width: width - 6
  },
  imgWrap: {
    flex: 1,
    width,
    padding: 3,
    backgroundColor: 'white'
  }
})
// cardBni: require('../Images/Cards/bni.png'),
//   cardBri1: require('../Images/Cards/bri1.png'),
//   cardBri2: require('../Images/Cards/bri2.png'),
//   mandiri: require('../Images/Cards/Mandiri.png')
export default class extends Component {
  render () {
    return (
      <Swiper style={styles.wrapper}
        showsButtons
        showsPagination={false}
        loop
        >
        <View style={styles.slide1}>
          <View style={styles.imgWrap}>
            <Image source={Images.cardBni} style={styles.img} />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.imgWrap}>
            <Image source={Images.cardBri1} style={styles.img} />
          </View>
        </View>
        <View style={styles.slide3}>
          <View style={styles.imgWrap}>
            <Image source={Images.mandiri} style={styles.img} />
          </View>
        </View>
      </Swiper>
    )
  }
}
