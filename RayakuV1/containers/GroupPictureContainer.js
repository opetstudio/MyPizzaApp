import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ActionSheetIOS,
  Alert,
  ToastAndroid,
  Image,
  TextInput
}
from 'react-native';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import DialogAndroid from 'react-native-dialogs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateGroupProfile, onChangeGroupNameInputText, onChangeGroupPicture, clearFormCreateGroup } from '../actions/GroupprofileAction';

import styles, { PAGE_HEIGHT, widthComponent } from '../styles/index.style';
import { upload_file } from '../api/rayaku-file-py';
import { ITEMS_IMAGE_PICKER } from '../constants';
import { colors } from '../styles/color.style';

class GroupPictureContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._onChangeFullName = this._onChangeFullName.bind(this);
    this._onSubmitTextInput = this._onSubmitTextInput.bind(this);
    this._storePictureBackend = this._storePictureBackend.bind(this);
  }
  componentWillMount() {
    // console.log('[GroupPictureContainer] componentWillMount', this.props);
    this.state.group_name = this.props.group_name;
    this.state.group_profile_picture = this.props.group_profile_picture;
    this.state.group_profile_picture_device = this.props.group_profile_picture_device;
  }
  componentWillReceiveProps(nextProps) {
    // console.log('[CreateProfileScreen] componentWillReceiveProps ', nextProps);
    this.setState({
      group_name: nextProps.group_name,
      group_profile_picture: nextProps.group_profile_picture,
      group_profile_picture_device: nextProps.group_profile_picture_device
    });
  }
  componentDidMount() {
    // console.log('[GroupPictureContainer] componentWillMount did mount', this.props);
  }
  componentWillUnmount() {
    this.props.clearFormCreateGroup();
  }
  _imagePickerCrop() {
    if (Platform.OS === 'android') {
      const itemsCallback = (id, text) => {
        if (id === 0) this._cameraPicker();
        else if (id === 1) this._galleryPicker();
        else ToastAndroid.show(`${id}: ${text}`, ToastAndroid.SHORT);
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
        mediaType: 'photo',
        smartAlbums: ['PhotoStream', 'UserLibrary'] // ios only
      }).then((image) => {
        console.log(image);

        const base = image.data ? { uri: `${image.path}` } : '';
        const PicturePath = `${image.path}`;

        const group_profile_picture = `group_photo-${Date.now()}.jpg`;
        const group_profile_picture_device = PicturePath;
        this.state.borderColor = 'transparent';

        this.props.onChangeGroupPicture({
          group_profile_picture,
          group_profile_picture_device
        });
        this._storePictureBackend({
          group_profile_picture,
          group_profile_picture_device,
          mime: image.mime,
          filename: image.filename || group_profile_picture,
          sourceURL: image.sourceURL || PicturePath
        });
        // this.setState({
        //   profile_picture_device: PicturePath
        // });
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
      smartAlbums: ['PhotoStream', 'UserLibrary'] // ios only
    }).then((image) => {
      console.log(image);

      const base = image.data ? { uri: `${image.path}` } : '';
      const PicturePath = `${image.path}`;

      const group_profile_picture = `group_photo-${Date.now()}.jpg`;
      const group_profile_picture_device = PicturePath;
      this.state.borderColor = 'transparent';
      this.props.onChangeGroupPicture({
        group_profile_picture,
        group_profile_picture_device
      });
      // this._storePictureBackend({
      //   group_profile_picture,
      //   group_profile_picture_device
      // });
      this._storePictureBackend({
        group_profile_picture,
        group_profile_picture_device,
        mime: image.mime,
        filename: image.filename || group_profile_picture,
        sourceURL: image.sourceURL || PicturePath
      });

      // this.setState({
      //   profile_picture_device: PicturePath
      // });
    });
  }

  _storePictureBackend({
    group_profile_picture, group_profile_picture_device, mime, filename, sourceURL
  }) {
      if (group_profile_picture_device) {
        // Create the form data object
        upload_file({
          PicturePath: group_profile_picture_device,
          new_name: group_profile_picture,
          msisdn: this.props.my_msisdn,
          mime,
          filename,
          sourceURL
        }, (progress) => {
          console.log('[GroupPictureContainer] _storePictureBackend progress ', progress);
          // this.setState({
          //   progress
          // });
        })
        .then((resp) => {
          console.log('[GroupPictureContainer] _storePictureBackend resp=', resp);
          if (resp && resp.status) {
            // IS_UPLOADED = true;
            // // update to redux
            // this.props.saveProfilePicture({
            //   profile_picture: picture_new_name,
            //   profile_picture_device: profile_picture_device_path
            // });
          } else {
            Alert.alert(resp.e);
          }
        })
        .catch((err) => {
          console.log('[GroupPictureContainer] _storePictureBackend err=', err);
          Alert.alert('Upload Failed. Please try again...');
        });
    }
  }

  _onChangeFullName(value) {
    this.props.onChangeGroupNameInputText(value);
  }

  _onSubmitTextInput() {
    // Alert.alert('_onSubmitTextInput');
    // console.log('[GroupPictureContainer] _onSubmitTextInput setState', this.state);
    // this.props.updateGroupProfile({
    //   group_profile_picture: this.state.group_profile_picture || '',
    //   group_profile_picture_device: this.state.group_profile_picture_device || '',
    //   group_name: this.state.group_name || '',
    // });

    // this._storePictureBackend();
  }

  render() {
    const image_source = this.state.group_profile_picture_device !== '' ? { uri: `${this.state.group_profile_picture_device}` } : '';
    return (
      <View style={{ flex: 1 }}>
        <View
        style={{
          flex: Platform.OS === 'ios' ? 0.6 : 0.6,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 15,
        }}
        >
          <TouchableOpacity onPress={() => { this._imagePickerCrop(); }}>
            <View
              style={{
              borderColor: this.state.group_profile_picture_device !== '' ? this.state.borderColor : '#D3DDE0',
              borderRadius: 30,
              borderWidth: 0.3,
              width: widthComponent(0.3),
              height: widthComponent(0.3),
              margin: 20,
              padding: this.state.group_profile_picture_device !== '' ? 0 : 12,
              alignItems: 'center',
              justifyContent: 'center',
              }}
            >
              { this.state.group_profile_picture_device !== '' ?
              <View
              style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 30,
                  backgroundColor: 'transparent'
              }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 30
                  }}
                  resizeMode= 'cover'
                  source={image_source}
                />
              </View>
               :
               <View style={{}}>
                 <Text style={{ color: colors.darkGray }}>
                   Add Picture
                 </Text>
               </View>
              }
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          // backgroundColor: 'yellow',
          flex: Platform.OS === 'ios' ? 0.3 : 0.3,
          justifyContent: 'center',
          alignItems: 'center',
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
            value={this.state.group_name}
            underlineColorAndroid='transparent'
            multiline={false}
            style={{
              fontSize: 17,
              color: '#000',
              textAlign: 'left',
              width: 300,
              borderBottomWidth: 1,
              borderBottomColor: '#D3DDE0',
              padding: 5
            }}
            onChangeText={this._onChangeFullName}
            onSubmitEditing={this._onSubmitTextInput}
            placeholder='Group Name'
            placeholderTextColor='#D3DDE0'
          />
        </LinearGradient>
      </View>
    </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('[GroupPictureContainer] mapStateToProps ', state);
  return {
    group_name: state.GroupprofileReducer.group_name,
    group_profile_picture: state.GroupprofileReducer.group_profile_picture,
    group_profile_picture_device: state.GroupprofileReducer.group_profile_picture_device,
    my_msisdn: state.SessionReducer.sessionPhoneNumber
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateGroupProfile,
      onChangeGroupNameInputText,
      onChangeGroupPicture,
      clearFormCreateGroup
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPictureContainer);
