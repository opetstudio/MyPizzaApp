import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { styles } from './styles'
import CarousalItem from './Base'

const propTypes = {
  accessCode: PropTypes.object,
  addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  circleSize: PropTypes.number,
  disabled: PropTypes.bool,
  horizontalGap: PropTypes.number,
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  loggedInStatus: PropTypes.bool,
  onPress: PropTypes.func,
  provider: PropTypes.object,
  subscriptions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  verticalGap: PropTypes.number,
  wcmsUrl: PropTypes.string
}

class ChannelCarousalItem extends Component {
  render () {
    const {
      addedStyle = {},
      circleSize,
      disabled,
      item,
      onPress,
      provider,
      wcmsUrl
    } = this.props

    const sizeStyle = circleSize
      ? {
        width: circleSize,
        height: circleSize
      }
      : {}

    const borderRadiusStyle = circleSize
      ? {
        borderRadius: circleSize / 2
      }
      : {}

    return (
      <CarousalItem
        disabled={disabled}
        item={item}
        provider={provider}
        imageStyle={[styles.circleImageStyle, sizeStyle, borderRadiusStyle]}
        innerStyle={[styles.circleImageInnerContainerStyle, sizeStyle]}
        itemStyle={[styles.circleImageContainerStyle, sizeStyle, addedStyle]}
        onPress={onPress}
        wcmsUrl={wcmsUrl}
        orientation={'landscape'}
      />
    )
  }
}

ChannelCarousalItem.propTypes = propTypes

export default ChannelCarousalItem
