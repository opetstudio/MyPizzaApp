import React, { Component } from 'react'
import { StatusBar, View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { isAndroid } from '../../Lib/helper/platform'

import styles from './styles'

export class StyledStatusBar extends Component {
  render () {
    const { backgroundColor, isHidden, ...props } = this.props
    if (isAndroid && Platform.Version < 20) {
      StatusBar.setHidden(true)
      return null
    }
    if (isHidden) {
      StatusBar.setHidden(true)
      return null
    } else {
      StatusBar.setHidden(false)
      return (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      )
    }
  }
}

StyledStatusBar.propTypes = {
  backgroundColor: PropTypes.string
}

export default StyledStatusBar
