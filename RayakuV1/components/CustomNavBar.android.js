import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Alert
} from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import reactContacs from 'react-native-contacts';

import PopupMenuMessageContainer from '../containers/PopupMenuMessageContainer';
import FloatIcon from '../components/FloatIcon';
import styles from '../styles/NavBar.style';
import { colors } from '../styles/color.style';

import ProfilePictureContainer from '../containers/ProfilePictureContainer';
import SubmitNewGroupIndicatorContainer from '../containers/SubmitNewGroupIndicatorContainer';
import SubmitAddGroupMemberContainer from '../containers/SubmitAddGroupMemberContainer';
import NavbarMiddleContainer from '../containers/navbar/navbarMiddleContainer';

const icon_avatar = require('../assets/images/default-avatar.png');
const icon_back = require('../assets/images/back_white.png');
const icon_forward = require('../assets/images/forward-white.png');
const icon_search = require('../assets/images/search_white.png');
const icon_menu = require('../assets/images/menu_burger.png');
const icon_down = require('../assets/images/expand-down-white.png');

const chatScene = 'messages_tab_chat';
const groupScene = 'messages_tab_group';

const devH = Dimensions.get('window').height;

export default class CustomNavBar extends React.Component {

  constructor(props) {
    super(props);
     this._onLayout = this._onLayout.bind(this);
     this._addNewContact = this._addNewContact.bind(this);
  }

  componentWillMount() {
    console.log('routerflux component componentWillMount');
    this.setState({
     deviceHeight: devH
     //visible: false
   });
  }

  componentDidMount() {
  }

  _toggleEditMode() {
    console.log('[CustomNavBar] toggle Message clicked');
    return (<PopupMenuMessageContainer />);
  }

  _addNewContact() {
    // console.log('_addNewContact ', this.props);
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

      reactContacs.openContactForm(newPerson, (err) => {
        console.log('success add contact');
        Alert('success add contact');
      });
      // console.log(reactContacs);
    }
  }
  _onLayout() {
    this.setState({
      deviceHeight: Dimensions.get('window').height
    });
  }

  _renderLeft() {
    const currScene = Actions.currentScene;
    if (currScene.startsWith('messages')) {
      return (
        <View style={[styles.leftAndroid]}>
        {/* <TouchableOpacity
          onPress={() => Alert.alert('You will be able to search later :)')}
          style={[styles.leftTouch]}
        >
          <Image
            style={styles.img}
            resizeMode="contain"
            source={icon_search}
          />
        </TouchableOpacity> */}
      </View>
      );
    }
    if (this.props.title === 'Edit Profile') {
      return (
        <View style={[styles.leftAndroid]}>
          <TouchableOpacity
            onPress={() => Actions.settings()}
            style={[styles.leftTouch]}
          >
            <Image
              style={styles.img}
              resizeMode="contain"
              source={icon_back}
            />
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.title === 'Contact Settings') {
      return (
        <View style={[styles.leftAndroid]}>
          <TouchableOpacity
            onPress={() => Actions.viewProfile()}
            style={[styles.leftTouch]}
          >
            <Image
              style={styles.img}
              resizeMode="contain"
              source={icon_back}
            />
          </TouchableOpacity>
        </View>
      );
    }
      return (
        <View style={[styles.leftAndroid]}>
          <TouchableOpacity
            onPress={Actions.pop}
            style={[styles.leftTouch]}
          >
            <Image
              style={styles.img}
              resizeMode="contain"
              source={icon_back}
            />
          </TouchableOpacity>
        </View>
      );
  }

  _renderMiddle() {
    return (<NavbarMiddleContainer
      conversation_id={this.props.conversation_id}
      title={this.props.title}
      addNewContact={this._addNewContact}
      contactDetail={this.props.contactDetail}
      isGroup={this.props.isGroup}
    />);
  }
  _renderMiddlexx() {
    const currScene = Actions.currentScene;
    if (currScene.includes('nearby')) {
      return (
        <View style={[styles.conversationMid]}>
          <Text
            style={styles.conversationTitle}
          >Nearby</Text>
        </View>
      );
    }
    if (currScene.includes('conversations')) {
      if (this.props.contactDetail) {
        return (
          <View style={[styles.conversationMid]}>
              <Text
                style={styles.middleText}
              >{ this.props.title }</Text>
          </View>
        );
      }
      return (
        <View style={[styles.conversationMid]}>
          <TouchableOpacity onPress={() => this._addNewContact()}>
            <Text
              style={styles.middleText}
            >{ this.props.title }</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (currScene.includes('message')) {
      console.log('Middle msg Actions.currentScene:', Actions.currentScene);
      // ====== DI COMMENT SEMENTARA ====== //
      // if (currScene === 'messages_tab_chat_1') {
      //   return (
      //     <PopupMenuMessageContainer
      //       title= {this.props.title}/>

      //   );
      // }
        return (
            <View style={[styles.conversationMid]}>
            {/* <TouchableOpacity onPress={() => Alert.alert('Groups')} onLongPress= {() => Alert.alert('On Long Pressed')}> // DI COMMENT SEMENTARA */}
              <Text
                style={styles.middleText}
              >{ this.props.title }</Text>
              {/* <Image
                style={styles.imgExpand}  // DI COMMENT SEMENTARA
                source={icon_down}/> */}
              {/* </TouchableOpacity> */}
            </View>
        );
    }
      return (
        <View style={[styles.middle]}>
          <Text
            style={styles.middleText}
          >{ this.props.title }</Text>
        </View>
      );
    }

  _renderRight() {
    const currScene = Actions.currentScene;
    if (currScene.includes('conversations')) {
      const title = this.props.title;
      const friendNumber = this.props.friendsPhoneNumber;
      const isGroup = this.props.isGroup;
      let contactName;
      if (this.props.contactDetail === undefined) {
        contactName = '';
      } else {
        console.log('insert contact name');
        contactName = this.props.contactDetail.givenName;
      }
      return (
          <ProfilePictureContainer
            conversation_id={this.props.conversation_id}
            title={title}
            friendsPhoneNumber={friendNumber}
            contactName={contactName}
            contactDetail={this.props.contactDetail}
            isGroup={isGroup}
          />
      );
    }
    if (currScene.includes('message')) {
      return (
      <View style={[styles.right]}>
          <TouchableOpacity
            onPress={() => Actions.drawerOpen()}
            style={styles.rightTouch}
          >
            <Image
              style={styles.img}
              resizeMode="contain"
              source={icon_menu}
            />
          </TouchableOpacity>
      </View>
      );
    }
    if (currScene === 'creategroup1') {
      return (
        <View style={[styles.right]}>
            <TouchableOpacity onPress={() => Actions.creategroupprofile()} style={styles.rightTouch}>
              <Image
                style={styles.imgRight}
                resizeMode="contain"
                source={icon_forward}
              />
            </TouchableOpacity>
        </View>
      );
    }
    if (currScene === 'creategroupprofile1') {
      return (
        <SubmitNewGroupIndicatorContainer />
      );
    }
    if (currScene === 'addGroupMember') {
      return (
        <SubmitAddGroupMemberContainer />
      );
    }
  return (
    <View style={[styles.navBarItem]} />
  );
}

  _renderFloat(msgScene, currScene) {
    console.log('_renderFloat show new chat', msgScene);
    console.log('_renderFloat currentScene', currScene);
      return (
        <View
              onLayout={this._onLayout}
              style={{
                position: 'absolute',
                justifyContent: 'center',
                right: 20,
                width: 80,
                height: 80,
                bottom: (this.state.deviceHeight * -1) + 90,
                elevation: 10
              }}
            >
          <ActionButton
              buttonColor={colors.default}
              renderIcon={() => <FloatIcon msgScene={msgScene} currScene={currScene}/>}
              onPress={() => (
                Actions.currentScene.includes('chat') ? Actions.newchat() :
                Actions.creategroup())}
              fixNativeFeedbackRadius
              style={styles.actionButton}
          />
        </View>
      );
  }

  render() {
      const currScene = Actions.currentScene;
      const msgScene = currScene.includes(chatScene) || currScene.includes(groupScene);
      // console.log('MsgScene', msgScene);
      return (
      <View>
        <StatusBar translucent backgroundColor='transparent' />
        <LinearGradient
          // start={{ x: 0.1, y: 0.1 }}
          // end={{ x: 0.1, y: 0.1 }}
          locations={[1, 0.6]}
          colors= {[colors.default, colors.defaultDarker]}
        >
          <View style={[styles.containerAndroid]}>
            { this._renderLeft() }
            { this._renderMiddle() }
            { this._renderRight() }
          </View>
        </LinearGradient>
          { msgScene ? this._renderFloat(msgScene, currScene) : null }
        </View>
        );
  }
}
