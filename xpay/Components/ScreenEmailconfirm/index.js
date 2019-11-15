import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Center } from '@builderx/utils'
import Icon from '@builderx/icons'
import MaterialButtonViolet from '../Button/MaterialButtonViolet'

export default class Untitled5 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <Center horizontal>
          <Icon
            type={'Ionicons'}
            name={'md-checkmark-circle-outline'}
            style={styles.icon}
          />
        </Center>
        <Center horizontal>
          <Text style={styles.text}>Email Confirm</Text>
        </Center>
        <MaterialButtonViolet title='Sign In' onPress={() => this.props.navigation.replace('ScreenLogin')} style={styles.ButtonVioletOk} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eb1c24'
  },
  icon: {
    top: 105.79,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 200
  },
  text: {
    top: 332.54,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30
  },
  text2: {
    top: 340,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30
  },
  text3: {
    top: 416.54,
    left: '11.37%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text4: {
    top: 451.76,
    left: '12.84%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text5: {
    top: 479.97,
    left: '12.84%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 14
  },
  text6: {
    top: 451.76,
    left: '62.8%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text7: {
    top: 479.97,
    left: '65.91%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  materialIconButtonsFooter: {
    left: 0,
    width: '100%',
    height: 55.97,
    backgroundColor: '#2d2d2d',
    position: 'absolute',
    bottom: 0.03
  },
  ButtonVioletOk: {
    backgroundColor: "#3F51B5"
  },
})
