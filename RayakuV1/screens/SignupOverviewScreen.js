import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Linking,
  WebView,
  TouchableOpacity
} from 'react-native';
// import Hyperlink from 'react-native-hyperlink';
import { Actions } from 'react-native-router-flux';

import ButtonLoginFBAccountKit from '../components/ButtonLoginFBAccountKit';
import styles, { PAGE_HEIGHT } from '../styles/SignUp.style';

const bg = require('../assets/images/red-gradient-bg.png');
const logo = require('../assets/images/rayaku-icon-white.png');

const url_terms = 'https://www.rayaku.id/terms.html';
const url_privacy = 'https://www.rayaku.id/privacy-policy.html';

class SignupOverviewScreen extends Component {
  constructor(props) {
    super(props);
    //  StatusBarIOS.setHidden(true);
    // //console.log('');
    this._onLogedIn = this._onLogedIn.bind(this);
    this._renderWebView = this._renderWebView.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }
  componentWillMount() {
    // //console.log('routerflux component componentWillMount');
    this.setState({
      phone: '',
      language: '',
      countryCode: '62',
      showWebView: false
    });
  }
  componentDidMount() {
  }
  _onLogedIn(token, account) {
    const { screenProps } = this.props;
    if (screenProps) {
      screenProps.onLogedIn(token, account);
    } else {
       this.props.onLogedIn(token, account);
    }
  }
  _renderWebView() {
    if (this.state.check) {
      return (
        <WebView
           source={{ uri: url_terms }}
          //  style={{ marginTop: 20 }}
        />
      );
    }
       return (
         <TouchableOpacity
           onPress={() => this.setState({ check: true })}>
            <Text style={styles.downDescription}>Terms</Text>
         </TouchableOpacity>
      );
    }

    onNavigationStateChange = navState => {
      if (navState.url.indexOf('https://www.rayaku.id/terms.html') === 0) {
      const regex = /#access_token=(.+)/;
      const accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
   };
   
   renderContent() {
    return (
      <WebView
        source={{
          uri: 'https://www.rayaku.id/terms.html',
       }}
        onNavigationStateChange={this.onNavigationStateChange}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
   }

  render() {
    // const title = this.state.title || 'No Title';
    // const data = this.state.data || 'No Data';
    // ////console.log('Login RENDER');
    return (
      <View style={{ flex: 1, width: null }}>
        <StatusBar backgroundColor="transparent" translucent />

          <Image
          style={[styles.background, { opacity: 1.0, height: PAGE_HEIGHT }]}
          resizeMode = 'cover'
          source={bg}/>
            <View
              style={styles.containerBody}
            >
              <View style={styles.styleRayaku}
              >
                <Image
                style={styles.logoRayaku}
                source={logo}
                />
              </View>
              <Text
              style={styles.signUpStyle}
              >
                Sign Up
              </Text>
              <Text style={styles.descriptionStyle}>
                And start chatting now.
              </Text>

            </View>
            <View style={styles.downContainer}>
           
              <Text style={styles.downDescription}>By using this App you are agree with our</Text>
              
              <View style={styles.downContainerRow}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')}>
                  <Text style={[styles.downDescription, { textDecorationLine: 'underline' }]}>
                    Terms
                  </Text>
                </TouchableOpacity>
                <Text style={styles.downDescription}> and </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
                  <Text style={[styles.downDescription, { textDecorationLine: 'underline' }]}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
              
  
              <ButtonLoginFBAccountKit onLogedIn={(t, a) => this._onLogedIn(t, a)} >
                <View style={styles.buttonTextAlign}>
                  <Text style={styles.buttonText}
                  >CONTINUE
                  </Text>
                </View>
              </ButtonLoginFBAccountKit>
            </View>
      </View>
    );
  }
}

export default SignupOverviewScreen;
