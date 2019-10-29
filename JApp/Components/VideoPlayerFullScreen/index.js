import React, { Component } from 'react'
import { isUndefined, isEmpty } from 'lodash'
import {path} from 'ramda'
import {
  View,
  Platform,
  NativeModules,
  DeviceEventEmitter,
  BackHandler,
  Image,
  TouchableHighlight,
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
import ReactNativeVideo from './ReactNativeVideo'
import RNVideoPlayerControl from './RNVideoPlayerControl'
import RNYoutube from './RNYoutube'
import {getParameterByName, updateQueryStringParameter} from '../../Utils/helper/datamining'

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
  movieResource: PropTypes.object,
  myPackagesList: PropTypes.array,
  navigation: PropTypes.object,
  setStatusBarHidden: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  isFetchingSubtitle: PropTypes.bool,
  requestDetail: PropTypes.func,
  funcGetScriptinjectByProvider: PropTypes.func,
  setsource: PropTypes.func,
  resetsource: PropTypes.func,
  contentDetailById: PropTypes.object
}

// const AVPlayerPlaybackCallBack = NativeModules.AVPlayerPlaybackCallBack

export default class VideoPlayerFullScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOverlayShowing: false,
      isLoading: false,
      errorCode: 0,
      appState: AppState.currentState,
      playerClose: false,
      movieSource: {},
      renderAgain: false,
      landscape: ['mv', 'tv'],
      contentType: this.props.navigation.state.params.contentType
    }
    this.goBack = this.goBack.bind(this)
    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.renderPlayer = this.renderPlayer.bind(this)
    this.playbackStartTime = 0
    this.errorMsg = ''

    if (this.props.requestDetail) this.props.requestDetail({id: this.props.contentDetailById._id, lang: 'id'})

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
    const { setStatusBarHidden } = this.props
    setStatusBarHidden(true)

    if (Platform.OS === 'ios') {
      const RotationHelperIOS = NativeModules.RotationHelperIOS
      RotationHelperIOS.forceRotateToLandscape()
    } else {
      if (this.state.landscape.indexOf(this.state.contentType) !== -1) Orientation.lockToLandscape()
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
    // this.onLoading()
  }
  componentWillUnmount () {
    this.props.setStatusBarHidden(false)
    this.closePlayer()
    this.clearOverlayTimer()
    // this.clearAnalyticsTimer()
    if (this.state.landscape.indexOf(this.state.contentType) !== -1) Orientation.unlockAllOrientations()
    // this.props.resetsource(this.props.contentDetailById._id)

    if (Platform.OS === 'ios') {
      const RotationHelperIOS = NativeModules.RotationHelperIOS
      RotationHelperIOS.forceRotatePortraitFromLandscape()
    }
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
    setTimeout(() => {
      const navigation = this.props.navigation
      const { isDeeplink } = navigation.state.params || {}
      // const { content, isDeeplink } = navigation.state.params
      // Orientation.lockToPortrait()
      Orientation.unlockAllOrientations()

      if (Platform.OS === 'ios') {
        const RotationHelperIOS = NativeModules.RotationHelperIOS
        RotationHelperIOS.forceRotatePortraitFromLandscape()
      }

      if (isDeeplink) {
        // navigation.replace('ContentDetail', { contentId: content.contentId })
      } else {
        navigation.goBack()
      }
    }, 300)
  };
  onDeviceBackBtnPress = () => {
    this.goBack()
    return true
  };
  getPhoneWidthHeight = () => {
    if (Platform.os === 'ios') {
      return {
        height: LANDSCAPE_HEIGHT,
        width: LANDSCAPE_WIDTH
      }
    } else {
      return {
        height:
          this.playbackStartTime > 0
            ? SCREEN_LANDSCAPE_HEIGHT
            : SCREEN_LANDSCAPE_HEIGHT + 1, // this is for refreshing the player view on Android
        width: SCREEN_LANDSCAPE_WIDTH
      }
    }
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

    if (this.props.contentDetailById.provider === 'youtube') {
      return (
        <RNYoutube
          stylePlayer={[styles.player, this.getPhoneWidthHeight()]}
          videoId={url}
        />
      )
    }

    return (
      <RNVideoPlayerControl
        stylePlayer={[styles.player, this.getPhoneWidthHeight()]}
        playbackUrl={url}
        subtitle={this.props.subtitle}
        // playbackUrl={'http://techslides.com/demos/sample-videos/small.mp4'}
        navigation={this.props.navigation}
        onError={(e) => {
          __DEV__ && console.log('onError play movie: ', e)
          this.props.resetsource(this.props.contentDetailById._id)
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
  render () {
    const {content, drmAssetID, contentType} = this.props.navigation.state.params
    // const url = this.props.contentDetailById.url
    // const url = this.props.movieResource
    __DEV__ && console.log('VideoPlayerFullScreen render props==>', this.props)
    __DEV__ && console.log('VideoPlayerFullScreen render state==>', this.state)
    const subtitle = this.props.subtitle
    const assetID = content ? content.contentId : ''
    const userID = this.getPlayerUserID()
    const playerDrmAssetID = drmAssetID || ''
    const provider = this.props.contentDetailById.provider
    const subprovider = this.props.contentDetailById.subprovider
    let sourceWebUrl = this.props.contentDetailById.url

    // const tes = (tos) => {
    //   alert(tos)
    //   // this.props.setsource(p.url)
    // }
    // const f = "alert('cek');"
    let f = this.props.funcGetScriptinjectByProvider(subprovider)['content'] || "function waitForBridge () {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);} else {function waitForVideo (i) {if (document.getElementsByTagName('video').length !== 1 && i < 7) {setTimeout(function(){waitForVideo(i + 1);}, 1000);} else {window.postMessage((document.getElementsByTagName('video')[0]||{}).src);}}waitForVideo(0)}}waitForBridge();"
    // const f = "function waitForBridge () {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);} else {var i = 0;function waitForVideo () {if (document.getElementsByTagName('videos').length !== 1 && i < 1) {i += 1;setTimeout(waitForVideo, 200);} else {i += 1;window.postMessage(document.getElementsByTagName('videos')[0].src);}}waitForVideo()}}waitForBridge();"
    // const f = "function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(document.getElementsByTagName('video')[0].src);}}waitForBridge();"
    // const f = "function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(document.getElementById('uc-download-link').href);}}waitForBridge();"
    // const f = "function waitForBridge() {alert('coookkk');if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage('abc');}}window.onload = waitForBridge;"

    // function waitForBridge() {
    //   if (window.postMessage.length !== 1) {
    //     setTimeout(waitForBridge, 200);
    //   } else {
    //     function waitForVideo(i) {
    //       if (document.getElementById('uc-download-link').length > 0 && i < 7) {
    //         window.postMessage(document.getElementById('uc-download-link').href);
    //       } if (document.getElementById('video').length > 0 && i < 7) {
    //         if (document.getElementsByTagName('source').length > 0 && i < 7) {
    //           window.postMessage(document.getElementsByTagName('source')[0].src);
    //         } else {
    //           window.postMessage(document.getElementsByTagName('video')[0].src);
    //         }
    //       } else {
    //         setTimeout(function(){ waitForVideo(i + 1);}, 1000);
    //       }
    //     }
    //     waitForVideo(0);
    //   }
    // }
    // waitForBridge();

    let mUrl = path(['url'], this.props.movieResource)

    // if (provider === 'gdrive') {
      // __DEV__ && console.log('provider', this.props.contentDetailById.provider)
      // f = "function waitForBridge() {if (window.postMessage.length !== 1) {setTimeout(waitForBridge, 200);} else {function waitForVideo(i) {if (document.getElementById('uc-download-link').length > 0 && i < 7) {window.postMessage(document.getElementById('uc-download-link').href);} if (document.getElementById('video').length > 0 && i < 7) {if (document.getElementsByTagName('source').length > 0 && i < 7) {window.postMessage(document.getElementsByTagName('source')[0].src);} else {window.postMessage(document.getElementsByTagName('video')[0].src); }} else {setTimeout(function(){ waitForVideo(i + 1);}, 1000);}}waitForVideo(0);}}waitForBridge();"
      // f = "function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(document.getElementById('uc-download-link').href);}}waitForBridge();"
      // mUrl = this.state.movieSource.url
    // }
    let reCreateMovieResource = false
    const mSrc = this.props.movieResource || {}
    // const mUrl = 'https://doc-0c-38-docs.googleusercontent.com/docs/securesc/d7tqpd9eothlcj9qp09h9u7lo6f7ok4q/4t22un46s5q699vg9a02md9bb3nl6ed1/1531720800000/04080241082568988941/04080241082568988941/1mOego1jMid_qCDEVT_zNAOEpSyxHNBFc?e=view'

    const curExpire = mSrc.expire
    const timeNow = Date.now()

    if (provider === 'gdrive') {
      // if (!mUrl && this.state.renderAgain) reCreateMovieResource = true
      if (this.state.renderAgain) {
        sourceWebUrl = this.state.movieSource.url
        f = "function waitForBridge () {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);} else {function waitForVideo (i) {if (document.getElementsByTagName('source').length !== 1 && i < 7) {setTimeout(function(){waitForVideo(i + 1);}, 1000);} else {window.postMessage((document.getElementsByTagName('source')[0]||{}).src);}}waitForVideo(0);}}waitForBridge();"
        reCreateMovieResource = true
      } else {
        if (isEmpty(this.props.movieResource) || !mUrl) {
          f = "function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(document.getElementById('uc-download-link').href);}}waitForBridge();"
          reCreateMovieResource = true
          sourceWebUrl = this.props.contentDetailById.url
        } else {
          reCreateMovieResource = false
        }
      }
    } if (provider === 'youtube') {
      reCreateMovieResource = false
      mUrl = this.props.contentDetailById.url
    } else if (provider === 'oload.stream') {
      f = 'function waitForBridge(){if(1!==window.postMessage.length)setTimeout(waitForBridge,200);else{!function e(t){1!==document.getElementsByTagName("video").length&&t<7?setTimeout(function(){e(t+1)},1e3):window.postMessage((document.getElementsByTagName("video")[0]||{}).src)}(0)}}function waitForBridge(){if(1!==window.postMessage.length)setTimeout(waitForBridge,200);else{!function e(t){1!==document.getElementsByTagName("video").length&&t<7?setTimeout(function(){e(t+1)},1e3):function e(t){var i=document.getElementById("mediaspace_wrapper").lastChild.previousSibling.lastChild.previousSibling.innerText;if(!i&&t<7)setTimeout(function(){e(t+1)},1e3);else if(i){var o="https://oload.stream/stream/"+i+"?mime=true";window.postMessage(o)}else window.postMessage(void 0)}(0)}(0)}}waitForBridge(),waitForBridge();'
      if (isEmpty(this.props.movieResource) || !mUrl) reCreateMovieResource = true
    } else {
      if (isEmpty(this.props.movieResource) || !mUrl) reCreateMovieResource = true
    }

    if (provider === 'iframe') {
      __DEV__ && console.log('VideoPlayerFullScreen.render iframe ', this.props.contentDetailById)
      if (subprovider === 'iframe.players.brightcove.net') {
        // f = this.props.funcGetScriptinjectByProvider(subprovider) || "function waitForBridge () {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);} else {function waitForVideo (i) {if (document.getElementsByClassName('vjs-dock-shelf').length !== 1 && i < 10) {setTimeout(function(){waitForVideo(i + 1);}, 1000);} else {document.getElementsByClassName('vjs-dock-shelf')[0]||{}).remove();document.getElementsByClassName('vjs-big-play-button')[0].click();}}waitForVideo(0)}}waitForBridge();"
        return (
          <View style={{flex: 1}}>
            <WebView
              source={{uri: this.props.contentDetailById.url}}
              scalesPageToFit={Platform.OS === 'android'}
              injectedJavaScript={f}
              style={{flex: 1, width: null}}
            />
          </View>
        )
      }
      __DEV__ && console.log('VideoPlayerFullScreen.render iframe ', this.props.contentDetailById)
      __DEV__ && console.log('VideoPlayerFullScreen.render iframe f', f)
      return (
        <View style={{flex: 1}}>
          <WebView
            source={{uri: this.props.contentDetailById.url}}
            scalesPageToFit={Platform.OS === 'android'}
            injectedJavaScript={f}
            style={{flex: 1, width: null}}
          />
        </View>
      )
    }

    // if (isEmpty(this.props.movieResource) || !mUrl || (timeNow > curExpire)) reCreateMovieResource = true
    __DEV__ && console.log('===>timeNow', timeNow)
    __DEV__ && console.log('===>curExpire', curExpire)
    __DEV__ && console.log('===>recreate', reCreateMovieResource)
    __DEV__ && console.log('===>sourceWebUrl', sourceWebUrl)
    if (reCreateMovieResource) {
      __DEV__ && console.log('===>do reCreateMovieResource', sourceWebUrl)
      __DEV__ && console.log('===>do reCreateMovieResource f', f)
      // let timeoutAchieve = true
      // this.props.navigation
      // setTimeout(() => {
      //   if (timeoutAchieve) {
      //     this.props.resetsource(this.props.contentDetailById._id)
      //     // this.props.navigation.goBack()
      //   }
      // }, 30000)

      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Please wait. We are creating the unique video source. Make sure your app is the latest version.</Text>
          <ActivityIndicator size='large' color='#0000ff' />
          <WebView
            source={{uri: sourceWebUrl}}
            // source={{uri: 'https://www.google.com'}}
        // source={{uri: 'https://drive.google.com/uc?export=view&id=1qWZhjleVsCertH8ZaDry0fMN0jU6Jn5x'}}
            onNavigationStateChange={(p) => {
              __DEV__ && console.log('VideoPlayerFullScreen render onNavigationStateChange props==>', this.props)
          // this.props.setsource(p.url)
            }}
            injectedJavaScript={f}
        // injectedJavaScript={'(function(){' + tes('document.getElementById("uc-download-link").href') + '}());'}
        // injectedJavaScript={'window.postMessage("cek")'}
        // onNavigationStateChange={(navEvent)=> console.log('haloooo==>', navEvent.jsEvaluationValue)}
        // injectedJavaScript={'alert(this.props.setsource(document.getElementById("uc-download-link").href))'}
            onMessage={(event) => {
              var msg
              var movieSrc = event.nativeEvent.data
              // if (event.nativeEvent.data && event.nativeEvent.data.length > 0) {
              //   movieSrc = path(['src'], event.nativeEvent.data[0])
              // }
              if (movieSrc && movieSrc !== undefined && movieSrc !== 'undefined') {
                msg = 'success creating video source.'
                __DEV__ && console.log(msg, movieSrc)
                const mData = {}
                // extract query

                mData[this.props.contentDetailById._id] = {
                  url: movieSrc,
                  expire: (getParameterByName('expire', movieSrc) || 0) * 1000,
                  signature: getParameterByName('signature', movieSrc)
                }

                // check for the reset
                if (provider === 'gdrive') {
                  if (this.state.renderAgain) {
                    // this.state.movieSource = mData[this.props.contentDetailById._id]
                    // this.state.renderAgain = false
                    this.setState({
                      movieSource: mData[this.props.contentDetailById._id],
                      renderAgain: false
                    })
                    this.props.setsource(mData)
                  } else {
                    mData[this.props.contentDetailById._id].url = updateQueryStringParameter(mData[this.props.contentDetailById._id].url, 'export', 'view')
                    this.setState({
                      movieSource: mData[this.props.contentDetailById._id],
                      renderAgain: true
                    })
                  }
                  // timeoutAchieve = false
                } else {
                  // timeoutAchieve = false
                  this.props.setsource(mData)
                }
              } else {
                msg = 'failed creating video source.'
                __DEV__ && console.log(msg, movieSrc)
              }
          //  https://r2---sn-npoe7ne7.googlevideo.com/videoplayback?id=a94962b1b4908e46&itag=18&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ne7&ms=nxu&mv=m&pl=48&sc=yes&ei=uG1LW4uYMYPioQPpuofQBw&susc=drp&app=fife&driveid=1dCZQNr9Nrx7vF6HX7E1ioNQe6vUSnDwN&mime=video/mp4&lmt=1522279088252328&mt=1531669885&ip=2402:2f80:5::c&ipbits=48&expire=1531677145&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,driveid,mime,lmt&signature=14AE6F7ED5CFAF04942475A7E271F223AB0E6AF4.6E05E0ED802DA7848D55B0E8FC4905DBD8259BB2&key=ck2
          //  https://r2---sn-npoe7ne7.googlevideo.com/videoplayback?id=a94962b1b4908e46&itag=18&source=webdrive&&requiressl=yes&mm=30&mn=sn-npoe7ne7&ms=nxu&mv=m&pl=48&sc=yes&ei=p9VLW4zeL5W01AbchbWoBg&susc=drp&app=fife&driveid=1dCZQNr9Nrx7vF6HX7E1ioNQe6vUSnDwN&mime=video/mp4&lmt=1522279088252328&mt=1531696402&ip=2402:2f80:5::c&ipbits=48&expire=1531703751&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,driveid,mime,lmt&signature=112B9F2564967AC5E061CADA06DC96F40DDA3D23.15BFD7D0E49CB8A9D9D8A58D0344A7FC4C3E964B&key=ck2
            }}
            style={{flex: 0}}
          />
        </View>
      )
    }

    return (
      <View
        style={[
          styles.backgroundContainer,
          this.getPhoneWidthHeight(),
          isIphoneX && styles.iphoneXBackgroundContainer,
          styles.backgroundPageContainer
        ]}
      >

        <View
          style={[
            styles.upperLayer,
            this.getPhoneWidthHeight(),
            isIphoneX && styles.iphoneXUpperLayer
          ]}
        >
          {!this.props.isFetchingSubtitle &&
            this.renderPlayer(
              // 'https://doc-0s-bs-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/6sv2m5hnvjpndlfafmahlg1fihnc7nki/1531519200000/03267313184381322839/*/1760V9Hj8eBrujDAVl-uueJ1UtjVUHYtm?e=view',
              mUrl,
              // 'https://doc-0c-38-docs.googleusercontent.com/docs/securesc/d7tqpd9eothlcj9qp09h9u7lo6f7ok4q/4t22un46s5q699vg9a02md9bb3nl6ed1/1531720800000/04080241082568988941/04080241082568988941/1mOego1jMid_qCDEVT_zNAOEpSyxHNBFc?e=view',
              userID,
              assetID,
              playerDrmAssetID,
              subtitle
            )}
        </View>
      </View>
    )
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

VideoPlayerFullScreen.propTypes = propTypes
