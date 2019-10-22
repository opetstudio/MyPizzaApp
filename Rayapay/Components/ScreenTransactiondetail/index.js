import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import MaterialButtonViolet4 from '../symbols/ScreenTransaksiDetail/MaterialButtonViolet4'
import Icon from '@builderx/icons'
import MaterialButtonViolet6 from '../symbols/ScreenTransaksiDetail/MaterialButtonViolet6'
import MaterialButtonViolet7 from '../symbols/ScreenTransaksiDetail/MaterialButtonViolet7'
import { Center } from '@builderx/utils'

export default class Untitled3 extends Component {
  render () {
    return (
      <View style={styles.root}>
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.rect} />
          <Text style={styles.text}>Transaction Detail</Text>
          <Icon onPress={() => this.props.navigation.navigate('ScreenQr')}
            name='arrow-left'
            style={styles.icon3}
        />
          <Icon type={'Ionicons'} name={'md-apps'} style={styles.icon4} />
          <Center>
            <MaterialButtonViolet4 style={styles.materialButtonViolet4} />
            <Text style={styles.text2}>amount</Text>
            <View style={styles.rect2} />
            <Text style={styles.text3}>Rp. 1.250.000.00</Text>
            <View style={styles.rect3} />
            <Text style={styles.text4}>06.19 PM / 09.02.19</Text>
            <Text style={styles.text5}>Waktu / Tanggal</Text>
            <View style={styles.rect4} />
            <Text style={styles.text6}>Merchant</Text>
            <Text style={styles.text7}>Tokopedia</Text>
            <MaterialButtonViolet6 style={styles.materialButtonViolet6} />
            <MaterialButtonViolet7 style={styles.materialButtonViolet7} />
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
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 56,
    backgroundColor: '#eb1c24',
    position: 'absolute'
  },
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  materialButtonViolet4: {
    top: 161.47,
    width: '81.96449279785156%',
    height: 36,
    backgroundColor: '#d5d5d5',
    position: 'absolute',
    borderRadius: 5
  },
  icon3: {
    top: 7,
    left: 10,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35
  },
  icon4: {
    top: 7,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    right: 20
  },
  text2: {
    top: 210.47,
    left: '15.67%',
    color: '#121212',
    position: 'absolute',
    fontSize: 14
  },
  rect2: {
    top: 229.47,
    width: '81.79673936631944%',
    height: 36.31,
    backgroundColor: '#eb1c24',
    position: 'absolute',
    borderRadius: 5
  },
  text3: {
    top: 239.62,
    left: '15.67%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  rect3: {
    top: 297.59,
    width: '81.79673936631944%',
    height: 36.31,
    backgroundColor: '#eb1c24',
    position: 'absolute',
    borderRadius: 5
  },
  text4: {
    top: 308.74,
    left: '15.67%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text5: {
    top: 278.59,
    left: '15.67%',
    color: '#121212',
    position: 'absolute'
  },
  rect4: {
    top: 361.85,
    width: '81.79673936631944%',
    height: 36.31,
    backgroundColor: '#eb1c24',
    position: 'absolute',
    borderRadius: 5
  },
  text6: {
    top: 342.85,
    left: '15.67%',
    color: '#121212',
    position: 'absolute'
  },
  text7: {
    top: 372.01,
    left: '15.67%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  materialButtonViolet6: {
    top: '81.69%',
    left: '32.53%',
    width: '39.914610120985245%',
    height: 36,
    backgroundColor: '#4a4a4a',
    position: 'absolute',
    borderRadius: 5
  },
  materialButtonViolet7: {
    top: '88.06%',
    left: '32.53%',
    width: '39.914610120985245%',
    height: 36,
    backgroundColor: '#a1a1a1',
    position: 'absolute',
    borderRadius: 5
  },
  text8: {
    top: 455.85,
    left: '9.1%',
    color: '#121212',
    position: 'absolute'
  },
  text9: {
    top: 455.85,
    left: '20.94%',
    color: '#121212',
    position: 'absolute'
  },
  text10: {
    top: 455.85,
    left: '68.2%',
    color: '#121212',
    position: 'absolute'
  },
  text11: {
    top: 483.36,
    left: '10.91%',
    color: '#121212',
    position: 'absolute'
  },
  text12: {
    top: 483.36,
    left: '20.94%',
    color: '#121212',
    position: 'absolute'
  },
  text13: {
    top: 483.36,
    left: '68.12%',
    color: '#121212',
    position: 'absolute'
  },
  text14: {
    top: 507.51,
    left: '10.62%',
    color: '#121212',
    position: 'absolute'
  },
  text15: {
    top: 507.51,
    left: '20.94%',
    color: '#121212',
    position: 'absolute'
  },
  text16: {
    top: 507.51,
    left: '72.55%',
    color: '#121212',
    position: 'absolute'
  }
})
