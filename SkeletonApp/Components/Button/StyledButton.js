import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './styles'
import StyledText from '../StyledText'
import StyledTouchableOpacity from '../StyledTouchableOpacity'

export default class StyledButton extends Component {
  // // Prop type warnings
  static propTypes = {
    addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    addedTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    children: PropTypes.node,
    i18nKey: PropTypes.string,
    isInactive: PropTypes.bool,
    noFeedback: PropTypes.bool,
    onPress: PropTypes.func,
    textStyle: PropTypes.string,
    type: PropTypes.string,
    upperCase: PropTypes.bool
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
      type,
      addedStyle,
      addedTextStyle,
      isInactive,
      i18nKey,
      upperCase,
      noFeedback,
      textStyle
    } = this.props

    const typedStyle = isInactive ? styles[`${type}Inactive`] : styles[type]
    if (type === 'link') {
      return (
        <StyledTouchableOpacity
          activeOpacity={noFeedback ? 1 : 0.2}
          onPress={onPress}
          style={[styles.link, addedStyle]}
        >
          <StyledText
            addedStyle={[styles.text, addedTextStyle]}
            textStyle={textStyle || 'h11MedRedP'}
            i18nKey={i18nKey}
            upperCase={upperCase}
          >
            {children}
          </StyledText>
        </StyledTouchableOpacity>
      )
    } else if (type === 'withImage') {
      return (
        <StyledTouchableOpacity
          activeOpacity={noFeedback ? 1 : 0.2}
          onPress={onPress}
          style={[styles.button, addedStyle]}
        >
          {children}
        </StyledTouchableOpacity>
      )
    }
    return (
      <StyledTouchableOpacity
        disabled={isInactive}
        onPress={onPress}
        style={[styles.button, typedStyle, addedStyle]}
        isMultipleTapAllowed
      >
        <StyledText
          textStyle={isInactive ? 'h11MedWhiteT3O' : 'h11MedWhiteT3'}
          i18nKey={i18nKey}
          upperCase={upperCase}
        >
          {children}
        </StyledText>
      </StyledTouchableOpacity>
    )
  }
}
