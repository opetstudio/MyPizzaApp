import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { isNull, isUndefined } from 'lodash';
import {
  checkIsCurrentTimeBetween,
  convertLocalTimeZone,
} from '../../utils/helper/dateHelper';
import PropTypes from 'prop-types';
import Badge from 'components/Badge';
import StyledText from '../StyledText';
import { styles } from './styles';
import ImageWithDefault from '../ImageWithDefault';
import CopyRight from '../CopyRight';
import { generateImageURL } from '../../utils/helper/imageUrlGenerator';
import StyledTouchableOpacity from 'components/StyledTouchableOpacity';

const propTypes = {
  categoryi18nKey: PropTypes.string,
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  onPress: PropTypes.func,
  orientation: PropTypes.string,
  providerName: PropTypes.string,
  wcmsUrl: PropTypes.string,
};

export default class CarousalItem extends PureComponent {
  render() {
    const {
      categoryi18nKey,
      item,
      onPress,
      locale,
      orientation,
      providerName,
      wcmsUrl,
    } = this.props;
    const isCopyrightVisible =
      orientation === 'landscape'
        ? !isNull(item.copyright_landscape) &&
          !isUndefined(item.copyright_landscape)
        : !isNull(item.copyright_portrait) &&
          !isUndefined(item.copyright_portrait);
    const images = (item && item.images) || '';
    const imageUrl = generateImageURL(images, wcmsUrl, 'carousel', orientation);

    if (item === 'ghost') {
      return <View style={styles.itemWidth} />;
    }
    const freeStatus = item && parseInt(item.freeTrial);
    const currentTime = new Date();
    const startTime = item && item.start_time && item.start_time * 1000;
    const localStartTime =
      item && item.start_time && convertLocalTimeZone(item.start_time);
    const endTime = item && item.end_time && item.end_time * 1000;
    const isLive =
      !freeStatus &&
      startTime &&
      endTime &&
      checkIsCurrentTimeBetween(startTime, endTime);
    const isReplay =
      !freeStatus &&
      startTime &&
      endTime &&
      currentTime >= endTime &&
      currentTime >= startTime;
    const isUpcoming =
      !freeStatus && startTime && endTime && currentTime <= startTime;
    const live = <Badge i18nKey="live" hidden={!isLive} locale={locale} />;
    const upcoming = (
      <Badge i18nKey="upcoming" hidden={!isUpcoming} locale={locale} />
    );
    const replay = (
      <Badge i18nKey="replay" hidden={!isReplay} locale={locale} />
    );
    const free = (
      <Badge i18nKey="free" hidden={!(freeStatus === 1)} locale={locale} />
    );
    const justEnded = (
      <Badge i18nKey="justended" hidden={!isReplay} locale={locale} />
    );
    if (categoryi18nKey === 'replay-highlight-matches' && !isReplay) {
      return null;
    }
    const _onClick = () => onPress(item.id || item.contentId);
    return (
      <View
        style={
          orientation === 'landscape' ? styles.landscapeItem : styles.itemWidth
        }
      >
        <StyledTouchableOpacity onPress={_onClick}>
          <ImageWithDefault
            style={
              orientation === 'landscape'
                ? styles.landscapeStyle
                : styles.thumbnailStyle
            }
            imageUrl={imageUrl.url}
            defaultImage={
              orientation === 'landscape'
                ? require('../../assets/default_image/banner_landscape/banner_landscape.png')
                : require('../../assets/default_image/carousal/carousal.png')
            }
          >
            <View style={styles.badgeContainer}>{free}</View>
            {categoryi18nKey === 'live-upcoming-matches' ? (
              <View style={styles.badgeContainer}>
                {live}
                {upcoming}
                {justEnded}
              </View>
            ) : null}
            {categoryi18nKey === 'replay-highlight-matches' ? (
              <View style={styles.badgeContainer}>{replay}</View>
            ) : null}
            {isCopyrightVisible && (
              <CopyRight
                text={
                  orientation === 'landscape'
                    ? item.copyright_landscape
                    : item.copyright_portrait
                }
                orientation={
                  orientation === 'landscape' ? 'landscape' : 'portrait'
                }
              />
            )}
          </ImageWithDefault>
          <StyledText
            textStyle="h5MedWhiteP"
            addedStyle={styles.itemTitle}
            lines={1}
            ellipse="tail"
          >
            {item.title}
          </StyledText>
          {item.start_time && (
            <StyledText
              textStyle="h7MedGreyS"
              addedStyle={styles.itemContentProvider}
              lines={1}
              ellipse="tail"
            >
              {localStartTime}
            </StyledText>
          )}
          {providerName && (
            <StyledText
              textStyle="h14MedGreyS"
              addedStyle={styles.itemContentProvider}
              lines={1}
              ellipse="tail"
            >
              {providerName}
            </StyledText>
          )}
        </StyledTouchableOpacity>
      </View>
    );
  }
}

CarousalItem.propTypes = propTypes;
