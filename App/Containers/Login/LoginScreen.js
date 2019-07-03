import React, { Component } from 'react'
import { ScrollView, Image, View, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title
} from 'native-base'
import _ from 'lodash'
import PropTypes from 'prop-types'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SessionActions from '../../Redux/SessionRedux'
import LoginActions from './LoginRedux'
// import YourActions from '../Redux/YourRedux'
import { Images } from '../../Themes'
import AppConfig from '../../Config/AppConfig'
import {WebsocketSelectors} from '../../Redux/WebsocketRedux'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'
// Styles
import styles from './LoginScreenStyle'

// const client = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
// const contentDefaultMessage = 'Start writing your document here'
let client = null

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    // this.props.sessionUpdate({isLogedIn: 'yes'})
    this.state = {
      open: false,
      email: '',
      password: '',
      socketClientStatus: this.props.socketClientStatus,
      socketClient: this.props.socketClient
    }
    client = this.props.socketClient
    // this.socket = this.props.socketClient
    // this.socket = new WebSocket('wss://echo.websocket.org/')
    this.emit = this.emit.bind(this)
  }
  componentDidMount () {
    // AsyncStorage.getItem('SOCKET_CLIENT').then(res => {
    //   client = res
    // })
    // client.onopen = (e) => {
    //   console.log('on open e=', e)
    //   // client.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}))
    // }
    // client.onmessage = (e) => {
    //   console.log('on message', e)
    // }
    // client.onerror = (err) => {
    //   console.log('on error err=', err)
    // }
    // this.socket.onerror(err => {
    //   console.log('websocket on error', err)
    // })
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.socketClient, this.props.socketClient)) {
      this.setState({
        socketClientStatus: this.props.socketClientStatus,
        socketClient: this.props.socketClient
      })
    }
  }
  emit () {
    this.setState(prevState => ({
      open: !prevState.open
    }))

    var action = 'login'
    var userid = this.state.email
    var pw = this.state.password
    var loginAction = {
      action, userid, pw
    }
    this.state.socketClient.send(JSON.stringify(loginAction))
  }
  renderLoginForm () {
    // const { externalRef } = this.props;
    return (

      <Container style={{ paddingTop: 0, backgroundColor: 'rgba(52, 52, 52, 0.8)', height: 150 }}>
        {/* <Header>
          <Body>
            <Title>LOGIN</Title>
          </Body>
        </Header> */}
        <Form>
          <FormItem>
            <Label>Email</Label>
            <Input onChangeText={(e) => {
              this.setState({email: e})
            }} style={{color: 'white'}} />
          </FormItem>
          <FormItem last>
            <Label>Password</Label>
            <Input secureTextEntry onChangeText={(e) => this.setState({password: e})} style={{color: 'white'}} />
          </FormItem>

          <Button full primary style={{ paddingBottom: 4 }} onPress={(e) => {
            // this.props.loginRequest(this.state)
            this.emit()
          }}>
            <Text> Login </Text>
          </Button>
          {/* <Button full light primary><Text> Sign Up </Text></Button> */}
        </Form>
      </Container>

    )
  }
  render () {
    console.log('render this.state====>', this.state)
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <KeyboardAvoidingView behavior='padding' enabled>
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Image source={Images.launch} style={styles.logo} />
            </View>
            <View style={styles.section}>
              {this.renderLoginForm()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// LoginScreen.propTypes = {
//   input: PropTypes.object,
//   externalRef: PropTypes.object
// }

const mapStateToProps = (state) => {
  // console.log('state.websocket==>', state.websocket)
  return {
    socketClientStatus: WebsocketSelectors.getClient(state.websocket),
    socketClient: WebsocketSelectors.getSocketClient(state.websocket)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // sessionUpdate: data => dispatch(SessionActions.sessionUpdate(data)),
    loginRequest: data => dispatch(LoginActions.loginRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
