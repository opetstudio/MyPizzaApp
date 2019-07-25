import React from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView, CheckBox, Alert} from 'react-native'
import PropTypes from 'prop-types'
import {Colors, Fonts, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/dist/Ionicons';


import PrimaryButton from '../Button/PrimaryButton'

class ScreenSignup extends React.PureComponent {
  static propTypes = {
    signupRequest: PropTypes.func
    // sessionToken: PropTypes.string
  }
  static defaultProps = {
    signupRequest: () => {}
    // sessionToken: null
  }
  constructor(props){
    super(props)
    this.state = {

      userid: "",
      password: "",
      password2: "",
      telp: "",
      kodeRef: "",
      checked: false
    }
    this._doSignup = this._doSignup.bind(this)
  }

  _handleChange = () => {
    this.setState(previousState => {
      return { checked: !previousState.checked };
    })
  }

  _doSignup() {
    let email = this.state.userid
    let pass = this.state.password
    let tel = this.state.telp 
    let kode = this.state.kodeRef
    let chk = this.state.checked

    console.log("email "+email)
    console.log("pass "+pass)
    console.log("tel "+tel)
    console.log("kode "+kode)
    console.log("chk "+chk)

    if (email!=="" && pass!=="" && tel!=="" && kode !=="" && chk) {
        this.props.signupRequest({userid: email, password: pass, telp: tel, kodeRef: kode})
    } else {
      Alert.alert('please fill the form')
    }
  }

  render () {
    return (
            // <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.mainContainer}>
                    <ScrollView style={styles.container}>
                        <View style={styles.label}>
                        <Icon name='md-arrow-back' style={{marginLeft:30}} size={25}/>
                        </View>
                        <View style={styles.centered}>
                        <Text style={styles.label}>Daftar</Text>
                        <Text style={styles.placeholder}>Email</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0.5)'
                            selectionColor="#000"
                            keyboardType="email-address"
                            onChangeText={(v) => this.setState({userid: v})}
                        />
                        <Text style={styles.placeholder}>No Handphone</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0.5)'
                            selectionColor="#000"
                            keyboardType="number"
                            onChangeText={(v) => this.setState({telp: v})}
                        />
                        <Text style={styles.placeholder}>Kata Sandi</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0.5)'
                            selectionColor="#000"
                            secureTextEntry={true}
                            placeholderTextColor = "#ffffff"
                            onChangeText={(v) => this.setState({password: v})}
                        />
                        <Text style={styles.placeholder}>Ulangi Kata Sandi</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0.5)'
                            selectionColor="#000"
                            secureTextEntry={true}
                            placeholderTextColor = "#ffffff"
                            onChangeText={(v) => this.setState({password2: v})}
                        />
                        <Text style={styles.placeholder}>Kode Referal</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0.5)'
                            selectionColor="#000"
                            keyboardType="number"
                            onChangeText={(v) => this.setState({kodeRef: v})}
                        />
                         <View style={styles.checkbox}>
                            <CheckBox 
                              checked={this.state.checked}
                              onChange={this._handleChange}/>
                            <Text>saya setuju dengan syarat dan ketentuan yang ada</Text>
                        </View>
                        </View>
                       
                        <View style={{marginTop: 30}}>
                          <PrimaryButton colors={'gradient'} title={'DAFTAR'} onPress={() => this._doSignup()}/>
                        </View>
                    </ScrollView>
                </View>
            // </KeyboardAvoidingView>
    )
  }
}

    
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

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
    marginBottom:15,
    fontSize:25,
    fontWeight: 'bold',
    color:Colors.blackSecondaryOpacity
  },
  checkbox: {
      flexDirection: 'row',
      marginHorizontal: 25,
      marginTop: 5
  }

})


export default ScreenSignup
