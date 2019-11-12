/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */
import React from 'react'
import PropTypes from 'prop-types'
import StyledText from '../StyledText'
import { styles } from './styles'
import StyledTouchableOpacity from '../StyledTouchableOpacity'

const propTypes = {
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

/*
 Various props values

 type:
 - Primary: for primary button styling
 - Link: Link type button

 isActive:
 - true: applies active button styling and allows user to press the button
 - false: applies button type with inactive styling and disables the button press

 noFeedack:
 - true: takes opacity of 1 giving no feedback on button click
 - false: takes default opacity of 0.2

 */
const Button = ({
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
}) => {
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
  } else if (type === 'tab') {
    return (
      <StyledTouchableOpacity
        disabled={isInactive}
        onPress={onPress}
        style={[styles.button, typedStyle, addedStyle]}
        isMultipleTapAllowed
      >
        <StyledText
          textStyle={isInactive ? 'h12MedWhiteT3O' : 'h12MedWhiteT3'}
          i18nKey={i18nKey}
          upperCase={upperCase}
        >
          {children}
        </StyledText>
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

Button.propTypes = propTypes

export default Button
