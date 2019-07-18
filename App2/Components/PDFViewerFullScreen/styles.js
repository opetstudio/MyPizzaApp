import { StyleSheet, Platform } from 'react-native'
import {Metrics} from '../../Themes'

const screenWidth = Metrics.screenWidth
const screenHeight = Metrics.screenHeight

const width = screenWidth
const height = screenHeight

// for landscape screen
export const LANDSCAPE_WIDTH = width
export const LANDSCAPE_HEIGHT = height

export const SCREEN_LANDSCAPE_WIDTH = screenWidth
export const SCREEN_LANDSCAPE_HEIGHT = screenHeight

const MAX_PLAYER_PAGE_SIZE = 2000

/* for iPhone X */

const MOVE_LEFT_MINIMUM_SAFE_AREA_PADDING = -44

// Height of iPhoneX : 812
// Height of iPhone 6: 667
// (812 - 667) / 2 = 72.5
const SAFE_AREA_PADDING = 72.5
const NEGATIVE_SAFE_AREA_PADDING = -72.5

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // height: LANDSCAPE_HEIGHT,
    // width: LANDSCAPE_WIDTH,
    backgroundColor: '#fff'
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'blue'
  },
  backgroundContainer: {
    // flex: 1,
    position: 'absolute',
    // height: LANDSCAPE_HEIGHT,
    // width: LANDSCAPE_WIDTH,
    backgroundColor: 'red'
  },
  backgroundPageContainer: {
    position: 'absolute',
    // height: MAX_PLAYER_PAGE_SIZE,
    // width: MAX_PLAYER_PAGE_SIZE,
    backgroundColor: '#000'
  },
  iphoneXBackgroundContainer: {
    top: 0
    // left: MOVE_LEFT_MINIMUM_SAFE_AREA_PADDING
  },
  upperLayer: {
    // flex: 1,
    position: 'absolute',
    height: LANDSCAPE_HEIGHT,
    width: LANDSCAPE_WIDTH,
    backgroundColor: 'yellow'
  },
  iphoneXUpperLayer: {
    top: 0,
    // left: SAFE_AREA_PADDING
  },
  header: {
    position: 'absolute',
    height: 45
  },
  player: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    backgroundColor: '#000'
    // height: LANDSCAPE_HEIGHT,
    // width: LANDSCAPE_WIDTH
  },
  backButtonIcon: {
    width: 20,
    height: 20
  },
  searchButtonIcon: {
    width: 30,
    height: 30
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: (25 * 3) / 2,
    top: 10,
    left: 10
  },
  pageButton: {
    position: 'absolute',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: (20 * 3) / 2,
    top: 10,
    right: 10
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
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    color: '#fff',
    // height: Math.max(Platform.OS === 'ios' ? 40 : 45, (this.state || {}).inputHeight || 0),
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    marginLeft: 15,
    marginBottom: Platform.OS === 'android' ? 0 : 0,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    // paddingBottom: Platform.OS === 'android' ? 4 : 0,
    paddingBottom: 6,
    // backgroundColor: '#cdcdcd'
  }
})
