import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import reactContacs from 'react-native-contacts';

import ProfilePictureContainer from '../containers/ProfilePictureContainer';
import PopupMenuMessageContainer from '../containers/PopupMenuMessageContainer';
import SubmitNewGroupIndicatorContainer from '../containers/SubmitNewGroupIndicatorContainer';
import SubmitAddGroupMemberContainer from '../containers/SubmitAddGroupMemberContainer';
import NavbarMiddleContainer from '../containers/navbar/navbarMiddleContainer';

import styles from '../styles/NavBar.style';
import { colors } from '../styles/color.style';
import { PopupMenuMessage } from '../components/PopupMenuMessage';
import Title from '../components/TesComponent';
import TermModal from '../components/modal/TermModal';

const new_message = require('../assets/images/new_message.png');
const new_group = require('../assets/images/create-group.png');
const icon_back = require('../assets/images/back.png');
const icon_forward = require('../assets/images/forward.png');
const icon_search = require('../assets/images/search.png');
const icon_pull = require('../assets/images/pull-down-menu.png');
const icon_avatar = require('../assets/images/default-avatar.png');

export default class CustomNavBar extends React.Component {

  _addNewContact() {
    console.log('_addNewContact ', reactContacs);
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
          number: `${phoneNumber}`
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
  _toggleEditMode() {
    console.log('[CustomNavBar ios] toggle Message clicked');
    return (
    <PopupMenuMessageContainer />
    // PopupMenuMessage();
    );
  }

  _renderLeft() {
     console.log('Actions.currentScene:', Actions.currentScene);
    const currScene = Actions.currentScene;
    // ENABLE KALAU SEARCH SUDAH BISA
    // if (currScene.startsWith('messages')) {
    //  return (
        // <TouchableOpacity
        //  onPress={() => {
        //    ////console.log('Search everything');
        //  }}
        //  style={[styles.leftIos]}
        // >
        //  <Image
        //    style={{ width: 30, height: 50 }}
        //    resizeMode="contain"
        //    source={icon_search}
        //  />
        // </TouchableOpacity>
    //    <View style={[styles.navBarItem]} />
    //  );
    // }
    if (currScene.startsWith('messages')) {
      console.log('Setting', this.props.title);
      return (
        <View style={[styles.navBarItem]} />
      );
    }
    if (currScene.startsWith('conversations1')) {
      return (
        <TouchableOpacity onPress={() => Actions.pop()} style={[styles.leftTouch]}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={icon_back}
          />
        </TouchableOpacity>
      );
    }
      return (
        <TouchableOpacity onPress={Actions.pop} style={[styles.leftTouch]}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={icon_back}
          />
        </TouchableOpacity>
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

  //   const currScene = Actions.currentScene;
  //   if (currScene.includes('nearby')) {
  //     return (
  //       <View style={[styles.middle]}>
  //         <Text style={styles.middleText}>Nearby</Text>
  //       </View>
  //     );
  //   }
  //   if (currScene.includes('conversations')) {
  //     if (this.props.contactDetail) {
  //       return (
  //         <View style={[styles.conversationMid]}>
  //           <Text style={styles.conversationTitle}>{ this.props.title }</Text>
  //         </View>
  //       );
  //     }
  //     return (
  //       <View style={[styles.conversationMid]}>
  //         <TouchableOpacity onPress={()=> this._addNewContact()} onLongPress= {() => alert('On Long Pressed')}>
  //           <Text style={styles.conversationTitle}>{ this.props.title }</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );

  //   }

  //   if (currScene.includes('message')) {
  //     console.log('Middle msg Actions.currentScene:', Actions.currentScene);
  //     if (currScene == 'messages_tab_chat_1') {
  //       return (
  //         <PopupMenuMessageContainer
  //           title= {this.props.title}/>
  //       );
  //     }
  // }
  //   return (
  //     <View style={[styles.middle]}>
  //       <Text style={styles.middleText}>{ this.props.title }</Text>
  //     </View>
  //   );
  }

  _renderRight() {
    const currScene = Actions.currentScene;
    console.log('[CustomNavBar] renderRight ', currScene);
    if (currScene.includes('conversations')) {
      console.log('conversations renderRight this.props.title:', this.props);
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
    if (currScene.includes('nearby')) {
      return (
        // <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        //    <TouchableOpacity
        //      style={{ paddingRight: 10, justifyContent: 'center' }}
        //    >
        //      <Image
        //        style={{ width: 30, height: 30 }}
        //        resizeMode="contain"
        //        source={icon_pull}
        //      />
        //    </TouchableOpacity>
        // </View>
        <View style={[styles.navBarItem]} />
      );
    }
    if (currScene.includes('messages_tab_chat')) {
      return (
        <View style={[styles.right]}>
            <TouchableOpacity onPress={() => Actions.newchat()} style={styles.rightTouch}>
              <Image
                style={styles.imgRight}
                resizeMode="contain"
                source={new_message}
              />
            </TouchableOpacity>
        </View>
      );
    }
    if (currScene.includes('messages_tab_groups')) {
      return (
        <View style={[styles.right]}>
            <TouchableOpacity onPress={() => Actions.creategroup()} style={styles.rightTouch}>
              <Image
                style={styles.imgRight}
                resizeMode="contain"
                source={new_group}
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
    if (currScene === 'addgroupmember1') {
      return (
        <SubmitAddGroupMemberContainer />
      );
    }
    if (this.props.title === 'Settings') {
      return (
         <View style={[styles.navBarItem]}/>
      );
    }
    return (
       <View style={[styles.navBarItem]} />
     );
  }

  render() {
    console.log('[CustomNavBarios] render ', this.props);
    let dinamicStyle;

    if (this.props.title === 'conversations' || this.props.title === 'Settings' ||
        this.props.title === 'New Chat') {
      dinamicStyle = styles.dinamicStyle;
    }

    return (
        <View style={[styles.containerIos, dinamicStyle]}>
          { this._renderLeft() }
          { this._renderMiddle() }
          { this._renderRight() }
        </View>
    );
  }
}
