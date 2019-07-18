import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    View,
    WebView
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
const labelScreen = 'My Profile'

class LoadingWebView extends Component {
     // // Prop type warnings
  static propTypes = {
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    navigation: PropTypes.object
  }
  //
  // // Defaults for props
  static defaultProps = {
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{uri: 'https://drive.google.com/uc?export=view&id=15HTdNoxHphJM3iaNS69pfiTrTANNIaXQ'}}
          onNavigationStateChange={(p) => {
            console.log('=====>>>>>>p', p.url)
            // navigation.
          }}
          injectedJavaScript={'alert(document.getElementById("uc-download-link").href)'}
          // style={{marginTop: 20}}
      />
      </View>
    )
  }
}

export default LoadingWebView
