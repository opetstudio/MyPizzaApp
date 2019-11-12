import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { find, toString } from 'lodash'
import PropTypes from 'prop-types'

import CarouselSection from './CarouselSection'

import { generateImageURL } from '../../Lib/helper/imageUrlGenerator'
import { textMessage } from '../../Lib/helper/languageSelector'
import StyledText from '../../Components/StyledText'
import { styles } from './styles'

export default class CardCarousels extends PureComponent {
  render () {
    const {
      config,
      data,
      isLiveEvents,
      liveError,
      locale,
      onItemPress,
      onClickMoreCategory,
      onClickMoreGenre,
      providers,
      showPopup,
      wcmsUrl
    } = this.props

    if (data.length === 0) {
      const i18nKey = liveError ? 'content-not-there-2' : 'content-not-there-1'
      return (
        <View style={styles.noContentMessage}>
          <StyledText testStyle='h1LtWhiteT' i18nKey={i18nKey} />
        </View>
      )
    }

    return (
      <View>
        {data.map(category => {
          const title = find(config, {
            tid: toString(category.resourceId)
          })
          const i18nTitleKey =
            category.i18nkey || (title && title.i18nKey) || ''
          const i18nTitleValue = {
            item: title ? textMessage(title.i18nKey) : ''
          }

          const iconImage = title && title.images
          //orientation yet to be defined in the API's
          //will be used for telling if the carousel will be potrait or landscape
          const orientation = title && title.orientation
          const url =
            generateImageURL(iconImage, wcmsUrl, 'images').url || null
          const navigateToMore = () => {
            if (category.type === 'categories') {
              onClickMoreCategory(
                category.resourceId,
                null,
                true,
                isLiveEvents
              ) // show items in sibling categories, isLiveEvents will be TRUE for live event tab
            } else {
              onClickMoreGenre(category.resourceId)
            }
          }
          const isChannel = !!parseInt(category.circleImage)

          if (isChannel) {
            category.displayMore = true
          }

          return (
            <CarouselSection
              circleImage={category.circleImage}
              i18nTitleInfo={i18nTitleKey}
              i18nValue={i18nTitleValue}
              icon
              iconImage={url}
              items={category}
              key={category.resourceId}
              locale={locale}
              onMorePress={navigateToMore}
              onPress={onItemPress}
              orientation={orientation}
              providers={providers}
              showPopup={showPopup}
              wcmsUrl={wcmsUrl}
            />
          )
        })}
      </View>
    )
  }
}

CardCarousels.propTypes = {
  config: PropTypes.array,
  data: PropTypes.array,
  locale: PropTypes.string,
  onClickMoreCategory: PropTypes.func.isRequired,
  onClickMoreGenre: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired,
  providers: PropTypes.array,
  showPopup: PropTypes.func,
  wcmsUrl: PropTypes.string
}
