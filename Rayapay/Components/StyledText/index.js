import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts } from '../../Themes'
import styles from './styles'
import { insertSpace, isAndroid } from '../../Lib/helper/spaceInsertor'
import I18n from '../../I18n'

export default class StyledText extends Component {
  // // Prop type warnings
  static propTypes = {
    addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    children: PropTypes.node,
    ellipse: PropTypes.string,
    i18nKey: PropTypes.string,
    i18nValue: PropTypes.object,
    isTextValueOveri18n: PropTypes.bool,
    isUnderline: PropTypes.bool,
    lines: PropTypes.number,
    onPress: PropTypes.func,
    textStyle: PropTypes.string,
    upperCase: PropTypes.bool,
    wrapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  }
  //
  // // Defaults for props
  static defaultProps = {
    letterSpacing: 0,
    isUnderline: false
  }

  render () {
    const props = this.props
    const textMessage = I18n.t
    const fontStyle = Fonts.style
    const styling = fontStyle[props.textStyle] || fontStyle['h4MedWhiteP'] || {props: {}}
    styling['props'] = styling['props'] || {}
    const underline = props.isUnderline && <View style={styles.textUnderline} />
    let children = props.i18nKey
      ? textMessage(props.i18nKey, props.i18nValue)
      : props.children
    if (props.isTextValueOveri18n) {
      children = props.children
    } else if (props.i18nKey) {
      children = textMessage(props.i18nKey, props.i18nValue)
    } else {
      children = props.children
    }
    if (styling.props.letterSpacing && isAndroid()) {
      children = insertSpace(children, styling.props.letterSpacing)
    }
    if (props.upperCase) {
      children = children && children.toUpperCase()
    }
    return (
      <View style={props.wrapStyle}>
        <Text
          onPress={props.onPress}
          style={[styles.transparentText, styling.style, props.addedStyle]}
          letterSpacing={styling.props.letterSpacing}
          lineHeight={styling.props.lineHeight}
          allowFontScaling={false}
          ellipsizeMode={props.ellipse}
          numberOfLines={props.lines}
        >
          {children}
        </Text>
        {underline}
      </View>
    )
  }
}
