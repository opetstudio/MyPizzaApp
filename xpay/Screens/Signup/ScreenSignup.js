import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, ImageBackground } from 'react-native'
import {Container, Header, Left, Button, Icon, Body, Title, Right} from 'native-base'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialFixedLabelTextbox from '../../Components/InputText/MaterialFixedLabelTextbox'
import MaterialButtonViolet from '../../Components/Button/MaterialButtonViolet'
import {Images, Colors, Metrics} from '../../Themes'

export default class ScreenSingup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (name, value) {
    this.setState({form: {...this.state.form, [name]: value}})
  }
  handleSubmit () {
    console.log('submit form ', this.state.form)
    this.props.navigation.navigate('ScreenEmailconfirm')
  }
  render () {
    return (
    <Container style={styles.container}>
        <ImageBackground source={Images.backgroundXpay} style={styles.backgroundImg}>
            <Header>
                <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
                </Left>
                <Body>
                <Title>Signup</Title>
                </Body>
                <Right />
            </Header>
          <ScrollView>
            <MaterialFixedLabelTextbox name='email' onChangeText={this.handleChange} placeholder={'Email'} />
            <MaterialFixedLabelTextbox name='fullname' onChangeText={this.handleChange} placeholder={'Full Name'} />
            <MaterialFixedLabelTextbox name='noId' onChangeText={this.handleChange} placeholder={'No. ID'} />
            <MaterialFixedLabelTextbox name='address' onChangeText={this.handleChange} placeholder={'Address'} multiline style={styles.TextboxAddress} />
            <MaterialFixedLabelTextbox name='phoneNumber' onChangeText={this.handleChange} placeholder={'Phone Number'} />
            <MaterialButtonViolet onPress={this.handleSubmit} />

          </ScrollView>
        </ImageBackground>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  backgroundImg: {
        flex: 1,
        width: Metrics.screenWidth
    },
  rect: {
    width: '100%',
    height: 56,
    backgroundColor: '#eb1c24'
  },
  iconBack: {
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    height: 40,
    width: 40,
    marginTop: 7,
    marginLeft: 10
  },
  text: {
    top: 12,
    left: 60,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 20
  },
  TextboxEmail: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 26
  },
  TextboxFullname: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoID: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 14
  },
  TextboxAddress: {
    width: 350,
    height: 142,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 13
  },
  TextboxNoHP: {
    width: 350,
    height: 59,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 12
  },
  ButtonVioletSignUp: {
    // width: 350,
    // height: 59,
    // backgroundColor: '#eb1c24',
    // borderRadius: 5,
    // alignSelf: 'center',
    // marginTop: 24
  },
  statusBar: {}
})
