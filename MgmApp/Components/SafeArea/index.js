import React, { Component } from 'react'
import {SafeAreaView} from 'react-navigation'
import {View} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

class SafeArea extends Component {
  // static propTypes = {
  //   navigator: PropTypes.node
  // }
  render () {
    return (
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        {this.props.navigator}
        {<View style={styles.fixBackgroundTop} />}
      </SafeAreaView>
    )
  }
}

export default SafeArea
