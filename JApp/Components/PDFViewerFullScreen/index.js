import React, { Component } from 'react'
import { isUndefined, isEmpty } from 'lodash'
import {path} from 'ramda'
import {
  Dimensions,
  View,
  Platform,
  NativeModules,
  DeviceEventEmitter,
  BackHandler,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  NativeEventEmitter,
  AppState, Text,
  WebView,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
// import { autobind } from 'core-decorators'
import Orientation from 'react-native-orientation'
// import LinearGradient from 'react-native-linear-gradient'

// player
// import ReactNativeVideo from './ReactNativeVideo'
import RNPDFViewer from './RNPDFViewer'
import InputSearch from './InputSearch'
import {Metrics, Colors, Images} from '../../Themes'
// import RNYoutube from './RNYoutube'
import {getParameterByName, updateQueryStringParameter} from '../../Utils/helper/datamining'
import HeaderMenu from '../../Components/HeaderMenu'

import {
  styles,
  LANDSCAPE_WIDTH,
  LANDSCAPE_HEIGHT,
  SCREEN_LANDSCAPE_WIDTH,
  SCREEN_LANDSCAPE_HEIGHT
} from './styles'
// import {Colors as colors} from '../../Themes'
// // import colors from '../../themes/colors'

// import Popup from '../Dialog'
// import Badge from 'components/Badge'
// import StreamPlayer from '../StreamPlayer'
// import Spinner from 'components/Spinner'

// import { textMessage } from '../../utils/helper/languageSelector'
// import {
//   actions,
//   trackEvent,
//   getCustomDimensionValues,
//   GAcategories
// } from 'utils/helper/analytics'
import { isIphoneX } from '../../Utils/helper/platform'
// import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator'

const propTypes = {
  content: PropTypes.object,
  locale: PropTypes.string,
  currentPage: PropTypes.number,
  // movieResource: PropTypes.object,
  myPackagesList: PropTypes.array,
  navigation: PropTypes.object,
  setStatusBarHidden: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  popupShow: PropTypes.func,
  bookSetCurrentPage: PropTypes.func,
  bookSetCurrentPath: PropTypes.func,
  // isFetchingSubtitle: PropTypes.bool,
  // requestSubtitle: PropTypes.func,
  // movieSetmoviesource: PropTypes.func,
  // movieResetmoviesource: PropTypes.func,
  contentDetailById: PropTypes.object
}

// const AVPlayerPlaybackCallBack = NativeModules.AVPlayerPlaybackCallBack

export default class PDFViewerFullScreen extends Component {
  constructor (props) {
    super(props)
    const {height, width} = Dimensions.get('window')
    this.state = {
      isOverlayShowing: false,
      isLoading: false,
      errorCode: 0,
      appState: AppState.currentState,
      playerClose: false,
      movieSource: {},
      renderAgain: false,
      screenWidth: width,
      screenHeight: height,
      textSearch: '',
      finalTextSearch: ''
    }
    this.goBack = this.goBack.bind(this)
    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.renderPlayer = this.renderPlayer.bind(this)
    this._orientationDidChange = this._orientationDidChange.bind(this)
    this.getPhoneWidthHeight = this.getPhoneWidthHeight.bind(this)
    this.renderPageButton = this.renderPageButton.bind(this)
    this.inputSearchOnChange = this.inputSearchOnChange.bind(this)
    this.playbackStartTime = 0
    this.errorMsg = ''
    __DEV__ && console.log('PDFViewerFullScreen constructor')
    // this.props.requestSubtitle({id: this.props.contentDetailById._id, lang: 'id'})

    // const iOSPlayerEventEmitter = new NativeEventEmitter(
    //   AVPlayerPlaybackCallBack
    // )
    // if (Platform.OS === 'android') {
    //   this.videoEventEmitter = DeviceEventEmitter
    // } else {
    //   this.videoEventEmitter = iOSPlayerEventEmitter
    // }
  }
  // componentWillReceiveProps (nextProps) {
  //   const {movieId} = nextProps.navigation.state.params
  //   this.setState({
  //     content: nextProps.getDetailById()
  //   })
  // }
  componentDidMount () {
    const initial = Orientation.getInitialOrientation()
    __DEV__ && console.log('PDFViewerFullScreen componentDidMount ', initial)
    const {height, width} = Dimensions.get('window')
    __DEV__ && console.log('PDFViewerFullScreen componentDidMount width', width)
    __DEV__ && console.log('PDFViewerFullScreen componentDidMount height', height)
    // if (initial === 'PORTRAIT') {
      // do something
    this.setState({
      screenHeight: height,
      screenWidth: width
    })
    // } else {
    //   // do something else
    //   this.setState({
    //     screenHeight: Metrics.screenWidth,
    //     screenWidth: Metrics.screenHeight
    //   })
    // }
    const { setStatusBarHidden } = this.props
    // setStatusBarHidden(true)

    if (Platform.OS === 'ios') {
      // const RotationHelperIOS = NativeModules.RotationHelperIOS
      // RotationHelperIOS.forceRotateToLandscape()
    } else {
      // Orientation.lockToLandscape()
    }

    // if (this.videoEventEmitter) {
    //   this.videoEventEmitter.addListener('onPlayerStart', this.onPlaybackStart)
    //   this.videoEventEmitter.addListener('onPlayerStop', this.onPlaybackStop)
    //   this.videoEventEmitter.addListener('onPlayerError', this.onPlaybackError)
    //   this.videoEventEmitter.addListener('onLoading', this.onLoading)
    //   this.videoEventEmitter.addListener('onStopLoading', this.onStopLoading)
    // }

    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.onDeviceBackBtnPress
    // )
    AppState.addEventListener('change', this._handleAppStateChange)
    Orientation.addOrientationListener(this._orientationDidChange)
    // this.onLoading()
  }
  componentWillUnmount () {
    __DEV__ && console.log('PDFViewerFullScreen componentWillUnmount')
    Orientation.removeOrientationListener(this._orientationDidChange)
    // this.props.setStatusBarHidden(false)
    this.closePlayer()
    this.clearOverlayTimer()
    // this.clearAnalyticsTimer()

    // Orientation.unlockAllOrientations()
    // this.props.movieResetmoviesource(this.props.contentDetailById._id)

    if (Platform.OS === 'ios') {
      const RotationHelperIOS = NativeModules.RotationHelperIOS
      RotationHelperIOS.forceRotatePortraitFromLandscape()
    }
  }
  _orientationDidChange (orientation) {
    __DEV__ && console.log('orientation', orientation)
    __DEV__ && console.log('orientation', Dimensions.get('window'))
    const {height, width} = Dimensions.get('window')

    if (orientation === 'LANDSCAPE') {
      if (width > height) this.setState({ screenWidth: width, screenHeight: height })
      else this.setState({ screenWidth: height, screenHeight: width })
    } else {
      if (width > height) this.setState({ screenWidth: height, screenHeight: width })
      else this.setState({ screenWidth: width, screenHeight: height })
    }
    // this.setState({ screenWidth: width, screenHeight: height })
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App has come to the foreground!
      if (Platform.OS === 'ios') {
        // AVPlayerPlaybackCallBack.comeBackToForeground();
      }
    }
    this.setState({ appState: nextAppState })
  }
  onPlaybackStop = () => {
    // const { content } = this.props.navigation.state.params
    // this.triggerVideoStopGA(
    //   content,
    //   this.props.userProfile,
    //   this.props.myPackagesList,
    //   this.playbackStartTime,
    // )
    // this.clearAnalyticsTimer()
  }
  toggleOverlay () {
    this.setState({
      isOverlayShowing: !this.state.isOverlayShowing
    })
    this.clearOverlayTimer()
    if (!this.state.isOverlayShowing) {
      this.overlayTimer = setTimeout(() => {
        this.clearOverlayTimer()
        this.setState({ isOverlayShowing: false })
      }, 5000)
    }
  }
  clearOverlayTimer () {
    if (this.overlayTimer) {
      clearTimeout(this.overlayTimer)
      this.overlayTimer = null
    }
  }
  closePlayer () {
    if (Platform.OS === 'android') {
      // NativeModules.PlayerModule.closePlayer()
    }
    this.onPlaybackStop()
  }
  goBack = () => {
    // this.setState({
    //   errorCode: 0,
    //   playerClose: true
    // })
    // setTimeout(() => {
    //   const navigation = this.props.navigation
    //   const { isDeeplink } = navigation.state.params || {}
      // const { content, isDeeplink } = navigation.state.params
      // Orientation.lockToPortrait()
      // Orientation.unlockAllOrientations()

      // if (Platform.OS === 'ios') {
      //   const RotationHelperIOS = NativeModules.RotationHelperIOS
      //   RotationHelperIOS.forceRotatePortraitFromLandscape()
      // }

      // if (isDeeplink) {
      //   // navigation.replace('ContentDetail', { contentId: content.contentId })
      // } else {
      //   navigation.goBack()
      // }
    // }, 300)
    this.props.navigation.goBack()
  };
  onDeviceBackBtnPress = () => {
    this.goBack()
    return true
  };
  getPhoneWidthHeight = () => {
    return {
      width: this.state.screenWidth,
      height: this.state.screenHeight
    }
    // if (Platform.os === 'ios') {
    //   return {
    //     height: LANDSCAPE_HEIGHT,
    //     width: LANDSCAPE_WIDTH
    //   }
    // } else {
    //   return {
    //     height:
    //       this.playbackStartTime > 0
    //         ? SCREEN_LANDSCAPE_HEIGHT
    //         : SCREEN_LANDSCAPE_HEIGHT + 1, // this is for refreshing the player view on Android
    //     width: SCREEN_LANDSCAPE_WIDTH
    //   }
    // }
  }
  getPlayerUserID = () => {
    const { userProfile } = this.props
    return userProfile && !isUndefined(userProfile.user_id)
      ? userProfile.user_id
      : 'UUID'
  }
  renderPlayer = (url, userID, assetID, playerDrmAssetID, subtitle) => {
    if (this.state.playerClose) {
      return null
    }
    const bookId = this.props.contentDetailById._id

    // if (this.props.contentDetailById.provider === 'youtube') {
    //   return (
    //     <RNYoutube
    //       stylePlayer={[styles.player, this.getPhoneWidthHeight()]}
    //       videoId={url}
    //     />
    //   )
    // }

    return (
      <RNPDFViewer
        screenHeight={this.state.screenHeight}
        screenWidth={this.state.screenWidth}
        // stylePlayer={[styles.player, this.getPhoneWidthHeight()]}
        playbackUrl={url}
        textSearch={this.state.finalTextSearch}
        bookSetCurrentPage={this.props.bookSetCurrentPage}
        bookSetCurrentPath={this.props.bookSetCurrentPath}
        bookId={bookId}
        page={this.props.currentPage}
        currentPath={this.props.currentPath}
        // subtitle={this.props.subtitle}
        // playbackUrl={'http://techslides.com/demos/sample-videos/small.mp4'}
        navigation={this.props.navigation}
        onError={(e) => {
          __DEV__ && console.log('onError play book: ', e)
          // this.props.movieResetmoviesource(this.props.contentDetailById._id)
        }}
      />
    )

    // return (
    //   <ReactNativeVideo
    //     stylePlayer={[styles.player, this.getPhoneWidthHeight()]}
    //     playbackUrl={url}
    //   />
    // )
    // return (
    //   <StreamPlayer
    //     style={[styles.player, this.getPhoneWidthHeight()]}
    //     playbackUrl={'http://techslides.com/demos/sample-videos/small.mp4'}
    //     userID={userID}
    //     assetID={assetID}
    //     drmAssetId={playerDrmAssetID}
    //   />
    // )
    // return (
    //   // <MaxStreamPlayer
    //   //   style={[styles.player, this.getPhoneWidthHeight()]}
    //   //   playbackUrl={url}
    //   //   userID={userID}
    //   //   assetID={assetID}
    //   //   drmAssetId={playerDrmAssetID}
    //   // />
    // )
  };
  renderBackButton = () => {
    // if (!this.state.isOverlayShowing || this.state.playerClose) {
    //   return null
    // }

    return (
      <TouchableHighlight
        style={styles.backButton}
        // underlayColor={Colors.transparent}
        onPress={this.goBack}
      >
        <Image
          style={styles.backButtonIcon}
          source={Images.backWhite}
        />
      </TouchableHighlight>
    )
  };
  inputSearchOnChange (text) {
    __DEV__ && console.log('inputSearchOnChange', text)
    this.setState({textSearch: text})
  }
  renderPageButton = () => {
    // if (!this.state.isOverlayShowing || this.state.playerClose) {
    //   return null
    // }

    return (
      <TouchableOpacity
        style={styles.pageButton}
        // underlayColor={'rgba(0, 0, 0, 0.4)'}
        onPress={() => {
          this.props.popupShow({
            title: 'Goto Page Number',
            body: <InputSearch onChange={this.inputSearchOnChange} />,
            actions: [
              { name: 'Cancel', handler: this.props.popupHide },
              { name: 'Confirm',
                handler: () => {
                  // this.props.sessionLogout()
                  __DEV__ && console.log('doSearch ', this.state.textSearch)
                  this.setState({finalTextSearch: this.state.textSearch})
                }
              }
            ],
            imageSource: null,
            imageBody: null
          })
        }}
      >
        <Image
          style={styles.searchButtonIcon}
          source={Images.searchWhite}
        />
      </TouchableOpacity>
    )
  };
  render () {
    __DEV__ && console.log('PDFViewerFullScreen render')
    const {content, drmAssetID} = this.props.navigation.state.params
    const url = this.props.contentDetailById.url
    // const url = this.props.movieResource
    __DEV__ && console.log('PDFViewerFullScreen render props==>', this.props)
    __DEV__ && console.log('PDFViewerFullScreen render state==>', this.state)
    const subtitle = []
    const assetID = content ? content.contentId : ''
    const userID = this.getPlayerUserID()
    const playerDrmAssetID = drmAssetID || ''

    return (
      <View
        style={[
          styles.backgroundContainer,
          this.getPhoneWidthHeight(),
          isIphoneX && styles.iphoneXBackgroundContainer,
          styles.backgroundPageContainer
        ]}
      >
        {/* <HeaderMenu
          hasHamburger
          hasSearch
          navigation={this.props.navigation}
          title={'Book'}
        /> */}
        {this.renderPlayer(
          // 'https://doc-0s-bs-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/6sv2m5hnvjpndlfafmahlg1fihnc7nki/1531519200000/03267313184381322839/*/1760V9Hj8eBrujDAVl-uueJ1UtjVUHYtm?e=view',
          url,
          // 'https://doc-0c-38-docs.googleusercontent.com/docs/securesc/d7tqpd9eothlcj9qp09h9u7lo6f7ok4q/4t22un46s5q699vg9a02md9bb3nl6ed1/1531720800000/04080241082568988941/04080241082568988941/1mOego1jMid_qCDEVT_zNAOEpSyxHNBFc?e=view',
          userID,
          assetID,
          playerDrmAssetID,
          subtitle
        )}
        {this.renderBackButton()}
        {this.renderPageButton()}
      </View>
    )

    // return (
    //   // <View
    //   //   style={[
    //   //     styles.backgroundContainer,
    //   //     // this.getPhoneWidthHeight(),
    //   //     isIphoneX && styles.iphoneXBackgroundContainer,
    //   //     // styles.backgroundPageContainer
    //   //     {width: this.state.screenWidth, height: this.state.screenHeight}
    //   //   ]}
    //   // >

    //     <View
    //       style={[
    //         styles.upperLayer,
    //         // this.getPhoneWidthHeight(),
    //         isIphoneX && styles.iphoneXUpperLayer,
    //         {width: this.state.screenWidth, height: this.state.screenHeight}
    //       ]}
    //     >
    //       { this.renderPlayer(
    //           // 'https://doc-0s-bs-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/6sv2m5hnvjpndlfafmahlg1fihnc7nki/1531519200000/03267313184381322839/*/1760V9Hj8eBrujDAVl-uueJ1UtjVUHYtm?e=view',
    //           '',
    //           // 'https://doc-0c-38-docs.googleusercontent.com/docs/securesc/d7tqpd9eothlcj9qp09h9u7lo6f7ok4q/4t22un46s5q699vg9a02md9bb3nl6ed1/1531720800000/04080241082568988941/04080241082568988941/1mOego1jMid_qCDEVT_zNAOEpSyxHNBFc?e=view',
    //           userID,
    //           assetID,
    //           playerDrmAssetID,
    //           subtitle
    //         )}
    //     </View>
    //   // </View>
    // )
  }
}

//   componentDidMount () {
//     const { setStatusBarHidden } = this.props
//     setStatusBarHidden(true)

//     if (Platform.OS === 'ios') {
//       const RotationHelperIOS = NativeModules.RotationHelperIOS
//       RotationHelperIOS.forceRotateToLandscape()
//     } else {
//       Orientation.lockToLandscape()
//     }

//     if (this.videoEventEmitter) {
//       this.videoEventEmitter.addListener('onPlayerStart', this.onPlaybackStart)
//       this.videoEventEmitter.addListener('onPlayerStop', this.onPlaybackStop)
//       this.videoEventEmitter.addListener('onPlayerError', this.onPlaybackError)
//       this.videoEventEmitter.addListener('onLoading', this.onLoading)
//       this.videoEventEmitter.addListener('onStopLoading', this.onStopLoading)
//     }

//     BackHandler.addEventListener(
//       'hardwareBackPress',
//       this.onDeviceBackBtnPress
//     )
//     AppState.addEventListener('change', this._handleAppStateChange)
//     this.onLoading()
//   }

//   componentWillUnmount () {
//     this.props.setStatusBarHidden(false)
//     this.closePlayer()
//     this.clearOverlayTimer()
//     this.clearAnalyticsTimer()

//     if (this.videoEventEmitter) {
//       this.videoEventEmitter.removeListener(
//         'onPlayerStart',
//         this.onPlaybackStart
//       )
//       this.videoEventEmitter.removeListener(
//         'onPlayerStop',
//         this.onPlaybackStop
//       )
//       this.videoEventEmitter.removeListener(
//         'onPlayerError',
//         this.onPlaybackError
//       )
//       this.videoEventEmitter.removeListener('onLoading', this.onLoading)
//       this.videoEventEmitter.removeListener(
//         'onStopLoading',
//         this.onStopLoading
//       )
//     }

//     BackHandler.removeEventListener(
//       'hardwareBackPress',
//       this.onDeviceBackBtnPress
//     )
//     AppState.removeEventListener('change', this._handleAppStateChange)
//     this.videoEventEmitter = null
//   }

//   _handleAppStateChange = nextAppState => {
//     if (
//       this.state.appState.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       // App has come to the foreground!
//       if (Platform.OS === 'ios') {
//         AVPlayerPlaybackCallBack.comeBackToForeground()
//       }
//     }
//     this.setState({ appState: nextAppState })
//   };

//   @autobind
//   toggleOverlay () {
//     this.setState({
//       isOverlayShowing: !this.state.isOverlayShowing
//     })
//     this.clearOverlayTimer()
//     if (!this.state.isOverlayShowing) {
//       this.overlayTimer = setTimeout(() => {
//         this.clearOverlayTimer()
//         this.setState({ isOverlayShowing: false })
//       }, 5000)
//     }
//   }

//   clearOverlayTimer () {
//     if (this.overlayTimer) {
//       clearTimeout(this.overlayTimer)
//       this.overlayTimer = null
//     }
//   }

//   clearAnalyticsTimer () {
//     if (this.analyticsTimer) {
//       clearTimeout(this.analyticsTimer)
//       this.analyticsTimer = null
//     }
//   }

//   onDeviceBackBtnPress = () => {
//     this.goBack()
//     return true
//   };

//   onPlaybackError = params => {
//     if (params['errorCode']) {
//       this.errorMsg = this.getErrorMessage(params['errorCode'])
//       const { content } = this.props.navigation.state.params
//       this.triggerVideoErrorGA(
//         content,
//         this.props.userProfile,
//         this.props.myPackagesList,
//         params['errorCode'],
//         this.errorMsg
//       )
//       if (params['showErrorDialog']) {
//         this.setState({
//           errorCode: params['errorCode']
//         })
//       }
//     }
//   };

//   onLoading = () => {
//     this.setState({ isLoading: true })
//   };

//   onStopLoading = () => {
//     this.setState({ isLoading: false })
//   };

//   onPlaybackStart = () => {
//     this.setState({
//       isOverlayShowing: this.state.isOverlayShowing
//     })
//     if (this.playbackStartTime == 0) {
//       this.playbackStartTime = Math.floor(Date.now() / 1000)
//       this.analyticsTimer = setTimeout(() => {
//         this.clearAnalyticsTimer()
//         const { content } = this.props.navigation.state.params
//         this.triggerVideoPlayGA(
//           content,
//           this.props.userProfile,
//           this.props.myPackagesList
//         )
//       }, 5000)
//     }
//   };

//   onPlaybackStop = () => {
//     const { content } = this.props.navigation.state.params
//     this.triggerVideoStopGA(
//       content,
//       this.props.userProfile,
//       this.props.myPackagesList,
//       this.playbackStartTime
//     )
//     this.clearAnalyticsTimer()
//   };

//   triggerVideoPlayGA = (content, userProfile, myPackagesList) => {
//     const customDimentionObj = getCustomDimensionValues({
//       content: content,
//       userProfile: userProfile,
//       myPackagesList: myPackagesList
//     })
//     trackEvent({
//       category: GAcategories.VIDEO_PLAYER,
//       action: actions.VIDEO_PLAY,
//       customDimensionValues: customDimentionObj
//     })
//   };

//   triggerVideoStopGA = (
//     content,
//     userProfile,
//     myPackagesList,
//     playbackStartTime
//   ) => {
//     if (playbackStartTime > 0) {
//       const duration = Math.floor(Date.now() / 1000) - playbackStartTime
//       if (duration > 5) {
//         const customDimentionObj = getCustomDimensionValues({
//           content: content,
//           userProfile: userProfile,
//           myPackagesList: myPackagesList,
//           duration: duration
//         })
//         trackEvent({
//           category: GAcategories.VIDEO_PLAYER,
//           action: actions.VIDEO_STOP,
//           customDimensionValues: customDimentionObj
//         })
//       }
//     }
//   };

//   triggerVideoErrorGA = (
//     content,
//     userProfile,
//     myPackagesList,
//     errorCode,
//     errorMsg
//   ) => {
//     const customDimentionObj = getCustomDimensionValues({
//       content: content,
//       userProfile: userProfile,
//       myPackagesList: myPackagesList,
//       errorCode: errorCode,
//       errorMsg: errorMsg
//     })
//     trackEvent({
//       category: GAcategories.VIDEO_PLAYER,
//       action: actions.VIDEO_ERROR,
//       customDimensionValues: customDimentionObj
//     })
//   };

//   goBack = () => {
//     this.setState({
//       errorCode: 0,
//       playerClose: true
//     })
//     setTimeout(() => {
//       const navigation = this.props.navigation
//       const { content, isDeeplink } = navigation.state.params
//       Orientation.lockToPortrait()

//       if (Platform.OS === 'ios') {
//         const RotationHelperIOS = NativeModules.RotationHelperIOS
//         RotationHelperIOS.forceRotatePortraitFromLandscape()
//       }

//       if (isDeeplink) {
//         navigation.replace('ContentDetail', { contentId: content.contentId })
//       } else {
//         navigation.goBack()
//       }
//     }, 300)
//   };

//   closePlayer () {
//     if (Platform.OS === 'android') {
//       NativeModules.PlayerModule.closePlayer()
//     }
//     this.onPlaybackStop()
//   }

//   hidePopupAction = () => {
//     this.setState({ errorCode: 0 })
//   };

//   renderLiveBadge = () => {
//     if (!this.state.isOverlayShowing || this.state.playerClose) {
//       return null
//     }

//     return (
//       <TouchableHighlight
//         style={styles.badgeContainer}
//         onPress={this.toggleOverlay}
//       >
//         <Badge i18nKey='live' style={styles.badge} locale={this.props.locale} />
//       </TouchableHighlight>
//     )
//   };

//   renderBackButton = () => {
//     if (!this.state.isOverlayShowing || this.state.playerClose) {
//       return null
//     }

//     return (
//       <TouchableHighlight
//         style={styles.backButton}
//         underlayColor={colors.transparent}
//         onPress={this.goBack}
//       >
//         <Image
//           style={styles.backButtonIcon}
//           source={require('../../assets/back_white.png')}
//         />
//       </TouchableHighlight>
//     )
//   };

//   renderTopShadow = () => {
//     if (!this.state.isOverlayShowing || this.state.playerClose) {
//       return null
//     }

//     return (
//       <TouchableHighlight
//         underlayColor={colors.transparent}
//         style={[this.getPhoneWidthHeight(), styles.headerHighlight]}
//         onPress={this.toggleOverlay}
//       >
//         <LinearGradient
//           colors={[colors.black.primaryOpacity, colors.transparent]}
//           style={[this.getPhoneWidthHeight(), styles.header]}
//         />
//       </TouchableHighlight>
//     )
//   };

//   getErrorMessage = errorCode => {
//     if (errorCode === 10014) {
//       return textMessage('popup-player-geo-block-error-message')
//     } else if (errorCode > 10000 && errorCode < 11000) {
//       return textMessage('popup-player-error-message')
//     } else if (errorCode > 11000 && errorCode < 12000) {
//       return textMessage('popup-player-error-license-message')
//     }
//     return ''
//   };

//   renderErrorPopup = () => {
//     if (this.state.errorCode < 1 || this.state.playerClose) {
//       return null
//     }
//     const popupConf = {
//       title: {
//         template: 'popup-player-error-title'
//       },
//       body: `${this.errorMsg} #${this.state.errorCode}`,
//       actions: [
//         {
//           name: 'btn-player-error-ok',
//           handler: () => this.goBack()
//         }
//       ]
//     }
//     return (
//       <Popup
//         message={popupConf}
//         isOpen={this.state.errorCode > 0}
//         isLandscape
//         hidePopup={this.hidePopupAction}
//         isCancelable={false}
//       />
//     )
//   };

//   renderLoadingIcon = () => {
//     if (!this.state.isLoading) {
//       return null
//     }
//     return <Spinner />
//   };

//   getPhoneWidthHeight = () => {
//     if (Platform.os === 'ios') {
//       return {
//         height: LANDSCAPE_HEIGHT,
//         width: LANDSCAPE_WIDTH
//       }
//     } else {
//       return {
//         height:
//           this.playbackStartTime > 0
//             ? SCREEN_LANDSCAPE_HEIGHT
//             : SCREEN_LANDSCAPE_HEIGHT + 1, // this is for refreshing the player view on Android
//         width: SCREEN_LANDSCAPE_WIDTH
//       }
//     }
//   };

//   getPlayerUserID = () => {
//     const { userProfile } = this.props
//     return userProfile && !isUndefined(userProfile.user_id)
//       ? userProfile.user_id
//       : 'UUID'
//   };

//   renderPlayer = (url, userID, assetID, playerDrmAssetID) => {
//     if (this.state.playerClose) {
//       return null
//     }
//     return (
//       <MaxStreamPlayer
//         style={[styles.player, this.getPhoneWidthHeight()]}
//         playbackUrl={url}
//         userID={userID}
//         assetID={assetID}
//         drmAssetId={playerDrmAssetID}
//       />
//     )
//   };

//   render () {
//     const { url, content, drmAssetID } = this.props.navigation.state.params
//     const assetID = content ? content.contentId : ''
//     const userID = this.getPlayerUserID()
//     const playerDrmAssetID = drmAssetID || '';

//     return (
//       <View
//         style={[
//           styles.backgroundContainer,
//           this.getPhoneWidthHeight(),
//           isIphoneX && styles.iphoneXBackgroundContainer,
//           styles.backgroundPageContainer
//         ]}
//       >
//         <View
//           style={[
//             styles.upperLayer,
//             this.getPhoneWidthHeight(),
//             isIphoneX && styles.iphoneXUpperLayer
//           ]}
//         >
//           {this.renderPlayer(url, userID, assetID, playerDrmAssetID)}

//           <View
//             style={[
//               styles.spinnerContainer,
//               isIphoneX && styles.iphoneXSpinner
//             ]}
//           >
//             {this.renderLoadingIcon()}
//           </View>

//           <TouchableHighlight
//             underlayColor={colors.transparent}
//             style={[styles.touchPanel, this.getPhoneWidthHeight()]}
//             onPress={this.toggleOverlay}
//           >
//             <View style={styles.touchPanel} />
//           </TouchableHighlight>

//           {this.renderTopShadow()}
//           {this.renderBackButton()}
//           {this.renderLiveBadge()}
//           {this.renderErrorPopup()}
//         </View>
//         <PrefersHomeIndicatorAutoHidden />
//       </View>
//     )
//   }
// }

PDFViewerFullScreen.propTypes = propTypes
