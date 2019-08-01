import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActionSheetIOS,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DialogAndroid from 'react-native-dialogs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../styles/EditProfileContainer.style';
import { ITEMS_IMAGE_PICKER, ENTITY_USER } from '../constants';
import { update_userprofile, saveProfilePicture } from '../actions/UserprofileAction';
import { upload_file } from '../api/rayaku-file-py';

import { getConf } from '../conf';

// const conf = getConf('rayaku-file-js');
const conf = getConf('rayaku-file-py');
const host = conf.host;

const icon_avatar = require('../assets/images/default-avatar.png');

let PicturePath = '';
const source = '';
let IS_UPLOADED = false;

class EditProfileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._storePictureBackend = this._storePictureBackend.bind(this);
    this._renderDisplayName = this._renderDisplayName.bind(this);
    this._onSubmitTextInput = this._onSubmitTextInput.bind(this);
    this._onChangeTextInput = this._onChangeTextInput.bind(this);
    this._imagePickerCrop = this._imagePickerCrop.bind(this);
    this._getSourceAvatar = this._getSourceAvatar.bind(this);
    this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
  }
  componentWillMount() {
    console.log('[EditProfileContainer] componentWillMount ', this.props);
    this.state.selfNumber = this.props.selfNumber;
    this.state.profile_picture = this.props.profile_picture;
    this.state.profile_picture_device = this.props.profile_picture_device;
    this.state.display_name = this.props.display_name;
    this.state.source_avatar = this._getSourceAvatar(this.props.profile_picture, this.state.profile_picture_device);
    // this.state.uploaded = false;
  }

  componentWillReceiveProps(nextProps) {
    console.log('[EditProfileContainer] componentWillReceiveProps ', nextProps);
    this.state.selfNumber = nextProps.selfNumber;
    this.state.display_name = nextProps.display_name;
    this.state.profile_picture_device = nextProps.profile_picture_device;
    this.setState({
      profile_picture: nextProps.profile_picture,
      source_avatar: this._getSourceAvatar(nextProps.profile_picture, nextProps.profile_picture_device)
    });
    // this.state.source_avatar = this._getSourceAvatar(nextProps.profile_picture);
  }
  
  componentWillUnmount() {
  }

  _imagePickerCrop() {
    if (Platform.OS === 'android') {
      const itemsCallback = (id) => {
        if (id === 0) this._cameraPicker();
        else if (id === 1) this._galleryPicker();
        // else ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT);
      };

      const options = {
        title: 'Select a photo',
        items: ITEMS_IMAGE_PICKER,
        itemsCallback
      };

        const dialog = new DialogAndroid();
        dialog.set(options);
        dialog.show();
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
        options: ITEMS_IMAGE_PICKER,
        title: 'Select a photo',
        cancelButtonIndex: 2
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log('index 0 open camera');
            this._cameraPicker();
          } else if (buttonIndex === 1) {
            console.log('index 0 open gallery');
            this._galleryPicker();
          }
        }
      );
    }
  }

  _galleryPicker() {
    console.log('gallery picker run');
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        includeExif: true,
        mediaType: 'photo',
        smartAlbums: ['PhotoStream', 'UserLibrary'] //ios only
      }).then((image) => {
        console.log(image);

        // const source = { uri: `data:image/jpeg;base64,${image.data}` };
        PicturePath = `${image.path}`;
        const newProfilePicture = `photo-${Date.now()}.jpg`;

         this.state.profile_picture = newProfilePicture;
         this.state.profile_picture_device = PicturePath;

         const picture_new_name = newProfilePicture;
         const profile_picture_device_path = PicturePath;
   
         this._storePictureBackend({
          picture_new_name,
           profile_picture_device_path,
           mime: image.mime,
           filename: image.filename || picture_new_name,
           sourceURL: image.sourceURL || image.path
         });
        //  this._onSubmitTextInput();
      });
  }

  _cameraPicker() {
    console.log('camera picker run');
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      includeExif: true,
      mediaType: 'photo',
      smartAlbums: ['PhotoStream', 'UserLibrary'] //ios only
    }).then((image) => {
      console.log(image);

      // const source = { uri: `data:image/jpeg;base64,${image.data}` };
      PicturePath = `${image.path}`;

      const newProfilePicture = `photo-${Date.now()}.jpg`;

      
         this.state.profile_picture = newProfilePicture;
         this.state.profile_picture_device = PicturePath;
      
      const picture_new_name = newProfilePicture;
      const profile_picture_device_path = PicturePath;

      this._storePictureBackend({
        picture_new_name,
        profile_picture_device_path,
        mime: image.mime,
        filename: image.filename || picture_new_name,
        sourceURL: image.sourceURL || image.path
      });
      // this._onSubmitTextInput();
    });
  }

  _storePictureBackend({
    picture_new_name, profile_picture_device_path, mime, filename, sourceURL
  }) {
    if (PicturePath) {
        // Create the form data object
        upload_file({
          // PicturePath,
          // new_name: this.state.profile_picture,
          PicturePath: profile_picture_device_path,
          new_name: picture_new_name,
          userid: this.props.selfNumber,
          msisdn: this.props.selfNumber,
          entity: ENTITY_USER,
          mime,
          filename,
          sourceURL
        }, (progress) => {
          console.log('[EditProfileContainer] _storePictureBackend progress ', progress);
        })
        .then((resp) => {
          console.log('[EditProfileContainer] _storePictureBackend resp ', resp);
          if (resp && resp.status) {
            IS_UPLOADED = true;
            // update to redux
            this.props.saveProfilePicture({
              profile_picture: picture_new_name,
              profile_picture_device: profile_picture_device_path
            });
          } else {
            Alert.alert(resp.e);
          }
        })
        .catch((err) => {
          Alert.alert('Upload Failed. Please try again...');
        });
    }
  }

  _onChangeTextInput(text) {
    this.setState({ display_name: text });
  }

  _onSubmitTextInput() {
    this.props.update_userprofile({
      phone_number: this.state.selfNumber || '',
      profile_picture: this.state.profile_picture || '',
      profile_picture_device: this.state.profile_picture_device || '',
      display_name: this.state.display_name || '',
    });
  }

  _getSourceAvatar(profile_picture, profile_picture_device) {
    // let source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/yooona.jpg` } : icon_avatar;
    let source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/large_${profile_picture}` } : icon_avatar;
    if (IS_UPLOADED) {
      source_avatar = profile_picture_device !== '' ? { uri: `${profile_picture_device}` } : icon_avatar;
    }
    return source_avatar;
  }

  _onErrorLoadImage() {
      this.setState({
        source_avatar: icon_avatar
      });
  }

  _renderDisplayName() {
      return (
            <TextInput
              value={this.state.display_name}
              multiline={false}
              onChangeText={this._onChangeTextInput}
              onSubmitEditing={this._onSubmitTextInput}
              underlineColorAndroid="transparent"
              style={styles.nameTitle}
            />
    );
  }


  render() {
    console.log('[EditProfileContainer] state=', this.state);
    return (
      <KeyboardAvoidingView style={styles.container} behavior='position'>

          <TouchableHighlight
            onPress={() => { this._imagePickerCrop(); }}
          >
            <Image
              source={this.state.source_avatar}
              style={styles.imgProfile}
              resizeMode='cover'
              onError={() => { this._onErrorLoadImage(); }}
              // onError={(e) => { this.props.source = image_source_onerror; }}
            />
          </TouchableHighlight>
          <View style={styles.editBox}>
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <View style={styles.nameBox}>

                  {this._renderDisplayName()}
                </View>
                <View style={{ marginTop: 17 }} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.profileBox}>
                  <Text style={styles.profileBoxText}>Edit Name</Text>
                </View>
                <View style={{ marginTop: 17 }} />
              </View>
            </View>

        {/* <TouchableHighlight
          onPress={() => { alert('Add More Info'); }}>
          <View style={styles.subList}>
              <Text>Add More Info</Text>
              <View style={styles.subViewRight}>
                <Text style={{ color: colors.mediumGray }}>></Text>
              </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
         onPress={() => { alert('Add More Info'); }}>
          <View style={styles.subList}>
              <Text>Privacy Settings</Text>
              <View style={styles.subViewRight}>
                <Text style={{ color: colors.mediumGray }}>></Text>
              </View>
          </View>
        </TouchableHighlight> */}

        <View style={{ height: 60, backgroundColor: 'white' }} />
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
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
      update_userprofile,
      saveProfilePicture
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileContainer);
