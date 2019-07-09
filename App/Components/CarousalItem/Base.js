import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImageWithDefault from '../ImageWithDefault'
import StyledText from '../StyledText'
import StyledTouchableOpacity from '../StyledTouchableOpacity'

import { generateImageURL } from '../../Lib/helper/imageUrlGenerator'
import { checkEntitled } from '../../Lib/helper/contentCurator'

import { styles } from './styles'
import { isArray, isEmpty, pick } from 'lodash'
import {Colors as colors, Images} from '../../Themes'

const propTypes = {
  accessCode: PropTypes.object,
  badge: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  imageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  imageUrl: PropTypes.string,
  innerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  itemStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  onPress: PropTypes.func,
  orientation: PropTypes.string,
  playButton: PropTypes.node,
  provider: PropTypes.object,
  title: PropTypes.string,
  wcmsUrl: PropTypes.string
}
const defaultProps = {
  accessCode: {}
}

const renderTitle = text => {
  if (!text) {
    return null
  }
  return (
    <StyledText
      textStyle='h5MedWhiteP'
      addedStyle={styles.itemTitle}
      lines={2}
      ellipse='tail'
    >
      {text}
    </StyledText>
  )
}

const getDefaultImage = orientation => {
  const landscapeDefault = Images.defaultImageBannerLandscape
  const portraitDefault = Images.defaultImageCarousal

  return orientation === 'landscape' ? landscapeDefault : portraitDefault
}

const getImageUrl = (item, orientation, wcmsUrl) => {
  const images = (item && item.images) || ''
  const imageObj = generateImageURL(images, wcmsUrl, 'carousel', orientation)

  if (imageObj && imageObj.url) {
    return imageObj.url
  }

  return ''
}

const renderProviderLogo = (provider, wcmsUrl) => {
  if (!provider) {
    return null
  }
  const images = (provider && provider.images) || ''
  const imageObj = generateImageURL(images, wcmsUrl, 'images')

  if (!imageObj.url) {
    return null
  }
  return <Image source={{ uri: imageObj.url }} style={styles.providerLogo} />
}

export const GhostItem = ({ isCircle, circleSize, addedStyle }) => {
  if (isCircle) {
    return (
      <View style={[{ width: circleSize, height: circleSize }, addedStyle]} />
    )
  } else {
    return <View style={[styles.itemWidth, addedStyle]} />
  }
}

class Base extends PureComponent {
  render () {
    const {
      accessCode,
      badge,
      disabled = false,
      imageStyle,
      innerStyle,
      item,
      itemStyle,
      onPress,
      orientation,
      title,
      wcmsUrl,
      provider,
      children,
      playButton = null
    } = this.props

    const _onClick = () => onPress(item.id || item.contentId)
    // Provider name to be lowercase for dim to work
    const accessCodeForContent =
      accessCode[provider.name.toLowerCase()] || accessCode.default
    const isEntitled = checkEntitled(accessCodeForContent, item.access)
    /**
     * Handle dim style.
     *
     * Directly use the width, height and borderradius past from parent components.
     * Then append the overlay style.
     *
     * imageStyle[1] is the circle image size past from parent component.
     * imageStyle[2] is the border radius past from the parent component.
     * **/
    const overLay = {
      backgroundColor: colors.blackSecondaryOpacity,
      position: 'absolute'
    }
    let overlayLocalStyle = {}
    if (
      isArray(imageStyle) &&
      !isEmpty(imageStyle[1]) &&
      !isEmpty(imageStyle[2])
    ) {
      overlayLocalStyle = {
        ...imageStyle[1],
        ...imageStyle[2],
        ...overLay
      }
    } else if (isArray(imageStyle) && imageStyle.length > 0) {
      overlayLocalStyle = {
        ...pick(StyleSheet.flatten(imageStyle[0]), [
          'width',
          'height',
          'borderRadius'
        ]),
        ...pick(StyleSheet.flatten(imageStyle[1]), [
          'width',
          'height',
          'borderRadius'
        ]),
        ...overLay
      }
    } else if (imageStyle) {
      overlayLocalStyle = {
        ...StyleSheet.flatten(imageStyle),
        ...overLay
      }
    }
    return (
      <View style={itemStyle}>
        <StyledTouchableOpacity disabled={disabled} onPress={_onClick}>
          <ImageWithDefault
            style={innerStyle}
            imageStyle={imageStyle}
            imageUrl={getImageUrl(item, orientation, wcmsUrl)}
            defaultImage={getDefaultImage(orientation)}
          >
            <View style={styles.badgeContainer}>{badge}</View>
            {renderProviderLogo(provider, wcmsUrl)}
            {!isEntitled && <View style={overlayLocalStyle} />}
            {isEntitled && playButton}
          </ImageWithDefault>
          {renderTitle(title)}
          {children}
        </StyledTouchableOpacity>
      </View>
    )
  }
}

Base.propTypes = propTypes
Base.defaultProps = defaultProps

export default Base
