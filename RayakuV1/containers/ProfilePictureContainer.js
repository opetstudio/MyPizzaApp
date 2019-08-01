import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
  reloadLocalContacts
} from '../actions/ContactsAction';

import { getConf } from '../conf';
import styles from '../styles/NavBar.style';
const icon_avatar = require('../assets/images/default-avatar.png');
const icon_group = require('../assets/images/group-default-img-xl.png');

const conf = getConf('rayaku-file-py');
const host = conf.host;

class ProfilePictureContainer extends React.Component {
  constructor(props) {
    super(props);
    this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
    this._onPressAvatar = this._onPressAvatar.bind(this);

  }
  componentWillMount() {
    const profile_picture = this.props.profile_picture || '';
    const source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_avatar;
    const source_avatar_group = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_group;
   
    this.setState({
      source_avatar,
      source_avatar_group,
      title: this.props.title,
      friendNumber: this.props.friendsPhoneNumber,
      contactName: this.props.contactName,
      contactDetail: this.props.contactDetail,
      deviceId: this.props.deviceId,
      reloadLocalContacts: this.props.reloadLocalContacts
    });
  }
  componentWillReceiveProps(nextProps) {
    const profile_picture = nextProps.profile_picture || '';
    const source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_avatar;
    const source_avatar_group = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_group;

    this.setState({
      source_avatar,
      source_avatar_group,
      title: this.props.title,
      friendNumber: this.props.friendsPhoneNumber,
      contactName: this.props.contactName,
      contactDetail: this.props.contactDetail,
      deviceId: this.props.deviceId,
      reloadLocalContacts: this.props.reloadLocalContacts
    });
  }
  _onErrorLoadImage() {
    // console.log('[Row] _onErrorLoadImage e=', e);
    this.setState({
      source_avatar: icon_avatar,
      source_avatar_group: icon_group,
    });
  }
  _onPressAvatar() {
    if (this.props.isGroup) {
      Actions.viewGroupProfile({
        title: this.state.title,
        id: this.props.id
      });
    } else {
      console.log('[ProfilePictureContainer] title', this.state.title);
      Actions.viewProfile({
        id: this.props.id,
        title: this.state.title,
        friendsPhoneNumber: this.state.friendNumber,
        avatar: this.state.source_avatar,
        contactName: this.state.contactName,
        contactDetail: this.state.contactDetail,
        deviceId: this.state.deviceId,
        reloadLocalContacts: this.state.reloadLocalContacts,
      });
    }
  }
  render() {
    console.log('[ProfilePictureContainer] render ', this.props);
    return (
      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => this._onPressAvatar()}
          style={styles.rightTouch}
        >
          <Image
            style={styles.imgRight}
            resizeMode="cover"
            source={this.props.isGroup ? this.state.source_avatar_group : this.state.source_avatar}
            borderRadius= { Platform.OS === 'android' ? 30 : 15 }
            onError={this._onErrorLoadImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      reloadLocalContacts
    },
    dispatch
  );
}

function mapStateToProps(state, ownProps) {
  const { conversation_id, isGroup } = ownProps;
  const id = conversation_id;
  let user_detail = state.UsersReducer.byId[conversation_id] || {};
  if (isGroup) {
    user_detail = state.GroupReducer.byId[conversation_id];
  }
  user_detail = typeof user_detail !== 'undefined' ? user_detail : {};
  // console.log(`[ProfilePictureContainer] mapStateToProps user_detail==>isGroup=${isGroup}`, user_detail);
  return {
    // group_profile_picture: state.GroupprofileReducer.group_profile_picture,
    // group_profile_picture_device: state.GroupprofileReducer.group_profile_picture_device
    profile_picture: user_detail.profile_picture || user_detail.picture || '',
    deviceId: state.SessionReducer.deviceId,
    id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureContainer);
