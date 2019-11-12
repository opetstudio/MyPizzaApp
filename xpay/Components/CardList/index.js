import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { isEmpty, isNull, isUndefined } from 'lodash'
import Swiper from 'react-native-page-swiper' // eslint-disable-line import/default
import LinearGradient from 'react-native-linear-gradient'
import { Colors as colors, Images } from '../../Themes'
import { styles, containerHeight } from './styles'
import { generateImageURL } from '../../Lib/helper/imageUrlGenerator'
import { getMatchStatus } from '../../Lib/helper/contentCurator'
import Badge from '../Badge'

import ImageWithDefault from '../ImageWithDefault'

export default class index extends Component {
  constructor (props) {
    super(props)
    this.state = { activeTrending: 0 }
    this._renderItem = this._renderItem.bind(this)
  }
  _renderItem (item, index) {
    const { onItemPress, rootURL } = this.props
    const url = generateImageURL(item.images, rootURL, 'banner').url || null
    let prevTimeStamp = 0
    const onPressHandler = e => {
      const currentTimeStamp = e.nativeEvent.timestamp
      if (currentTimeStamp - prevTimeStamp > 2000 || prevTimeStamp === 0) {
        prevTimeStamp = currentTimeStamp
        return void onItemPress(item.id)
      }
      return null
    }
    const { start_time: startTime, end_time: endTime } = item
    const matchStatus =
      startTime && endTime && getMatchStatus(startTime, endTime)
    return (
      <View key={index} style={styles.trendingImageContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={onPressHandler}
        >
          <ImageWithDefault
            style={styles.trendingImage}
            imageUrl={url}
            defaultImage={Images.defaultImageBanner}
           >
            <LinearGradient
                // using 'locations' as a workaround - 'start', 'end' attributes not working
              locations={[0, 0.72, 1]}
              colors={[
                colors.transparent,
                colors.transparent,
                colors.blackPrimary
              ]}
              style={styles.linearGradient}
                />
          </ImageWithDefault>
          <View style={styles.titleContainer}>
            <View style={styles.badgeContainer}>
              {matchStatus && <Badge i18nKey={matchStatus} />}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    const { items } = this.props
    const sortedItems = items
    const swiperSection = (
      <Swiper
        activeDotColor={colors.redPrimary}
        activeDotStyle={styles.activeDotStyle}
        autoplay
        autoplayTimeout={10}
        dotColor={colors.whitePrimary}
        dotStyle={styles.dotStyle}
        height={containerHeight}
        paginationStyle={styles.paginationStyle}
        removeClippedSubviews
        >
        {sortedItems.map(this._renderItem)}
      </Swiper>
      )
    return <View>{!isEmpty(items) && swiperSection}</View>
  }
}
