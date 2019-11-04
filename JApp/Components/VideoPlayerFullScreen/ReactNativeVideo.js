import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Video from 'react-native-video'

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

class ReactNativeVideo extends React.Component {
  onEnd () {
    __DEV__ && console.log('onEnd')
  }
  onBuffer () {
    __DEV__ && console.log('onBuffer')
  }
  videoError () {
    __DEV__ && console.log('videoError')
  }
  fullScreenPlayerWillPresent () {
    __DEV__ && console.log('fullScreenPlayerWillPresent')
  }
  fullScreenPlayerDidPresent () {
    __DEV__ && console.log('fullScreenPlayerDidPresent')
  }
  fullScreenPlayerWillDismiss () {
    __DEV__ && console.log('fullScreenPlayerWillDismiss')
  }
  fullScreenPlayerDidDismiss () {
    __DEV__ && console.log('fullScreenPlayerDidDismiss')
  }
  render () {
    return (
      <View
        style={this.props.stylePlayer}
    >
        <Video
          source={{uri: this.props.playbackUrl}}
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.videoError}               // Callback when video cannot be loaded
          onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
          onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
          onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
          onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
          style={styles.backgroundVideo}
        />
      </View>
    )
    // return (
    // //   <View
    // //     style={this.props.stylePlayer}
    // //   >
    //     {/* <Text>tess</Text> */}
    //     {/* <Video source={{uri: 'background'}}   // Can be a URL or a local file. */}
    //     // <Video
    //     //   source={{uri: this.props.playbackUrl}}   // Can be a URL or a local file.
    //     // //   ref={(ref) => {
    //     // //     this.player = ref
    //     // //   }}                                      // Store reference
    //     // //   onBuffer={this.onBuffer}                // Callback when remote video is buffering
    //     // //   onEnd={this.onEnd}                      // Callback when playback finishes
    //     // //   onError={this.videoError}               // Callback when video cannot be loaded
    //     // //   onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
    //     // //   onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
    //     // //   onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
    //     // //   onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
    //     // //   style={styles.backgroundVideo}
    //     //   />
    // //   </View>
    // )
  }
}

export default ReactNativeVideo
