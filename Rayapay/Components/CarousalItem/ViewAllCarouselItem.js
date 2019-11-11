import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'
import StyledText from '../StyledText'
import { dimensions, styles } from './styles'
import StyledTouchableOpacity from '../StyledTouchableOpacity'
import {Images} from '../../Themes'

export const ViewAllCarousalItem = ({ onPress, orientation, circleImage }) => {
  let prevTimeStamp = 0
  const onPressHandler = () => {
    const currentTimeStamp = new Date().getTime()
    if (currentTimeStamp - prevTimeStamp > 2000) {
      prevTimeStamp = currentTimeStamp
      return void onPress()
    }
    return null
  }
  const isCircleImage = !!parseInt(circleImage)

  const getHeight = () => {
    return orientation === 'landscape'
      ? dimensions.landscapeImageHeight
      : dimensions.portraitImageHeight
  }

  const getCircleLayout = () => {
    return styles.circleImageContainerStyle
  }

  return (
    <View
      style={[
        styles.viewAllContainer,
        getHeight(),
        isCircleImage ? getCircleLayout() : {}
      ]}
    >
      <StyledTouchableOpacity
        style={styles.viewAllBackground}
        onPress={onPressHandler}
      >
        <StyledText i18nKey='dashboard-view-more' textStyle='h5RegGreyS2' />
        <Image
          style={styles.nextIcon}
          source={Images.nextArrow}
        />
      </StyledTouchableOpacity>
    </View>
  )
}

ViewAllCarousalItem.propTypes = {
  onPress: PropTypes.func,
  orientation: PropTypes.string
}
