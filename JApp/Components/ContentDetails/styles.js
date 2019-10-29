import { StyleSheet } from 'react-native'
import {Colors as colors, Metrics} from '../../Themes'

const height = Metrics.screenHeight
const width = Metrics.screenWidth

const HEADER_MARGIN_TOP = 25

export const styles = StyleSheet.create({
  divider: {
    opacity: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: colors.greySecondary,
    marginVertical: 20
  },
  loginRequirementSectionWrapper: {
    paddingHorizontal: 48,
    backgroundColor: colors.darkGreyPrimary,
    paddingVertical: 40
  },
  detailsSectionContainer: {
    flex: 0,
    backgroundColor: colors.darkNavyBluePrimary,
    paddingBottom: 20
  },
  contentDetailsContainer: {
    flex: 2,
    backgroundColor: colors.backgroundDark
  },
  playButton: {
    width: 72,
    height: 72
  },
  noPadding: {
    padding: 0
  },

  headerView: {
    paddingHorizontal: 15
  },
  titleText: {
    marginTop: HEADER_MARGIN_TOP,
    width: width <= 360 ? 200 : 265
  },

  details: {
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: colors.darkNavyBluePrimary
  },
  snippet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 15
  },
  gapBetween: { paddingHorizontal: 10 },

  gapBetweenLine: { paddingHorizontal: 15 },

  hintText: {
    marginTop: 6
  },
  footerView: {
    marginTop: 30,
    paddingHorizontal: 15,
    backgroundColor: colors.darkNavyBluePrimary
  },

  titlePlusCpLogo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleRowBadgeOuterContainer: {
    marginTop: HEADER_MARGIN_TOP,
    marginRight: 10
  },
  gapDetails: {
    marginTop: 40
  },
  banner: {
    height: width * 9 / 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImage: {
    flex: 1,
    height: width * 9 / 16,
    justifyContent: 'flex-end',
    left: 0,
    opacity: 0.8,
    paddingLeft: 20,
    right: 0,
    // width
  },
  portraitImage: {
    height: height / 2.8,
    opacity: 0.8,
    width: width / 2.5
  },
  cpBannerIcon: {
    right: 20,
    bottom: 20,
    alignSelf: 'flex-end'
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.darkNavyBluePrimary
  },
  descriptionText: {
    marginTop: 20
  },
  screenDetails: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  languageDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  languageText: {
    marginLeft: 7,
    marginTop: 3
  },
  subtitleText: {
    marginLeft: 7,
    marginTop: 3
  },
  subtitlesDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  videoDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: colors.greyTertiary,
    borderBottomWidth: 1
  },
  videoDetailsHeading: {
    paddingVertical: 13,
    paddingLeft: 10
  },
  stylesText: {
    textAlign: 'center'
  },

  genreLayout: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textPadding: {
    paddingVertical: 13
  },
  languageTopLine: {
    marginBottom: 5
  },
  languageBottomLine: {
    marginBottom: 20
  },

  gapFill: {
    marginTop: -1
  },
  spacingProvider: {
    marginTop: 5,
    fontSize: 12
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  dropDownIcon: {
    height: 20,
    width: 20
  },
  videoDetailsView: {
    marginLeft: 10,
    flex: 1
  },
  videoDetailsViewHeading: {
    minWidth: 90
  },
  detailBody: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  dropDownPrimary: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomColor: colors.greySecondary,
    borderBottomWidth: 1
  },
  languageImage: {
    width: 25,
    height: 25,
    opacity: 0.5
  },
  subtitleImage: {
    width: 25,
    height: 25,
    opacity: 0.5
  },
  descriptionStyle: {
    paddingVertical: 7,
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  chevronDownImage: {
    width: 17,
    height: 17,
    marginLeft: 2,
    marginTop: -1
  },

  /* header related */
  header: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width,
    zIndex: 1000
  },
  backButtonWrapper: {
    paddingVertical: 21,
    marginLeft: 16
  },
  searchBackground: {
    marginRight: 10,
    alignItems: 'center'
  },
  searchButtonWrapper: {
    paddingVertical: 21,
    marginRight: 16
  },
  likeButtonWrapper: {
    paddingVertical: 21,
    marginRight: 16
  },
  searchButton: {
    width: 32,
    height: 32
  },
  carouselSectionWrapper: {
    backgroundColor: colors.darkSlateBlueTertiaryOpacity,
    flex: 1,
    paddingBottom: 30
  },
  timingViewFull: {
    flexDirection: 'column',
    marginTop: 20
  },
  timingView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5
  },
  imageTimingDetails: {
    width: 20,
    height: 20
  },
  textTimingDetails: {
    marginLeft: 10
  },
  dropDownModalContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    flex: 1
  },
  seasonItem: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.whiteTertiaryOpacity,
    borderBottomWidth: 0.4,
    paddingVertical: 17,
    justifyContent: 'space-between'
  },
  seasonText: {
    paddingHorizontal: 17
  },
  doneButton: {
    height: 40,
    justifyContent: 'center'
  },
  paddingHorizontal0: {
    paddingHorizontal: 0
  },
  seasonsListContainer: {
    flex: 1,
    paddingHorizontal: 16
  }
})
