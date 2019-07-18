import React from 'react'
import VideoPlayer from 'awesome-react-native-video-controls'
import {Platform} from 'react-native'

class RNVideoPlayerControl extends React.Component {
  render () {
    __DEV__ && console.log('RNVideoPlayerControl this.props.playbackUrl: ', this.props.playbackUrl)
    return (
      // <VideoPlayer
      //   source={{ uri: this.props.playbackUrl }}
      //   // source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
      //   onBack={() => this.props.navigation.goBack()}
      //   subtitle={this.props.subtitle}
      //   // navigator={this.props.navigator}
      //   />
      <VideoPlayer
        source={{ uri: this.props.playbackUrl }}
        onBack={() => this.props.navigation.goBack()}
        // resizeMode='cover'
        // navigator={this.props.navigator}
        // toggleFullscreen={YourCustomizedFunction}
        subtitle={this.props.subtitle}
        onError={this.props.onError}
        />
    )
  }
}

export default RNVideoPlayerControl
