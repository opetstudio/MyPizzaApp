import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Center } from '@builderx/utils'
import Icon from '@builderx/icons'
import {Metrics, Colors} from '../../Themes'
import MaterialButtonViolet1 from '../symbols/ScreenTransactionsuccess/MaterialButtonViolet1'

export default class Untitled5 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            type={'Ionicons'}
            name={'md-checkmark-circle-outline'}
            style={styles.icon}
          />
          <Text style={styles.text}>Success</Text>
          <Text style={styles.text2}>Bind Card</Text>
          <MaterialButtonViolet1 style={styles.ButtonVioletOk} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.colorPrimaryDark
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 300
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontSize: 40
  },
  text2: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30
  },
  materialIconButtonsFooter: {
    height: 55.97,
    width: Metrics.screenWidth - 10,
    backgroundColor: '#2d2d2d',
  },
  ButtonVioletOk: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center'
  },
})
