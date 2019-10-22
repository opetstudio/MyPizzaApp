import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, ImageBackground, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialFixedLabelTextbox2 from '../symbols/ScreenSignup/MaterialFixedLabelTextbox2'
import MaterialFixedLabelTextbox3 from '../symbols/ScreenSignup/MaterialFixedLabelTextbox3'
import MaterialFixedLabelTextbox4 from '../symbols/ScreenSignup/MaterialFixedLabelTextbox4'
import MaterialFixedLabelTextbox5 from '../symbols/ScreenSignup/MaterialFixedLabelTextbox5'
import MaterialFixedLabelTextbox6 from '../symbols/ScreenSignup/MaterialFixedLabelTextbox6'
import MaterialButtonViolet1 from '../symbols/ScreenSignup/MaterialButtonViolet1'
import {Images, Colors, Metrics} from '../../Themes'

export default class ScreenSingup extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <ScrollView style={styles.container}>
            <View style={styles.rect}>
              <Icon name='arrow-left' style={styles.iconBack} onPress={() => this.props.navigation.navigate('ScreenHome')} />
            </View>
            <Text style={styles.text}>SignUp</Text>
            <MaterialFixedLabelTextbox2 style={styles.TextboxEmail} />
            <MaterialFixedLabelTextbox3 style={styles.TextboxFullname} />
            <MaterialFixedLabelTextbox4 style={styles.TextboxNoID} />
            <MaterialFixedLabelTextbox5 style={styles.TextboxAddress} />
            <MaterialFixedLabelTextbox6 style={styles.TextboxNoHP} />
            <MaterialButtonViolet1 style={styles.ButtonVioletSignUp} />
          </ScrollView>
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
  container: {
    paddingBottom: Metrics.baseMargin
  },
  rect: {
    width: '100%',
    height: 56,
    backgroundColor: '#eb1c24'
  },
  iconBack: {
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    height: 40,
    width: 40,
    marginTop: 7,
    marginLeft: 10
  },
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  TextboxEmail: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 26
  },
  TextboxFullname: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoID: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 14
  },
  TextboxAddress: {
    width: 350,
    height: 142,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoHP: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 12
  },
  ButtonVioletSignUp: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 113
  },
  statusBar: {}
})
