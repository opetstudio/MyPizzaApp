import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Icon from '@builderx/icons'
import MaterialIconButtonsFooter from '../symbols/MaterialIconButtonsFooterTrxDetail'
import { Center } from '@builderx/utils'

export default class Untitled3 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <Center>
          <Text style={styles.text}>Transaction Detail</Text>
          <Text style={styles.text8}>Qty</Text>
          <Text style={styles.text9}>Name</Text>
          <Text style={styles.text10}>Price</Text>
          <Text style={styles.text11}>1.</Text>
          <Text style={styles.text12}>Action Figure 01</Text>
          <Text style={styles.text13}>1.125.000.00</Text>
          <Text style={styles.text14}>2.</Text>
          <Text style={styles.text15}>Marchandise DP</Text>
          <Text style={styles.text16}>25.000.00</Text>
        </Center>
        <Center horizontal>
          <Text style={styles.text2}>Amount</Text>
          <Text style={styles.text3}>Rp382.000</Text>
          <Text style={styles.text4}>PIN</Text>
        </Center>
        <Center horizontal>
            <TextInput style={styles.textinput}
              placeholder='******'
              selectionColor='#000'
              textAlign={'center'}
              maxLength={6}
              secureTextEntry
              />
          </Center>
        <MaterialIconButtonsFooter style={styles.materialIconButtonsFooter} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eb1c24'
  },
  text: {
    top: 12,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  icon3: {
    top: 7,
    left: 10,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35
  },
  text8: {
    top: 100.85,
    left: '9.1%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text9: {
    top: 100.85,
    left: '20.94%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text10: {
    top: 100.85,
    left: '68.2%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text11: {
    top: 128.36,
    left: '10.91%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text12: {
    top: 128.36,
    left: '20.94%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text13: {
    top: 128.36,
    left: '68.12%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text14: {
    top: 152.51,
    left: '10.62%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text15: {
    top: 152.51,
    left: '20.94%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text16: {
    top: 152.51,
    left: '72.55%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute'
  },
  text2: {
    top: '50.48%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30
  },
  text3: {
    top: '55.48%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 40
  },
  text4: {
    top: '68.00%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 25
  },
  textinput: {
    top: '75.05%',
    width: 350.00,
    height: 52.67,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230,1)',
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
  }
})
