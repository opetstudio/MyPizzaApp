import React, { Component } from 'react'
import {View} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import PropTypes from 'prop-types'

import styles from './styles'

export default class SafeArea extends Component {
  static propTypes = {
    navigator: PropTypes.node
  }
  render () {
    return (
      <SafeAreaView style={{ flex: 1, paddingBottom: 0 }} forceInset={{ bottom: 'never', top: 'never' }}>
        {this.props.navigator}
        {/* {<View style={styles.fixBackgroundTop} />} */}
      </SafeAreaView>
    )
  }
}
