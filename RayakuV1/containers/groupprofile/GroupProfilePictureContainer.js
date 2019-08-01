import React from 'react';
import {
  Platform,
  ActionSheetIOS,
  ToastAndroid,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DialogAndroid from 'react-native-dialogs';
import ImagePicker from 'react-native-image-crop-picker';

import { getConf } from '../../conf';
import { upload_file } from '../../api/rayaku-file-py';
import { ITEMS_IMAGE_PICKER, ENTITY_GROUP } from '../../constants';
import { updateGroupProfile, onChangeGroupNameInputText, modalGroupRenameToggle, onChangeGroupPicture, updateGroupPictureById} from '../../actions/GroupprofileAction';
// import { updateGroupProfile, onChangeGroupNameInputText, onChangeGroupPicture, clearFormCreateGroup } from '../actions/GroupprofileAction';
import GroupProfilePicture from '../../components/groupprofile/GroupProfilePicture';

const conf = getConf('rayaku-file-py');
const host = conf.host;
const icon_avatar = require('../../assets/images/group-default-img-xl.png');

class GroupProfilePictureContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._storePictureBackend = this._storePictureBackend.bind(this);
    this._toggleModalGroupRename = this._toggleModalGroupRename.bind(this);
    this._galleryPicker = this._galleryPicker.bind(this);
    this._imagePickerCrop = this._imagePickerCrop.bind(this);
  }

  componentWillMount() {
    console.log('[GroupProfilePictureContainer] componentWillMount=', this.props);
    const group_picture = this.props.group_picture || '';
    const source_avatar = group_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${group_picture}` } : icon_avatar;
    this.setState({
      source_avatar,
      title: this.props.title,
      phone_number: this.props.phone_number,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('[GroupProfilePictureContainer] componentWillReceiveProps=', nextProps);
    const group_picture = nextProps.group_picture || '';
    const source_avatar = group_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${group_picture}` } : icon_avatar;
    this.setState({
      source_avatar,
      title: nextProps.title,
      phone_number: nextProps.phone_number
    });
  }

  _imagePickerCrop() {
      const self = this;
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
              self._cameraPicker();
            } else if (buttonIndex === 1) {
              console.log('index 0 open gallery');
              self._galleryPicker();
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
        console.log('image==>', image);

        const PicturePath = `${image.path}`;

        const group_profile_picture = `group_photo-${Date.now()}.jpg`;
        const group_profile_picture_device = PicturePath;
        this.state.borderColor = 'transparent';
        console.log('cek1');
        // this.props.onChangeGroupPicture({
        //   group_profile_picture,
        //   group_profile_picture_device
        // });
        console.log('cek2');
        this._storePictureBackend({
          group_profile_picture,
          group_profile_picture_device,
          mime: image.mime,
          filename: image.filename || group_profile_picture,
          sourceURL: image.sourceURL || PicturePath
        });
        console.log('cek3');
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

      const PicturePath = `${image.path}`;

      const group_profile_picture = `group_photo-${Date.now()}.jpg`;
      const group_profile_picture_device = PicturePath;
      this.state.borderColor = 'transparent';
      // this.props.onChangeGroupPicture({
      //   group_profile_picture,
      //   group_profile_picture_device
      // });
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
          groupid: this.props.groupId,
          msisdn: this.props.phone_number,
          entity: ENTITY_GROUP,
          mime,
          filename,
          sourceURL
        }, (progress) => {
          console.log('[GroupProfilePictureContainer] _storePictureBackend progress ', progress);
        })
        .then((resp) => {
          console.log('[GroupProfilePictureContainer] _storePictureBackend resp=', resp);
            if (resp && resp.status) {
              // update to redux
              this.props.updateGroupPictureById({
                groupid: this.props.groupId, picture: group_profile_picture
              });
            } else {
              Alert.alert(resp.e);
            }
        })
        .catch((err) => {
          console.log('[GroupProfilePictureContainer] _storePictureBackend err=', err);
          Alert.alert('Upload Failed. Please try again...');
        });
    }
  }
  _toggleModalGroupRename(visible) {
    this.props.modalGroupRenameToggle(visible);
  }

  render() {
    console.log('[GroupProfilePictureContainer] render ', this.state);
    return (
        <GroupProfilePicture
          groupId={this.props.groupId}
          source_avatar = {this.state.source_avatar}
          image_picker = {this._imagePickerCrop}
          title = {this.state.title}
          onChangeGroupNameInputText = {this.props.onChangeGroupNameInputText}
          toggleModalGroupRename = {this._toggleModalGroupRename}
          phone_number = {this.props.phone_number}
          owner = {this.props.owner}
        />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    updateGroupProfile,
    onChangeGroupNameInputText,
    modalGroupRenameToggle,
    onChangeGroupPicture,
    updateGroupPictureById
    },
    dispatch
  );
}

function mapStateToProps(state, ownProps) {
  // console.log('[GroupProfilePictureContainer] mapStateToProps ', ownProps);
  const group_picture = (state.GroupReducer.byId[ownProps.groupId] || []).picture;
  const title = (state.GroupReducer.byId[ownProps.groupId] || {}).name;
  const owner = (state.GroupReducer.byId[ownProps.groupId] || {}).owner || '';
  // console.log('[GroupProfilePictureContainer] mapStateToProps group_picture=', group_picture);
  // console.log('[GroupProfilePictureContainer] mapStateToProps title=', title);
  // console.log('[GroupProfilePictureContainer] mapStateToProps owner=', owner);
  return {
    group_picture,
    title,
    owner,
    phone_number: state.UserprofileReducer.phone_number
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfilePictureContainer);
