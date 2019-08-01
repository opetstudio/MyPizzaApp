import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableHighlight, Image } from 'react-native';
import Button from 'react-native-button';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors, widthComponent } from '../styles/index.style';
import ButtonLoginFBAccountKit from './ButtonLoginFBAccountKit';

import { Actions } from 'react-native-router-flux';


const SLIDER_1_FIRST_ITEM = 0;

const ob1 = require('../assets/images/onboard-1.png');
const ob2 = require('../assets/images/onboard-2.png');
const ob3 = require('../assets/images/onboard-3.png');
const ob4 = require('../assets/images/onboard-4.png');

const bg = require('../assets/images/bg2-red-on-white.png');

const ENTRIES1 = [
  {
      title: 'Welcome to rayaku',
      subtitle: 'Keep in touch with your friends and family.',
      subtitle2: 'And discover new people nearby!',
      illustration: ob1
  },
  {
      title: 'Free Messaging App',
      subtitle: 'Send message anywhere, anytime.',
      subtitle2: 'Free and secure chat!',
      illustration: ob2
  },
  {
      title: 'Media Files',
      subtitle: 'Share your moment',
      subtitle2: 'Send photo, audio and Video!',
      illustration: ob3
  },
  {
      title: 'Nearby',
      subtitle: 'Discover awesome people and things',
      subtitle2: 'around you!',
      illustration: ob4
  }
];

class OverviewSlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        slider1Ref: null,
    };
  }
  componentWillMount() {
    // console.log('routerflux component componentWillMount');
    const { screenProps } = this.props;
    // // console.log('componentWillMount', screenProps);
    // // console.log('componentWillMount', this.props.navigation);
    // // console.log('componentWillMount', this.props.navigation.state);
  }
  componentDidMount() {
    // console.log('routerflux component componentDidMount');
    this.props.screenProps.hideSplashScreen();
  }
  componentWillUnmount() {
    // console.log('routerflux component componentWillUnmount');
  }
  get example1() {
       const { slider1ActiveSlide, slider1Ref } = this.state;

       return (
           <View style={styles.exampleContainer}>
               {/* <Text style={styles.title}>Example 1</Text>
               <Text style={styles.subtitle}>
                   No momentum | Parallax | Scale | Opacity | Pagination with tappable dots
               </Text> */}
               <Carousel
                 ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                 data={ENTRIES1}
                 renderItem={this._renderItem}
                //  renderItem={this._renderItemWithParallax}
                 sliderWidth={sliderWidth}
                 itemWidth={itemWidth}
                 hasParallaxImages={true}
                 firstItem={SLIDER_1_FIRST_ITEM}
                 inactiveSlideScale={0.94}
                 inactiveSlideOpacity={0.6}
                 enableMomentum={false}
                 containerCustomStyle={styles.slider}
                 contentContainerCustomStyle={styles.sliderContentContainer}
                 scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
                 onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
               />
               <Pagination
                 dotsLength={ENTRIES1.length}
                 activeDotIndex={slider1ActiveSlide}
                 containerStyle={styles.paginationContainer}
                 dotColor={'#D8D8D8'}
                 dotStyle={styles.paginationDot}
                 inactiveDotColor={'#D8D8D8'}
                 inactiveDotOpacity={0.5}
                 inactiveDotScale={1}
                 carouselRef={slider1Ref}
                 tappableDots={!!slider1Ref}
               />
           </View>
       );
   }
   _renderItem({ item, index }) {
         return (
             <SliderEntry
               data={item}
               even={(index + 1) % 2 === 0}
             />
         );
     }
   _renderItemWithParallax({ item, index }, parallaxProps) {
         return (
             <SliderEntry
               data={item}
               even={(index + 1) % 2 === 0}
               parallax={true}
               parallaxProps={parallaxProps}
             />
         );
     }
     _onLogedIn(token, account) {
       const { screenProps } = this.props;
       if (screenProps) {
         screenProps.onLogedIn(token, account);
       } else {
          this.props.onLogedIn(token, account);
       }
     }

     _onPressSignUp(navigate) {
    // integrate to signupOverview screen
    // alert('SignUp pressed');
    navigate('SignupOverview', { name: 'Jane' });
    }
     render() {
       const { navigate } = this.props.navigation;
        return (
          <View style={{ flex: 1, width: null, backgroundColor: '#fff' }}>
          <Animatable.Image animation="fadeInDown"
                      iterationCount="infinite"
                      duration={9000}
                      direction="alternate"
                      source={bg} style={styles.background}
          />
              <StatusBar backgroundColor="#fff" />
              <View style={styles.container}>
                  { this.example1 }
                  <View style={styles.buttonInnerContainer}>
                    <ButtonLoginFBAccountKit
                      onLogedIn={(t, a) => this._onLogedIn(t, a)}
                    >
                    <Text

                      style={{
                          justifyContent: 'center',
                          textAlign: 'center',
                          width: 150,
                          //width: widthComponent(0.8),
                          paddingTop: 15,
                          paddingBottom: 15,
                          borderRadius: 6,
                          borderColor: '#FD5B31',
                          borderWidth: 1,
                          color: '#FD5B31',
                          margin: 10,
                          height: 48,
                        }}
                      >
                          LOGIN
                        </Text>

                    </ButtonLoginFBAccountKit>

                    <Button
                         onPress={() => this.props.navigation.navigate('SignupOverview', { name: 'Lucy' })}
                         // onPress = {() => Actions.settings()}
                    >

                    <LinearGradient
                      colors={['#FD5B31', '#E82F14']}
                      locations={[0, 1]}
                      style={{
                      borderRadius: 6,
                      height: 48,

                      width: 150,
                      margin: 10,
                      paddingTop: 15,
                      paddingBottom: 15
                      }}
                    >
                      <Text
                      style={{
                        // borderColor: '#FD5B31',
                        // backgroundColor: '#FD5B31',
                        // borderWidth: 1,
                        textAlign: 'center',
                        height: 48,
                        width: 150,
                        color: '#FFF'
                      }}
                      >
                      SIGN UP
                      </Text>

                      </LinearGradient>
                      </Button>
                  </View>
              </View>
          </View>
        );
    }
}

export default OverviewSlideShow;
