import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ActionSheetIOS,
  Alert,
  ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';
import DialogAndroid from 'react-native-dialogs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles, { PAGE_HEIGHT, colors, widthComponent } from '../styles/index.style';
import { ITEMS_IMAGE_PICKER } from '../constants';
import { update_userprofile } from '../actions/UserprofileAction';
import { upload_file } from '../api/rayaku-file-py';

const bg = require('../assets/images/confetti-bg-80.png');
const verified_icon = require('../assets/images/onboard-1.png');
const user_icon = require('../assets/images/user_icon.png');
const camera_icon = require('../assets/images/camera.png');

const PicturePath = '';
const source = '';
const session = {
  display_name: '',
  profile_picture: '',
  selfNumber: '',
  profile_picture_device: ''
};

class CreateProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    //  StatusBarIOS.setHidden(true);
    this._submitProfile = this._submitProfile.bind(this);
    this._imagePickerCrop = this._imagePickerCrop.bind(this);
    this._renderMessageText = this._renderMessageText.bind(this);
    this._renderButtonDone = this._renderButtonDone.bind(this);
    this._onChangeFullName = this._onChangeFullName.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    ////console.log('');
    this._storePictureBackend = this._storePictureBackend.bind(this);
    //this._storedDisplayName = this._storedDisplayName.bind(this);
    this._onSubmitTextInput = this._onSubmitTextInput.bind(this);
  }
  componentWillMount() {
    ////console.log('[CreateProfileScreen] component componentWillMount');
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);


      this.state.source = '';

      this.state.containMode = 'cover';
      this.state.borderColor = '#d6d7da';
      this.state.alert = '';

      this.state.textInfo = 'Lets put your basic information here.';
      this.state.textInfo2 = 'You can always update it later.';

      this.state.textAlert = 'Lets first put your name';
      this.state.textAlert2 = 'and a nice profile picture.';

      //userprofile
      this.state.display_name = this.props.display_name;
      this.state.profile_picture = this.props.profile_picture;
      this.state.profile_picture_device = this.props.profile_picture_device;
      this.state.selfNumber = this.props.selfNumber;

      this.state.progress = 0;
      // this.state.session = {
      //   ...session,
      //   display_name: this.props.display_name,
      //   profile_picture: this.props.profile_picture,
      //   selfNumber: this.props.selfNumber,
      //   profile_picture_device: this.props.profile_picture_device
      // }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    ////console.log('[CreateProfileScreen] componentWillReceiveProps ', nextProps);
    // this.state.display_name = nextProps.display_name;
    // this.state.session.selfNumber = nextProps.selfNumber;

    this.state.display_name = nextProps.display_name;
    this.state.profile_picture = nextProps.profile_picture;
    this.state.profile_picture_device = nextProps.profile_picture_device;
    this.state.selfNumber = nextProps.selfNumber;
  }
  _submitProfile() {
    this._onSubmitTextInput();
    Actions.pop();
  }
  _keyboardDidShow(e) {
      this.setState({ displayMode: 'none',
                      borderColor: 'transparent',
                      textAlert: '',
                      textAlert2: '',
                      textInfo: '',
                      textInfo2: ''});
  }
  _keyboardDidHide(e) {
    this.setState({
      displayMode: null
    });
  }
  _imagePickerCrop() {
    if (Platform.OS === 'android') {
      const itemsCallback = (id, text) => {
        if (id === 0) this._cameraPicker();
        else if (id === 1) this._galleryPicker();
        else ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT);
      }

      const options = {
        title: "Select a photo",
        items: ITEMS_IMAGE_PICKER,
        itemsCallback
      };

        const dialog = new DialogAndroid();
        dialog.set(options);
        dialog.show();
    }
    else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ITEMS_IMAGE_PICKER,
        title: 'Select a photo',
        cancelButtonIndex: 2
      },
      (buttonIndex, text) => {
        if (buttonIndex === 0) {
          console.log('index 0 open camera');
          this._cameraPicker();
        }
        else if (buttonIndex === 1) {
          console.log('index 0 open gallery');
          this._galleryPicker();
        }
      });
    }
  }

  _galleryPicker() {
    console.log('gallery picker run');
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
        smartAlbums: ['PhotoStream', 'UserLibrary'] //ios only
      }).then((image) => {
        console.log(image);

        const base = image.data ? { uri: `${image.path}` } : '';
        PicturePath = `${image.path}`;
        this.state.profile_picture = `photo-${Date.now()}.jpg`;
        this.state.profile_picture_device = PicturePath;

        this.state.source = base;
        this.state.borderColor = 'transparent';

        this._onSubmitTextInput();
        this._storePictureBackend();
        this.setState({
          profile_picture_device: PicturePath
        });
      });
  }

  _cameraPicker() {
    console.log('camera picker run');
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
      smartAlbums: ['PhotoStream', 'UserLibrary'] //ios only
    }).then((image) => {
      console.log(image);

      const base = image.data ? { uri: `${image.path}` } : '';
      PicturePath = `${image.path}`;

      this.state.profile_picture = `photo-${Date.now()}.jpg`;
      this.state.profile_picture_device = PicturePath;

      this.state.source = base;
      this.state.borderColor = 'transparent';

      this._onSubmitTextInput();
      this._storePictureBackend();
      this.setState({
        profile_picture_device: PicturePath
      });
    });
  }

  //save picture here
  _storePictureBackend() {
      if (PicturePath) {
        // Create the form data object
        upload_file({
          PicturePath,
          new_name: this.state.profile_picture
        }, (progress) => {
          this.setState({
            progress: progress
          });
        })
        .then((resp)=> {})
        .catch((err)=> {});
    }
  }
  _onChangeFullName(value) {
    this.setState({ display_name: value });
  }

  _onSubmitTextInput() {
    this.props.update_userprofile({
      phone_number: this.state.selfNumber || '',
      profile_picture: this.state.profile_picture || '',
      profile_picture_device: this.state.profile_picture_device || '',
      display_name: this.state.display_name || '',
    });
    // this.props.sessionDisplay(this.state.session);
  }

  _renderMessageText() {
    if (this.state.profile_picture_device && this.state.display_name) {
      return (
        <View style={{}}>
          <Text
            style={{ fontSize: 18, color: '#E82F14' }}
          >Great!</Text>
        </View>
      );
    }
    return (
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text
          style={{ fontSize: 14, color: '#161514', opacity: 0.5 }}
        >{this.state.textAlert}</Text>
        <Text
          style={{ fontSize: 14, color: '#161514', opacity: 0.5 }}
        >{this.state.textAlert2}</Text>
      </View>
    );
  }
  _renderButtonDone() {
    if (this.state.profile_picture_device && this.state.display_name) {
      return (
        <View style={{}}>
          <LinearGradient
            colors={['#FD5B31', '#E82F14']}
            locations={[0, 1]}
            style={{
              borderRadius: 6,
              height: 48,
              justifyContent: 'center',
              width: widthComponent(0.8),
              paddingTop: 15,
              paddingBottom: 15,
              //backgroundColor: 'red',
            }}
          >
            <Button
              onPress={() => { this._submitProfile(); }}
              style={{
                color: '#FFF',
                backgroundColor: 'transparent',
              }}
            >
            DONE
            </Button>
          </LinearGradient>
        </View>
      );
    }
    return (
      <View style={{}}>
        <Button
          onPress={() => {
            this.setState({
              textAlert: 'Lets first put your name',
              textAlert2: 'and a nice profile picture.'
            });
          }}
          style={{
            backgroundColor: '#fff',
            width: widthComponent(0.8),
            paddingTop: 13,
            paddingBottom: 15,
            borderRadius: 6,
            borderColor: '#FFC2B2',
            borderWidth: 1,
            color: '#FFC2B2',
            height: 48,
          }}
        >
          DONE
        </Button>
      </View>
    );
  }

  render() {
    // console.log('[CreateProfileScreen] render');

    let image_source = this.state.profile_picture_device !== '' ? { uri: `${this.state.profile_picture_device}` } : '';
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior= {Platform.OS === 'ios' ? 'padding' : null}>

        <StatusBar translucent backgroundColor="transparent" />
          <Image
          style={[styles.background, {height: PAGE_HEIGHT, opacity: 0.1}]}
          resizeMode = 'cover'
          source={bg}/>
            <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                  //backgroundColor: 'red'
                }}
              >

                    <View style={{
                      //backgroundColor: 'yellow',
                      flex: 1,
                      alignItems: 'center',
                      paddingBottom: 10}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                          marginBottom: 20,
                          marginTop: 35,
                          backgroundColor: 'transparent' }}
                      >This is you!</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#161514',
                          opacity: 0.5,
                          backgroundColor: 'transparent' }}
                      >{this.state.textInfo}</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#161514',
                          opacity: 0.5,
                          backgroundColor: 'transparent',

                        }}
                      >{this.state.textInfo2}</Text>
                    </View>

                      <View
                        style={{
                          //backgroundColor: 'blue',
                          flex: Platform.OS === 'ios' ? 0 : 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: Platform.OS === 'ios' ? 0 : 0,
                            borderColor: this.state.profile_picture_device !== '' ? this.state.borderColor : '#d6d7da',
                            borderRadius: 30,
                            borderWidth: 0.8,
                            width: widthComponent(0.3),
                            height: widthComponent(0.3),
                            margin: 20,
                            padding: this.state.profile_picture_device !== '' ? 0 : 12,
                            //backgroundColor: 'red'
                          }}
                        >
                          { this.state.profile_picture_device !== '' ?
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              alignSelf: 'center',
                              borderRadius: 30
                            }}
                            resizeMode= 'cover'
                            //resizeMode='contain'
                            source={image_source}
                          /> :
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              alignSelf: 'center',
                              borderRadius: 0
                            }}
                            resizeMode= 'contain'
                            //resizeMode='contain'
                            source={user_icon}
                          />
                        }
                        </View>
                        <View
                          style={{
                            display: this.state.displayMode,
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            borderWidth: 0.5,
                            borderColor: '#d6d7da',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => { this._imagePickerCrop(); }}
                          >
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                              alignSelf: 'center',

                            }}
                            resizeMode="contain"
                            source={camera_icon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                <View
                  style={{
                    flex: Platform.OS === 'ios' ? 0.4 : 0.9,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.00)', 'rgba(74,74,74,0.04)']}
                    locations={[0, 0.99]}
                    style={{
                      width: 300,
                    }}
                  >
                    <TextInput
                      value={this.state.display_name}
                      underlineColorAndroid='transparent'
                      multiline={false}
                      style={{
                        fontSize: 20,
                        color: '#000',
                        textAlign: 'center',
                        width: 300,
                        borderBottomWidth: 1,
                        borderBottomColor: '#D3DDE0',
                        // backgroundColor: 'black'
                        // borderColor: 'gray',
                        // borderWidth: 1
                      }}
                      onChangeText={this._onChangeFullName}
                      placeholder="Group Name"
                      placeholderTextColor='#D3DDE0'
                    />
                  </LinearGradient>
                </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'yellow',
                      //backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                        width: '100%',
                        // backgroundColor: 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {this._renderMessageText()}
                    </View>
                    <View
                      style={{
                        //flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 30,
                        // backgroundColor: 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {this._renderButtonDone()}
                    </View>
                  </View>
          </View>
      </KeyboardAvoidingView>

    );
  }
}


function mapStateToProps(state) {
  ////console.log('[CreateProfileScreen] mapStateToProps ');
  return {
    selfNumber: state.SessionReducer.sessionPhoneNumber,
    display_name: state.UserprofileReducer.display_name,
    profile_picture: state.UserprofileReducer.profile_picture,
    profile_picture_device: state.UserprofileReducer.profile_picture_device
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      update_userprofile
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfileScreen);
