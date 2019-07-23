import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import styles from './styles'
import {Colors} from '../../Themes'

export default class Spinner extends Component {
  // // Prop type warnings
  static propTypes = {
    addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    size: PropTypes.string
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { size, addedStyle } = this.props
    return (
      <View style={[styles.spinnerStyle, addedStyle]}>
        <ActivityIndicator size={size || 'large'} color={Colors.redPrimary} />
      </View>
    )
  }
}
