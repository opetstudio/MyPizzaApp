import { StyleSheet, Platform } from 'react-native'
import {Colors as colors, Metrics} from '../../Themes'

const width = Metrics.screenWidth

export const containerHeight = width * 9 / 16

export const styles = StyleSheet.create({
  linearGradient: {
    width: width,
    height: '100%',
    bottom: 0,
    opacity: 0.6
  },
  paginationStyle: {
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    bottom: 10
  },
  dotStyle: {
    height: 5,
    width: 5
  },
  activeDotStyle: {
    height: 5,
    width: 5
  },
  trendingImageContainer: {
    ...Platform.select({
      android: {
        flex: 1
      }
    }),
    width,
    backgroundColor: colors.darkGreyPrimary
  },
  trendingImage: {
    width,
    flexDirection: 'row',
    height: width * 9 / 16
  },
  titleContainer: {
    left: 12,
    bottom: 10,
    width: 110,
    position: 'absolute'
  },
  badgeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  container: {
    ...Platform.select({
      android: {
        flex: 1
      }
    })
  },
  trendingTitleWrap: {
    flex: 0,
    backgroundColor: colors.darkNavyBlueTertiary
  },
  trendingTitleSection: {
    flex: 0,
    backgroundColor: colors.darkGreyPrimary
  },
  imageContainer: {
    flex: 1,
    width
  },
  copyRightText: {
    width,
    marginLeft: 0,
    position: 'absolute',
    top: containerHeight - 60
  }
})
