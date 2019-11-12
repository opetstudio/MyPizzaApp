import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
// import styles from './Styles/StyledTouchableOpacityStyle'
import { setPrevTarget, getPrevTarget } from '../../Lib/helper/clickHelper'

export default class StyledTouchableOpacity extends Component {
  // // Prop type warnings
  static propTypes = {
    activeOpacity: PropTypes.number,
    behavior: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    isMultipleTapAllowed: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const {
      onPress,
      children,
      style,
      behavior,
      activeOpacity,
      isMultipleTapAllowed,
      disabled
    } = this.props

    let prevTimeStamp = 0 // this tracks of the last click
    const onPressHandler = e => {
      const currentTimeStamp = e.nativeEvent.timestamp
      const currentTarget = e.nativeEvent.target
      const isFastClick = currentTimeStamp - prevTimeStamp <= 2000
      const isSameTarget = currentTarget === getPrevTarget()
      if (
        // all fast click will be ignored
        !isFastClick &&
        // this implies that if multiple-tap is disallowed, clicking the same button would be ignored
        (isMultipleTapAllowed || !isSameTarget)
      ) {
        prevTimeStamp = currentTimeStamp
        setPrevTarget(currentTarget)
        return void onPress()
      }
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={activeOpacity}
        behavior={behavior}
        onPress={onPressHandler}
        style={style}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
