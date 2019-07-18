import React from 'react'
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native'
import {Images,Metrics} from '../../Themes'

import PrimaryButton from '../Button/PrimaryButton'

class ScreenOnboard extends React.PureComponent {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Image source={Images.landingPageBan} style={styles.banner} />
          </View>
          <View style={styles.centered}>
            <Image source={Images.logoBayar2} style={styles.logo} />
          </View>
          <View style={{marginTop: 30}}>
            <PrimaryButton colors={'gradient'} onPress={() => this.props.navigation.navigate('ScreenLogin')} title={'LOGIN'} />
            <PrimaryButton title={'SIGNUP'} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  banner: {
    height: Metrics.images.large,
    marginLeft: 50,
    marginRight: 50,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
})

export default ScreenOnboard
