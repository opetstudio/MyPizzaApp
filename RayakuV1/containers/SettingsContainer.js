import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  Switch,
  ScrollView,
  TouchableOpacity,
}
from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from "react-native-modal";

import styles from '../styles/SettingsContainer.style';
import { colors } from '../styles/color.style';

import { getConf } from '../conf';

import CoinsStyle from '../styles/ModalCoins';


const conf = getConf('rayaku-file-py');
const host = conf.host;

const icon_avatar = require('../assets/images/default-avatar.png');

class SettingContainer extends React.Component {
  state = {
    version: '0.0.0.0'
  }

  constructor(props) {
    super(props);
    this.state = {};
    this._onPressEditProfile = this._onPressEditProfile.bind(this);
    this._onPressRayaCoins = this._onPressRayaCoins.bind(this);
    this._onPressReferal = this._onPressReferal.bind(this);
    this._onPressModal = this._onPressModal.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
    this._getSourceAvatar = this._getSourceAvatar.bind(this);
    this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
  }

  componentWillMount() {
    console.log('[SettingContainer] componentWillMount ', this.props);
    // console.log('[SettingContainer] componentWillMount display_name', this.props.display_name);

    this.state.trueSwitchIsOn = true;
    this.state.falseSwitchIsOn = false;
    this.state.display_name = this.props.display_name;
    this.state.visibleModal = null;
    this.state.source_avatar = this._getSourceAvatar(this.props.profile_picture);
  }

  componentWillReceiveProps(nextProps) {
    console.log('[SettingContainer] componentWillReceiveProps ', this.props);
    this.state.display_name = nextProps.display_name;
    this.state.source_avatar = this._getSourceAvatar(nextProps.profile_picture);
  }

  _renderModalContent() {
    console.log("_renderModalContent");
    return (
    <View style={CoinsStyle.modalContent}>
      <Text style={CoinsStyle.headCoin}>+25 Coins!</Text>
      <View style={CoinsStyle.uniCoin}>
        <Text style={CoinsStyle.descCoin}>Because you have</Text>
        <Text style={CoinsStyle.descCoinTitle}> Sent 10 Invite</Text>
      </View>
      <Text style={CoinsStyle.descCoin}>Keep Inviting!</Text>
    </View>
    );
  }
  
  _renderButton(text, onPress) {
    return (
    <TouchableOpacity onPress={onPress}>
      <View style={CoinsStyle.button}>
        <Text style={CoinsStyle.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
    );
  }

  _onPressEditProfile() {
      Actions.editProfile();
  }

  _onPressRayaCoins() {
    Actions.rayacoins();
  }

  _onPressReferal() {
    Actions.referal();
  }
  
  _onPressAbout() {
      Actions.about();
  }

  _getSourceAvatar(profile_picture) {
    const source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_avatar;
    return source_avatar;
  }
  _onErrorLoadImage(e) {
      this.setState({
        source_avatar: icon_avatar
      });
    }

  _onPressModal() {
    console.log("ON PRESS MODAL",this.state.visibleModal);
    return(
      <Modal
        isVisible={this.state.visibleModal === 4}
        backdropColor={"rgba(0, 0, 0, 0.59)"}
        backdropOpacity={1}
        animationIn="zoomInDown"
        animationOut="zoomOutDown"
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}
        onBackdropPress={() => this.setState({ visibleModal: null })}
      >
        {this._renderModalContent()}
      </Modal>
    );
  }
  render() {
    console.log('[SettingsContainer] state=', this.state);
    return (
      <ScrollView>
      <View style={styles.container}>
        <TouchableHighlight onPress={() => Actions.editProfile()}>
          <View style={styles.headerProfile}>
              <View style={styles.imgBox}>
                <Image
                  source={this.state.source_avatar}
                  style={styles.imgProfile}
                  resizeMode='cover'
                  onError={this._onErrorLoadImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameBox}>
                  <Text style={styles.nameTitle}>
                    {this.state.display_name}
                  </Text>
                </View>
                <View style={{ marginTop: 17 }} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.profileBox}>
                  <Text style={styles.profileBoxText}>Edit Profile</Text>
                </View>
                <View style={{ marginTop: 17 }} />
              </View>
            </View>
        </TouchableHighlight>

          <View style={styles.version}>
            <Text ref="versionTextRef" style={styles.versionText}>Build v. {this.props.version}</Text>
          </View>
          
          {/* <View style={styles.container}>
            {this._renderButton("Earn Coin", () =>
              this.setState({ visibleModal: 4 })
            )}
            {this._onPressModal()}
          </View>

          <TouchableHighlight onPress={() => Actions.rayacoins()}>
            <View style={styles.headerProfile}>
              <View style={styles.imgBox}>
                <Image
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameBox}>
                  <Text style={styles.nameTitle}>
                    Raya Coins
                  </Text>
                </View>
                <View style={{ marginTop: 5 }} />
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Actions.referal()}>
            <View style={styles.headerProfile}>
              <View style={styles.imgBox}>
                <Image
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameBox}>
                  <Text style={styles.nameTitle}>
                    Referal
                  </Text>
                </View>
                <View style={{ marginTop: 5 }} />
              </View>
            </View>
          </TouchableHighlight> */}

          {/* }<View style={styles.header}>
            <Text style={styles.headerText}>
              NOTIFICATION
            </Text>
          </View>
          <View style={[styles.subListTwo, { paddingVertical: 6 }]}>
              <View style={styles.subViewLeft}>
                <Text>Phone Notification</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Switch
                  onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
                  style={{ }}
                  value={this.state.falseSwitchIsOn}
                />
              </View>
          </View> */}

          {/* }<View style={{ backgroundColor: '#F7F7F7', paddingLeft: 12, paddingVertical: 5 }}>
            <Text style={{ fontWeight: '600', fontSize: 13 }}>
              Set Tone
            </Text>
          </View> */}

          {/* <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Default Messages</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Bubble</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Group & Channels</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Default</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Audio & Video Calls</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Beep</Text>
                </View>
            </View>
          </TouchableHighlight>
          <View style={styles.subListTwo} />
          <View style={styles.subListTwo} />
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Light Setting</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Default</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Vibrate</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}>Short</Text>
                </View>
            </View>
          </TouchableHighlight> */}

          {/* <View style={styles.header}>
            <Text style={styles.headerText}>
              CHATS
            </Text>
          </View> */}
          {/* }<TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Chat Wallpaper</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}> > </Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Archive All</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text style={{ color: 'red' }}>Clear All Chats</Text>
                </View>
            </View>
          </TouchableHighlight>

          <View style={styles.header}>
            <Text style={styles.headerText}>
              APP INFO
            </Text>
          </View>
          <TouchableHighlight onPress={this._onPressAbout}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>About</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Help and FAQ</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Terms & Privacy Policy</Text>
                </View>
            </View>
          </TouchableHighlight> */}

      </View>
      
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  // //console.log('[EditProfileContainer] mapStateToProps ');
  return {
    display_name: state.UserprofileReducer.display_name,
    profile_picture_device: state.UserprofileReducer.profile_picture_device,
    profile_picture: state.UserprofileReducer.profile_picture,
    version: state.SessionReducer.version
    // latestCreatedTimeOnDevice: state.ConversationReducer.latestCreatedTimeOnDevice
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // fetchAll,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingContainer);
