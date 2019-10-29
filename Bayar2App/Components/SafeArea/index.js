import React, { Component } from 'react'
import {SafeAreaView} from 'react-navigation'
import {View} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default class SafeArea extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        {this.props.children}
        {<View style={styles.fixBackgroundTop} />}
      </SafeAreaView>
    )
  }
}
