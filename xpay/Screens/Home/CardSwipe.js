import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import {Images, Metrics} from '../../Themes'
// import Swiper from 'react-native-swiper'
import ViewPager from '@react-native-community/viewpager'
import { withNavigation } from 'react-navigation'

const width = Metrics.screenWidth
const height = Metrics.screenHeight

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#9DD6EB'
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
class CardSwipe extends Component {
  render () {
    return (
      <ViewPager style={styles.wrapper}>
        <TouchableOpacity key="1" style={styles.slide} onLongPress={() => this.props.navigation.navigate('ScreenShowqr')}>
          <View style={styles.imgWrap}>
            <Image source={Images.cardBni} style={styles.img} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity key="2" style={styles.slide} onLongPress={() => this.props.navigation.navigate('ScreenShowqr')}>
          <View style={styles.imgWrap}>
            <Image source={Images.cardBri1} style={styles.img} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity key="3" style={styles.slide} onLongPress={() => this.props.navigation.navigate('ScreenShowqr')}>
          <View style={styles.imgWrap}>
            <Image source={Images.mandiri} style={styles.img} />
          </View>
        </TouchableOpacity>
      </ViewPager>
    )
  }
}
export default withNavigation(CardSwipe)
