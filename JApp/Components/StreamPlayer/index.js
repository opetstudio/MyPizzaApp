import React from 'react'
import PropTypes from 'prop-types'
import { requireNativeComponent } from 'react-native'

const videoView = {
  name: 'videoView'
}

const propTypes = {
  playbackUrl: PropTypes.string,
  userID: PropTypes.string,
  assetID: PropTypes.string,
  drmAssetId: PropTypes.string,

  nativeID: PropTypes.number,
  accessibilityLabel: PropTypes.string,
  testID: PropTypes.string,
  importantForAccessibility: PropTypes.string,
  renderToHardwareTextureAndroid: PropTypes.bool,
  onLayout: PropTypes.bool,
  accessibilityLiveRegion: PropTypes.string,
  accessibilityComponentType: PropTypes.string
}

videoView.propTypes = propTypes
export default requireNativeComponent('MaxStreamPlayer', videoView)

// import React from 'react'
// import {
//     View, Text
// } from 'react-native'

// class StreamPlayer extends React.Component {
//   render () {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'red'
//         }}
//       >
//         <Text>Player</Text>
//       </View>
//     )
//   }
// }

// export default StreamPlayer
