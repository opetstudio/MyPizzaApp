import React from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableHighlight,
  Alert,
  StatusBar,
  TouchableOpacity,
  ImageBackground
}
from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import reactContacs from 'react-native-contacts';

import styles from '../styles/ViewProfile.style';
import { colors } from '../styles/color.style';

const icon_back = require('../assets/images/back_white.png');
const icon_avatar = require('../assets/images/default-avatar.png');
const icon_forward = require('../assets/images/forward.png');
// ===================== start of TEMPORARY COMMENT ======================= //
// const icon_rayakuID = require('../assets/images/contact-detail.png');
// const icon_media = require('../assets/images/media-files.png');
// const icon_setting = require('../assets/images/contact-setting.png');
// ===================== end of TEMPORARY COMMENT ======================= //

class ViewProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onPressEditProfile = this._onPressEditProfile.bind(this);
    this._renderAddContact = this._renderAddContact.bind(this);
    this._addNewContact = this._addNewContact.bind(this);
    this._addToExistingContact = this._addToExistingContact.bind(this);
  }

  componentWillMount() {
    console.log('[ViewProfileContainer] componentWillMount ', this.props);
    this.state.phoneNumber = this.props.phoneNumber;
    this.state.profileName = this.props.profileName;
    this.state.contactDetail = this.props.contactDetail;
    this.state.isContactExist = this.props.isContactExist;
    this.state.source_avatar = this.props.avatar || '';
    this.state.title = this.props.title || '';
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      phoneNumber: nextProps.phoneNumber,
      contactDetail: nextProps.contactDetail,
      profileName: nextProps.profileName,
      isContactExist: nextProps.isContactExist,
      source_avatar: nextProps.avatar || '',
      title: nextProps.title
    });
  }
  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.props.reloadLocalContacts({
        deviceId: this.props.deviceId || new Date().getTime(),
        actionFlow: ['ViewProfileContainer.componentWillUnmount']
      });
    }
  }

  _onPressEditProfile() {
      Alert.alert('Testing');
  }

  _onErrorLoadImage() {
    this.setState({
      source_avatar: icon_avatar
    });
  }

  _addNewContact() {
      const newPerson = {
        // familyName: "Jung",
        // givenName: "Carl",
        // jobTitle: "",
        // middleName: "",
        phoneNumbers: [{
          label: 'mobile',
          number: `+${this.props.id}`,
        }]
        // familyName: "Nietzsche",
        // givenName: "Friedrich"
      };

      // var newPerson = {
      //   emailAddresses: [{
      //     label: "work",
      //     email: "mrniet@example.com",
      //   }],
      //   familyName: "Nietzsche",
      //   givenName: "Friedrich",
      // }

      reactContacs.openContactForm(newPerson, (e, o) => {
        // console.log('success add contact a3=',a3);
        // alert('success add contact');
      });
      // console.log(reactContacs);
  }
  _addToExistingContact() {
    console.log('_addToExistingContact ', reactContacs);
    // const phoneNumber = '';
    const phoneNumber = this.props.friendsPhoneNumber;
    if (phoneNumber && phoneNumber !== '') {
      // alert(phoneNumber);
      const newPerson = {
        // familyName: "Jung",
        // givenName: "Carl",
        // jobTitle: "",
        // middleName: "",
        phoneNumbers: [{
          label: 'mobile',
          number: `${phoneNumber}`,
        }]
        // familyName: "Nietzsche",
        // givenName: "Friedrich"
      };

      // var newPerson = {
      //   emailAddresses: [{
      //     label: "work",
      //     email: "mrniet@example.com",
      //   }],
      //   familyName: "Nietzsche",
      //   givenName: "Friedrich",
      // }

      reactContacs.openContactForm(newPerson, (e, o) => {
        // console.log('success add contact a3=',a3);
        // alert('success add contact');
      });
      // console.log(reactContacs);
    }
  }

  _renderAddContact() {
    if (this.state.isContactExist) {
      // ===================== start of TEMPORARY COMMENT ======================= //
      // return (
      //   <TouchableHighlight onPress={console.log('onpress')}>
      //       <View style={styles.subListTwo}>
      //           <View style={styles.subViewLeft}>
      //             <Text>Edit Contact</Text>
      //           </View>
      //           <View style={styles.subViewRight}>
      //             {/* <Text style={{ color: colors.mediumGray }}> > </Text> */}
      //             <Image
      //               style={styles.imgForward}
      //               resizeMode="contain"
      //               source={icon_forward}
      //             />
      //           </View>
      //       </View>
      //     </TouchableHighlight>
      //   );
      // ===================== end of TEMPORARY COMMENT ======================= //
      return null;
    }
    return (
      <View>
      <TouchableHighlight onPress={() => this._addNewContact()}>
          <View style={styles.subListTwo}>
              <View style={styles.subViewLeft}>
                <Text>Create New Contact</Text>
              </View>
              <View style={styles.subViewRight}>
                <Image
                  style={styles.imgForward}
                  resizeMode="contain"
                  source={icon_forward}
                />
              </View>
          </View>
        </TouchableHighlight>
        {/* // ===================== start of TEMPORARY COMMENT ======================= // */}
        {/* <TouchableHighlight onPress={()=> this._addToExistingContact()}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Add to an Existing Contact</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}> > </Text>
                </View>
            </View>
          </TouchableHighlight> */}
        {/* // ===================== end of TEMPORARY COMMENT ======================= // */}
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar translucent backgroundColor={colors.black60} />

          <View style={styles.headerProfile}>

                  <ImageBackground
                    source={this.state.source_avatar}
                    style={styles.imgPhoto}
                    resizeMode='cover'
                    onError={this._onErrorLoadImage}
                  >

                    <View style={[styles.left]}>
                        <TouchableOpacity
                          // onPress={() => Actions.pop()}
                          onPress={() => (Platform.OS === 'ios' ? Actions.pop() : Actions.conversations())}
                          style={styles.leftTouch}
                        >
                          <View
                            style={styles.imgView}
                          >
                            <Image
                              style={styles.img}
                              resizeMode="contain"
                              source={icon_back}
                              // backgroundColor={colors.darkGray}
                            />
                          </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.nmBox}>
                    <LinearGradient
                    locations={[0, 1]}
                    colors= {[colors.transparent, '#00000090']}
                    style={{ flex: 1 }}
                    >
                        <Text style={styles.nmText}>{this.state.profileName}</Text>

                    </LinearGradient>
                    </View>
                  </ImageBackground>
            </View>
            <View style={styles.headerNumber}>
              <View style={styles.numberBox}>
                <Text style={styles.numberText}>
                  { this.state.phoneNumber }
                </Text>
              </View>

              <View style={styles.littleIconBox} />
            </View>

            {this._renderAddContact()}

            {/* ========================== start of TEMPORARY COMMENT ======================== */}
            {/* <View style={styles.headerNumber}>
                <View style={styles.iconBox}>
                <TouchableOpacity>
                <Image
                  source={icon_rayakuID}
                  style={styles.icon}
                  resizeMode='contain'
                />
                </TouchableOpacity>
                </View>

              <View style={styles.iconBox}>
              <TouchableOpacity>
              <Image
                source={icon_setting}
                style={styles.icon}
                resizeMode='contain'
              />
              </TouchableOpacity>
              </View>
            </View> */}

            {/* <TouchableHighlight onPress={this._onPressEditProfile}>
              <View style={styles.subListTwo}>
                  <View style={styles.subViewLeft}>
                    <Text>Rayaku ID</Text>
                  </View>
                  <View style={styles.subViewRight}>
                    <Text style={{ color: colors.mediumGray }}> > </Text>
                  </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._onPressContactSetting}>
              <View style={styles.subListTwo}>
                  <View style={styles.subViewLeft}>
                    <Text>Contact Setting</Text>
                  </View>
              </View>
            </TouchableHighlight> */}

            {/* <TouchableHighlight onPress={this._onPressClearChat}>
              <View style={styles.subListTwo}>
                  <View style={styles.subViewLeft}>
                    <Text style={{ color: 'red' }}>Clear All Chats</Text>
                  </View>
              </View>
            </TouchableHighlight>

            <View style={styles.header}>
              <Text style={styles.headerText}>
                This will clear chats between you and this user.
                Please be careful before you proceed.
              </Text>
            </View> */}

          {/* <View style={styles.header}>
            <Text style={styles.headerText}>
              GROUP IN COMMON
            </Text>
          </View>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Cook Mood</Text>
                </View>
                <View style={styles.subViewRight}>
                  <Text style={{ color: colors.mediumGray }}> > </Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressEditProfile}>
            <View style={styles.subListTwo}>
                <View style={styles.subViewLeft}>
                  <Text>Clever Developers</Text>
                </View>
            </View>
          </TouchableHighlight> */}
         {/* ========================== end of TEMPORARY COMMENT ======================== */}

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {},
    dispatch
  );
}
function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  const contactDetail = state.ContactsReducer.byId[id] || {};
  const isContactExist = contactDetail.name && contactDetail.name !== '';
  const phoneNumber = contactDetail.phoneNumber || `+${id}`;
  const profileName = contactDetail.name || '';
  return {
    phoneNumber,
    contactDetail,
    isContactExist,
    profileName
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileContainer);
