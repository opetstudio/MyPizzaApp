import React, { Component } from 'react'
// import { Body, Container, Content, Header, Icon, Left, Form, Right, Item, Label, Input, Card, CardItem, Text } from 'native-base'
// import CustomButton from '../../Components/CustomButton'

import {View, Text, StyleSheet, ScrollView, Image, TextInput, Alert} from 'react-native'
import {Colors, Fonts, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/dist/Ionicons'

import PrimaryButton from '../../Components/Button/PrimaryButton'

export default class LoginScreen2 extends Component{
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      password: '',
      loginUrl:'http://202.158.24.186:8380/api-v1/processor-user/user/doLogin'
    }
  }

  _doValidate = () => {
    // this.props.navigation.navigate('HomeScreen')
    let username=this.state.name;
    let password=this.state.password;

    if (username !=='' && password !== '')
    {
      this._letsHitApi()
    }
    else {
      Alert.alert('cant be null')
    }

  }

  _letsHitApi() {
      var url = this.state.loginUrl
      // var request = new Request (url, {method: 'POST', body: JSON.stringify({"userId": this.state.name, "password": this.state.password})})

      fetch(url, {method: 'POST', body: JSON.stringify({"userId": this.state.name, "password": this.state.password})})
        .then(response => {
          console.log (response.json())
          if (response.status === 200) {
            // console.log (response.json())
            return response.json()
          } else {
            throw new Error('Something went wrong on api server!')
          }
        })
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
      });
  
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.label}>
              <Icon name='md-arrow-back' style={{marginLeft:30}} size={25}/>
            </View>
            <View style={styles.centered}>
              <Text style={styles.label}>Masuk</Text>
              <Text style={styles.placeholder}>Email</Text>
              <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0.5)'
                  selectionColor="#000"
                  keyboardType="email-address"
                  onChangeText={(name) => this.setState({name})}
              />
              <Text style={styles.placeholder}>Password</Text>
              <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0.5)'
                  selectionColor="#000"
                  secureTextEntry={true}
                  placeholderTextColor = "#ffffff"
                  onChangeText={(password) => this.setState({password})}
              />
            </View>
            <View style={{marginTop: 30}}>
              <PrimaryButton colors={'gradient'} title={'LOGIN'} onPress={this._doValidate} />
            </View>
            <View style={styles.centered}>
              <Text >Lupa kata sandi?</Text>
            </View>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
  paddingBottom: Metrics.baseMargin
  },
  centered: {
    alignItems: 'center'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:0,
    fontSize:16,
    color:Colors.blackSecondaryOpacity,
    marginBottom: 10
  },
  placeholder: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:0,
    fontSize:16,
    color:Colors.blackSecondaryOpacity
  },
   label: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:0,
    marginTop:10,
    marginBottom:25,
    fontSize:25,
    fontWeight: 'bold',
    color:Colors.blackSecondaryOpacity
  }

})
