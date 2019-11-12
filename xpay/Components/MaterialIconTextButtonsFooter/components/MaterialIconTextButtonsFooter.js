import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Images} from '../../../Themes'

export default class MaterialIconTextButtonsFooter extends Component {
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity style={styles.buttonWrapper1}>
          <Image source={Images.QR} />
          {/* <MaterialCommunityIconsIcon name='timer' style={styles.icon1} /> */}
          {/* <Text style={styles.btn1Text}>Recent</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeButtonWrapper} onPress={() => this.props.navigation.navigate('ScreenScanQr')}>
          <Image source={Images.scan} />
          {/* <MaterialCommunityIconsIcon name='heart' style={styles.activeIcon} /> */}
          {/* <Text style={styles.activeContent}>Favorites</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper2} onPress={() => this.props.sessionLogout()}>
          <Image source={Images.logout} />
          {/* <MaterialCommunityIconsIcon
            name='map-marker-radius'
            style={styles.icon2}
          /> */}
          {/* <Text style={styles.btn2Text}>Nearby</Text> */}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#434343',
    flexDirection: 'row',
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: '#111',
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  buttonWrapper1: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  icon1: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8
  },
  btn1Text: {
    backgroundColor: 'transparent',
    color: '#9E9E9E',
    paddingTop: 4,
    fontSize: 12,
    fontFamily: 'roboto-regular'
  },
  activeButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 10,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  activeIcon: {
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: 24,
    opacity: 0.8
  },
  activeContent: {
    backgroundColor: 'transparent',
    color: '#3f51b5',
    paddingTop: 4,
    fontSize: 14,
    fontFamily: 'roboto-regular'
  },
  buttonWrapper2: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  icon2: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8
  },
  btn2Text: {
    backgroundColor: 'transparent',
    color: '#9E9E9E',
    paddingTop: 4,
    fontSize: 12,
    fontFamily: 'roboto-regular'
  }
})
