import { StyleSheet } from 'react-native'
import { Colors as colors, Metrics } from '../../Themes'

const width = Metrics.screenWidth

const ITEM_WIDTH = width <= 320 ? 85 : 99
const ITEM_HEIGHT = width <= 320 ? 175 : 200
const ITEM_HEIGHT_SMALL = width <= 320 ? 116 : 144
const CIRCLE_SIZE = width <= 320 ? 82 : 88
const CIRCLE_GAP = 10

export const dimensions = StyleSheet.create({
  landscapeImageHeight: {
    height: 113
  },

  portraitImageHeight: {
    height: ITEM_HEIGHT_SMALL
  },

  circleHeight: {
    height: CIRCLE_SIZE
  }
})

export const styles = StyleSheet.create({
  itemWidth: {
    marginRight: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT
  },
  landscapeItem: {
    marginRight: 8,
    width: 200,
    height: 175
  },
  thumbnailStyle: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT_SMALL,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  landscapeStyle: {
    width: 200,
    height: 113,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  defaultImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  providerStyle: {
    fontSize: 14
  },
  itemTitle: {
    paddingTop: 10,
    height: 38 // two lines no matter how long the text is
  },
  itemSubtitle: {
    paddingTop: 4
  },
  viewAllContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: CIRCLE_SIZE,
    flexDirection: 'row',
    marginHorizontal: CIRCLE_GAP / 2
  },
  viewAllBackground: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 50,
    backgroundColor: colors.darkGreyPrimary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeContainer: {
    zIndex: 5,
    marginLeft: 5,
    marginTop: 5,
    alignSelf: 'flex-start'
  },
  nextIcon: {
    tintColor: colors.redPrimary,
    marginTop: 5
  },
  defaultImage: {
    width: 40
  },
  circleImageContainerStyle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: CIRCLE_GAP / 2
  },
  circleImageStyle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // CIRCLE_SIZE/2 makes it a circle, less than this => rounded rectangle, larger than this => over-rounded circle
    borderRadius: CIRCLE_SIZE / 2,
    resizeMode: 'cover'
  },
  circleImageInnerContainerStyle: {
    backgroundColor: colors.whiteTertiary,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 100
  },
  circleButtonStyle: {
    overflow: 'hidden' // FIXME: cannot remove touchable area outside the circle
  },
  providerLogo: {
    height: 20,
    width: 60,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
})
