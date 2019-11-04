import { StyleSheet } from 'react-native'
import {Metrics} from '../../Themes'

const screenWidth = Metrics.screenWidth
const screenHeight = Metrics.screenHeight

const width = screenWidth
const height = screenHeight

// for landscape screen
export const LANDSCAPE_WIDTH = height
export const LANDSCAPE_HEIGHT = width

export const SCREEN_LANDSCAPE_WIDTH = screenHeight
export const SCREEN_LANDSCAPE_HEIGHT = screenWidth

const MAX_PLAYER_PAGE_SIZE = 2000

/* for iPhone X */

const MOVE_LEFT_MINIMUM_SAFE_AREA_PADDING = -44

// Height of iPhoneX : 812
// Height of iPhone 6: 667
// (812 - 667) / 2 = 72.5
const SAFE_AREA_PADDING = 72.5
const NEGATIVE_SAFE_AREA_PADDING = -72.5

export const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    height: LANDSCAPE_HEIGHT,
    width: LANDSCAPE_WIDTH,
    backgroundColor: '#000'
  },
  backgroundPageContainer: {
    position: 'absolute',
    height: MAX_PLAYER_PAGE_SIZE,
    width: MAX_PLAYER_PAGE_SIZE,
    backgroundColor: '#000'
  },
  iphoneXBackgroundContainer: {
    top: 0,
    left: MOVE_LEFT_MINIMUM_SAFE_AREA_PADDING
  },
  upperLayer: {
    position: 'absolute',
    height: LANDSCAPE_HEIGHT,
    width: LANDSCAPE_WIDTH,
    backgroundColor: '#000'
  },
  iphoneXUpperLayer: {
    top: 0,
    left: SAFE_AREA_PADDING
  },
  header: {
    position: 'absolute',
    height: 45
  },
  player: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    backgroundColor: '#000',
    height: LANDSCAPE_HEIGHT,
    width: LANDSCAPE_WIDTH
  },
  backButtonIcon: {
    width: 20,
    height: 20
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'flex-start',
    padding: 25
  },
  headerHighlight: {
    position: 'absolute',
    height: 45
  },
  touchPanel: {
    position: 'absolute',
    height: LANDSCAPE_HEIGHT,
    width: LANDSCAPE_WIDTH
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContainer: {
    flex: 1
  },
  iphoneXSpinner: {
    left: NEGATIVE_SAFE_AREA_PADDING
  }
})
