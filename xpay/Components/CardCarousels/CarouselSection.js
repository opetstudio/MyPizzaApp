import React from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { isEmpty, find, get } from 'lodash'
import isUndefined from 'lodash/isUndefined'
import {
  LiveCarousalItem,
  ChannelCarousalItem,
  VodCarousalItem,
  ViewAllCarousalItem
} from '../CarousalItem'

import StyledText from '../StyledText'
import Button from '../Button'
import { styles } from './styles'
// import { BUTTON_I18N_KEYS } from '../Drawer/constants'
import {Images} from '../../Themes'

/**
 * Pass the Prop for the following action:
 * - icon: to get an icon in the header with required padding.
 * - more: to get MORE as title
 */

const propTypes = {
  addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  circleImage: PropTypes.string,
  i18nTitleInfo: PropTypes.string,
  i18nValue: PropTypes.object,
  icon: PropTypes.bool,
  iconImage: PropTypes.string,
  isTextValueOveri18n: PropTypes.bool,
  items: PropTypes.object,
  locale: PropTypes.string,
  noBottomBorder: PropTypes.bool,
  onMorePress: PropTypes.func,
  onPress: PropTypes.func,
  orientation: PropTypes.string,
  providers: PropTypes.array,
  showPopup: PropTypes.func,
  titleInfo: PropTypes.string,
  wcmsUrl: PropTypes.string
}

const defaultProps = {
  i18nTitleInfo: '',
  icon: false,
  isTextValueOveri18n: false,
  items: {},
  providers: [],
  titleInfo: '',
  wcmsUrl: ''
}

const { width } = Dimensions.get('window')
const styleText = width <= 320 ? 'h5MedWhiteP' : 'h4MedWhiteP'
const CarouselSection = props => {
  const {
    addedStyle,
    circleImage,
    i18nTitleInfo,
    i18nValue,
    isTextValueOveri18n,
    items,
    locale,
    noBottomBorder,
    onMorePress,
    onPress,
    orientation,
    providers,
    showPopup,
    titleInfo,
    wcmsUrl
  } = props
  if (!get(items, ['contentItems', 'length'])) {
    return null
  }
  const isChannel = parseInt(circleImage) === 1
  const createItem = item => {
    const { start_time: startTime, end_time: endTime } = item
    const providerObject = find(providers, provider => {
      return item.provider === provider.tid
    })

    if (isChannel) {
      return (
        <ChannelCarousalItem
          key={item.id}
          item={item}
          provider={providerObject}
          onPress={onPress}
          wcmsUrl={wcmsUrl}
          addedStyle={{ left: -4.5 }} // fix offset issue
        />
      )
    } else if (startTime && endTime) {
      return (
        <LiveCarousalItem
          key={item.id}
          item={item}
          onPress={onPress}
          orientation={orientation}
          locale={locale}
          wcmsUrl={wcmsUrl}
          provider={providerObject}
          addedStyle={{ left: -1.6 }} // fix offset issue
        />
      )
    }

    return (
      <VodCarousalItem
        key={item.id}
        item={item}
        onPress={onPress}
        orientation={orientation}
        wcmsUrl={wcmsUrl}
        provider={providerObject}
      />
    )
  }
  const showInfoPopup = () =>
    showPopup({
      title: { template: 'Info' }, // same word in English and Bahasa
      body: { template: 'single-rental-info' },
      actions: [
        {
          name: 'btn-ok'
        }
      ]
    })
  if (isEmpty(items.contentItems)) {
    return <View />
  }
  let prevTimeStamp = 0
  const onMorePressHandler = () => {
    const currentTimeStamp = new Date().getTime()
    if (currentTimeStamp - prevTimeStamp > 2000) {
      prevTimeStamp = currentTimeStamp
      if (isChannel) {
        // props.changeFocus(BUTTON_I18N_KEYS.CHANNELS)
      } else {
        // props.changeFocus(items.resourceId)
      }
      onMorePress()
    }
  }

  const title = (
    <View style={styles.carousalTitle}>
      <StyledText
        textStyle={styleText}
        isUnderline
        isTextValueOveri18n={isTextValueOveri18n}
        i18nKey={i18nTitleInfo}
        i18nValue={i18nValue || {}}
        upperCase
      >
        {!isUndefined(titleInfo) ? titleInfo : ''}
      </StyledText>
      {i18nTitleInfo.indexOf('single-rental') === 0 && (
        <TouchableOpacity style={styles.infoContainer} onPress={showInfoPopup}>
          <Image
            source={Images.info}
            style={styles.infoIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  )

  const moreButton = (
    <Button type='withImage' onPress={onMorePressHandler}>
      <View style={styles.moreButtonView}>
        <StyledText
          i18nKey='dashboard-more'
          textStyle='h13LtGreyS'
          upperCase={false}
          addedStyle={styles.moreText}
        />
        <Image
          source={Images.chevronRight2}
          style={styles.icon}
        />
      </View>
    </Button>
  )
  return (
    <View
      style={[
        styles.carouselWrap,
        noBottomBorder ? { borderBottomWidth: 0 } : {}
      ]}
    >
      <View style={styles.carousalHeader}>
        {title}
        {items.displayMore ? moreButton : null}
      </View>
      <ScrollView
        removeClippedSubviews
        horizontal
        style={[styles.carousel, addedStyle]}
        contentContainerStyle={styles.carouselContainer}
        showsHorizontalScrollIndicator={false}
      >
        {items.contentItems.filter(item => item && item.id).map(createItem)}
      </ScrollView>
    </View>
  )
}

CarouselSection.propTypes = propTypes
CarouselSection.defaultProps = defaultProps

export default CarouselSection
