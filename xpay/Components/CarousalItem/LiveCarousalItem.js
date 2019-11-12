import React, { PureComponent } from 'react'
import { convertLocalTimeZone } from '../../Lib/helper/dateHelper'
import { getMatchStatus } from '../../Lib/helper/contentCurator'
import PropTypes from 'prop-types'
import Badge from '../Badge'
import { styles } from './styles'
import StyledText from '../StyledText'

import CarousalItem from './Base'

const propTypes = {
  addedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  onPress: PropTypes.func,
  orientation: PropTypes.string,
  playButton: PropTypes.node,
  provider: PropTypes.object,
  simipfied: PropTypes.bool,
  wcmsUrl: PropTypes.string
}

const renderStartTime = text => {
  if (!text) {
    return null
  }

  return (
    <StyledText textStyle='h7MedGreyS' lines={1} ellipse='tail'>
      {text}
    </StyledText>
  )
}

const renderBadge = (item, provider, locale) => {
  if (!provider) {
    return null
  }
  const status = getMatchStatus(item.start_time, item.end_time, provider.name)
  if (status === 'none') {
    return null
  }
  return <Badge i18nKey={status} locale={locale} />
}

export default class LiveCarousalItem extends PureComponent {
  render () {
    const {
      addedStyle = {},
      item,
      locale,
      onPress,
      orientation,
      provider,
      wcmsUrl
    } = this.props
    const isLandscape = orientation === 'landscape'

    return (
      <CarousalItem
        badge={renderBadge(item, provider, locale)}
        imageStyle={isLandscape ? styles.landscapeStyle : styles.thumbnailStyle}
        innerStyle={isLandscape ? styles.landscapeStyle : styles.thumbnailStyle}
        item={item}
        itemStyle={[
          isLandscape ? styles.landscapeItem : styles.itemWidth,
          addedStyle
        ]}
        onPress={onPress}
        orientation={orientation}
        title={item.title}
        wcmsUrl={wcmsUrl}
        provider={provider}
      >
        {renderStartTime(convertLocalTimeZone(item.start_time))}
      </CarousalItem>
    )
  }
}

LiveCarousalItem.propTypes = propTypes
