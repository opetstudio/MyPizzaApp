import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles, {overlayStyle} from './styles'
import Spinner from '../Spinner'

export default class StyledView extends Component {
  // // Prop type warnings
  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const props = this.props
    return (
      <View style={[styles.container, props.style]} behavior='height'>
        {props.children}
        {props.isLoading && (
          <View style={overlayStyle.container}>
            <Spinner />
          </View>
        )}
      </View>
    )
  }
}
