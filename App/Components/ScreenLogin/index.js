import React from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/dist/Ionicons'

import PrimarynButton from '../Button/PrimaryButton'

class ScreenLogin extends React.Component {
  static propTypes = {
    loginRequest: PropTypes.func,
    sessionToken: PropTypes.string
  }
  static defaultProps = {
    loginRequest: () => {}
    // sessionToken: null
  }
  constructor (props) {
    super(props)
    this.state = {
      userid: '',
      password: '',
      sessionToken: this.props.sessionToken
    }
    this._doLogin = this._doLogin.bind(this)
    console.log('this.props====>', this.props)
  }
  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate this.props.sessionToken=', this.props.sessionToken)
    if (this.props.sessionToken !== null && !_.isEqual(prevProps.sessionToken, this.props.sessionToken)) {
      this.props.navigation.navigate('App')
    }
  }
  _doLogin () {
    console.log('state===>', this.state)
    let username = this.state.userid
    let password = this.state.password

    console.log('user =' + username)
    console.log('pass =' + password)
    if (username !== '' && password !== '') {
      this.props.loginRequest({userid: username, password: password})
      // fetch(
      //   this.state.loginUrl
        // {
        //   method: 'POST',
        //   body: JSON.stringify({'userId': username, 'password': password}),
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   }
        // }
      // )
        // .then(response => {
        //   console.log(response.json())
        //   if (response.status === 200) {
        //     // console.log (response.json())
        //     return response.json()
        //   } else {
        //     throw new Error('Something went wrong on api server!')
        //   }
        // })
        // .then(response => {
        //   console.log(response)
        // }).catch(error => {
        //   console.log(error)
        // })
      console.log('benerrrrrrrrrrrrr')
    } else {
      console.log('errrorrrrrrrrrr')
      // Alert.alert('cant be null')
    }
  }
  render () {
    console.log('render===>ssssss', this.props)
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.label}>
            <Icon name='md-arrow-back' style={{marginLeft: 30}} size={25} />
          </View>
          <View style={styles.centered}>
            <Text style={styles.label}>Masuk</Text>
            <Text style={styles.placeholder}>Email</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0.5)'
              selectionColor='#000'
              keyboardType='email-address'
              onChangeText={(v) => this.setState({userid: v})}
              />
            <Text style={styles.placeholder}>Password</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0.5)'
              selectionColor='#000'
              secureTextEntry
              placeholderTextColor='#ffffff'
              onChangeText={(v) => this.setState({password: v})}
              />
          </View>
          <View style={{marginTop: 30}}>
            <PrimarynButton colors={'gradient'} title={'LOGIN'} onPress={() => this._doLogin()} />
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
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    fontSize: 16,
    color: Colors.blackSecondaryOpacity,
    marginBottom: 10
  },
  placeholder: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    fontSize: 16,
    color: Colors.blackSecondaryOpacity
  },
  label: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.blackSecondaryOpacity
  }

})

export default ScreenLogin
