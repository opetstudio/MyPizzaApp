import React from 'react'
import YouTube, {YouTubeStandaloneAndroid} from 'react-native-youtube'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform
} from 'react-native'

import AppConfig from '../../Config/AppConfig'

var stylesxxx = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

class RNYoutube extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
      toggl: true
    }

    const cek = (p1, p2) => {
      __DEV__ && console.log('RNYoutube==>p1', p1)
      __DEV__ && console.log('RNYoutube==>p2', p2)
    }

    YouTubeStandaloneAndroid.playVideo({
      apiKey: AppConfig.youtubeApiKey,
      videoId: 'KVZ-P-ZI6W4',
      autoplay: true,
      lightboxMode: false,
      startTime: 124.5,
      onError: (e) => cek('onError', e),
      onReady: (e) => cek('onReady', e),
      onChangeState: (e) => cek('onChangeState', e),
      onChangeQuality: (e) => cek('onChangeQuality', e),
      onChangeFullscreen: (e) => cek('onChangeFullscreen', e),
      onProgress: (e) => cek('onProgress', e)
    })
      .then(() => console.log('Android Standalone Player Finished'))
      .catch(errorMessage => this.setState({ error: errorMessage }))
    // YouTubeStandaloneAndroid.playVideo({
    //   apiKey: AppConfig.youtubeApiKey,
    //   videoId: 'KVZ-P-ZI6W4',
    //   autoplay: true,
    //   lightboxMode: false,
    //   startTime: 124.5
    // })
    // .then(() => console.log('Android Standalone Player Finished'))
    // .catch(errorMessage => this.setState({ error: errorMessage }))
  }
  // componentWillMount () {
  //   YouTubeStandaloneAndroid.playVideo({
  //     apiKey: AppConfig.youtubeApiKey,
  //     videoId: 'KVZ-P-ZI6W4',
  //     autoplay: true,
  //     lightboxMode: false,
  //     startTime: 124.5,
  //     onChangeFullscreen: (p) => {
  //       __DEV__ && console.log('===>onChangeFullscreen', p)
  //     }
  //   })
  //     .then(() => console.log('Android Standalone Player Finished'))
  //     .catch(errorMessage => this.setState({ error: errorMessage }))
  // }
  render () {
    this.state.toggl = !this.state.toggl
    if (this.state.toggl) __DEV__ && console.log('RNYoutube state open', this.state)
    else __DEV__ && console.log('RNYoutube state close', this.state)
    // return (
    //   <YouTube
    //     ref={component => {
    //       this._youTubeRef = component
    //     }}
    //   // You must have an API Key for the player to load in Android
    //     apiKey={AppConfig.youtubeApiKey}
    //   // Un-comment one of videoId / videoIds / playlist.
    //   // You can also edit these props while Hot-Loading in development mode to see how
    //   // it affects the loaded native module
    //     videoId='ncw4ISEU5ik'
    //   // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
    //   // playlistId="PLF797E961509B4EB5"
    //     play={this.state.isPlaying}
    //     loop={this.state.isLooping}
    //     fullscreen={this.state.fullscreen}
    //     controls={1}
    //     style={[
    //     { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
    //       styles.player
    //     ]}
    //     onError={e => this.setState({ error: e.error })}
    //     onReady={e => this.setState({ isReady: true })}
    //     onChangeState={e => this.setState({ status: e.state })}
    //     onChangeQuality={e => this.setState({ quality: e.quality })}
    //     onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
    //     onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
    // />
    // )
    return null
    // return (
    //   <View
    //     style={this.props.stylePlayer}
    //   >
    //     {/* <YouTube
    //       videoId='KVZ-P-ZI6W4'   // The YouTube video ID
    //       // videoId={this.props.videoId}   // The YouTube video ID
    //       play             // control playback of video with true/false
    //       fullscreen       // control whether the video should play in fullscreen or inline
    //       loop             // control whether the video should loop when ended
    //       apiKey={AppConfig.youtubeApiKey}
    //         // onReady={e => this.setState({ isReady: true })}
    //         // onChangeState={e => this.setState({ status: e.state })}
    //         // onChangeQuality={e => this.setState({ quality: e.quality })}
    //       onError={e => {
    //         __DEV__ && console.log('onError youtube=', e)
    //       }}

    //       style={{ alignSelf: 'stretch', height: 300 }}
    //     /> */}
    //   </View>
    // )
  }
}

export default RNYoutube
