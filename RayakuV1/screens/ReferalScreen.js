import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
  // StatusBarIOS
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Actions } from 'react-native-router-flux';
import { referalAPI } from '../api/rayaku-coins-referal';

import styles, { PAGE_HEIGHT } from '../styles/Referal.style';


const bg = require('../assets/images/confetti-bg-80.png');
const icon_back = require('../assets/images/back_white.png');


class ReferalScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {};
    this._requestReferal = this._requestReferal.bind(this);
  }

  _requestReferal(){
    console.log('aaaaaaaaaa')
    referalAPI({
      EVENT_ID: 'EVENT001',
      TRX_ID: Date.now(),
    }, (progress) => {
      console.log('hitAPItest');
    })
    .then(resp=>{})
    .catch(err=>{});
  }

  render() {
    // const title = this.state.title || 'No Title';
    // const data = this.state.data || 'No Data';
    // ////console.log('Login RENDER');
    return (
      <View style={{ flex: 1, width: null }}>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={{
          justifyContent: 'flex-start',
          width: 100,
        }}>
          </View>
          <Image
          style={[styles.background, { opacity: 0.2, height: PAGE_HEIGHT }]}
          resizeMode = 'cover'
          source={bg}/>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={style=styles.leftButton}
            >
              <View
                style={style=styles.circleBackground}
              >
                <Image
                  style={style=styles.imgLeftButton}
                  resizeMode="contain"
                  source={icon_back}
                  // backgroundColor={colors.darkGray}
                />
              </View>
            </TouchableOpacity>
            <View style={style=styles.bodyContent}>
              <Text
              style={style=styles.earnCoinsTitle}
              >
                Earn Extra Coins!
              </Text>
              <Text style={style=styles.textBodyContent}>
                if you are joining rayaku from invitation,
              </Text>
              <Text style={style=styles.textBodyContent}>
                you can fill this with phone number
              </Text>
              <Text style={style=styles.textBodyContent}>
                that invites you.
              </Text>
              <View style={{ width: 200, height: 50, marginTop: 30,}}>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={style=styles.inputNumber}
                  placeholder="+62"
                  keyboardType='numeric'
                  placeholderTextColor='#a9acad'
                />
              </View>
            </View>
            <View style={style=styles.buttonArea}>
            <TouchableOpacity 
                onPress = {() => 
                  // 
                  this._requestReferal()
                }
            >

              <View style={style=styles.earnCoinsButton} >
                <Text
                style={style=styles.earnCoinsText}
                >
                  EARN COINS
                </Text>
              </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <View
                  style={style=styles.skipButton}
                >
                  
                  <Text style={style=stlyes.skipButtonText>SKIP</Text>
                </View>
                </TouchableOpacity> */}
            </View>
           
      </View>
    );
  }
}

export default ReferalScreen;
