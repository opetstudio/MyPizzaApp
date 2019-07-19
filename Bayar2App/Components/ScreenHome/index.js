import React from 'react'
import {View, StyleSheet, ScrollView, Image} from 'react-native'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Images, Metrics } from '../../Themes'

import PrimaryButton from '../Button/PrimaryButton'

class ScreenHome extends React.PureComponent {
  static propTypes = {
    sessionToken: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    sessionLogout: PropTypes.func.isRequired
  }
  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate ===> prevProps=', prevProps)
    if (this.props.sessionToken !== null && !_.isEqual(prevProps.sessionToken, this.props.sessionToken) && this.props.sessionToken === '') {
      this.props.navigation.navigate('unloggedinNavigator')
    }
  }
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
            <PrimaryButton title={'LOGOUT'} onPress={() => this.props.sessionLogout()} />
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

export default ScreenHome
