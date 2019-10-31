import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Center } from '@builderx/utils'
import Icon from '@builderx/icons'
import MaterialButtonViolet from '../symbols/MaterialButtonViolet'

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
          <Text style={styles.text}>Success</Text>
        </Center>
        <Center horizontal>
          <Text style={styles.text2}>Bind Card</Text>
        </Center>
        <MaterialButtonViolet title={'Ok'} style={styles.ButtonVioletOk} onPress={() => this.props.navigation.navigate('ScreenDashboard')} />
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
    top: 75.79,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 300
  },
  text: {
    top: 392.54,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 40
  },
  text2: {
    top: 440,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30
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
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    top: '140.05%',
    borderWidth: 2,
    borderColor: '#fff'
  },
})
