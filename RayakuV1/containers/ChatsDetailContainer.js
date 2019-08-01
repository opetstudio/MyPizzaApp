import React from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActionSheetIOS,
  AlertIOS,
  Platform,
  Image
} from 'react-native';
import DialogAndroid from 'react-native-dialogs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { fetchUserDetail } from '../actions/UsersAction';
import { deleteFriendChat } from '../actions/ConversationAction';
// import CheckBox from 'react-native-check-box'

import { setPhoneNumberName } from '../utils/util';

import Row from '../components/Row';
import CheckBoxContainer from '../containers/CheckBoxContainer';

const ITEMS = [
  'Mark As Read',
  'Pin Conversation',
  'Archive',
  'Delete',
  'Mute',
  'Cancel'
];
// const checked = false;

const icon_check = require('../assets/images/selections.png');
const icon_uncheck = require('../assets/images/selection-empty.png');

const messagesArray = [];

class ChatsDetailContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
    this._onLongPressButton = this._onLongPressButton.bind(this);
    // this._renderCheckBox2 = this._renderCheckBox2.bind(this);
    this._renderCheckBox = this._renderCheckBox.bind(this);
  }

  componentWillMount() {
    const val = this.props.item;
      // ////console.log('[ChatsDetailContainer] component componentWillMount', this.props);
      this.props.fetchUserDetail({
        friendPhoneNumberB64: val.phone_number,
        myPhoneNumberB64: this.props.my_phone_number,
        callbackUserNotFound: (userid) => {
          this.props.deleteFriendChat({ userid, myuserid: this.props.my_phone_number });
        }
      });

     this.state.checked = false;
     this.state.conversation_name = this.props.conversation_name;
     this.state.conversation_id = this.props.conversation_id;
     }

  componentDidMount() {
    // console.log('[ChatsDetailContainer] component componentDidMount', this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      conversation_id: nextProps.conversation_id,
      conversation_name: nextProps.conversation_name
    });
  }

  _onPressButton() {

  }

  _onLongPressButton(name) {
  if (Platform.OS === 'Android') {
      const deleteDialog = {
         content: `Are you sure want to delete conversation with ${name}?`,
         positiveColor: '#000000',
         positiveText: 'OK',
         negativeColor: '#FD5B31',
         negativeText: 'CANCEL'
      };
      const itemsCallback = (id, text) => {
        if (text === 'Delete') {
          const dialogDel = new DialogAndroid();
          dialogDel.set(deleteDialog);
          dialogDel.show();
        }
        else ToastAndroid.show(id + ': ' + text, ToastAndroid.SHORT);
      }

      const options = {
        'title': 'Conversation with ' + name,
        'items': ITEMS,
        itemsCallback: itemsCallback
      };
        var dialog = new DialogAndroid();
        dialog.set(options);
        dialog.show();
      }

      else {
            ActionSheetIOS.showActionSheetWithOptions({
              options: ITEMS,
              title: name,
              cancelButtonIndex: 5,
              destructiveButtonIndex: 3,
            },
            (buttonIndex, text) => {
              if (buttonIndex === 0) { Alert.alert('Index'+ buttonIndex); }
              else if (buttonIndex === 1) { Alert.alert('Index'+ buttonIndex); }
              else if (buttonIndex === 2) { Alert.alert('Index'+ buttonIndex); }
              else if (buttonIndex === 3) {
                AlertIOS.alert(
                  'Confirm Delete',
                  'Are you sure want to delete conversation with '+ name +'? ',
                  [
                    {
                      text: 'Yes',
                      onPress: () => console.log('Yes Pressed'),
                      style: 'destructive',
                    },
                    {
                      text: 'No',
                      onPress: () => console.log('No Pressed'),

                    },
                  ]
                );
              }
            });
      }
  }

  _renderCheckBox() {
    return (
      <CheckBoxContainer
       selectedKey={this.props.selectedKey}
       phone_number={this.props.item.phone_number}
       />
    );
  }

  render() {
    const val = this.props.item;
    const conversation_id = this.state.conversation_id;
    const contact = this.props.contact;
    const phone_number = val.phone_number;
    const phone_number_display = this.props.lastMessage;
    const name = this.state.conversation_name;
    const time = Moment(new Date(val.createdTimeOnDevice)).format('HH:mm');
    return (
      <TouchableOpacity
        onPress={() => {
            Actions.conversations({
            conversation_id,
            title: name,
            friendsPhoneNumber: phone_number,
            contactDetail: contact,
            isGroup: false
          });
        }
      }
        // onLongPress= {() => this._onLongPressButton(name)} // =========== Temporary Comment =========== //
      >

        <View style={{ flexDirection: 'row', flex: 1 }}>
         {this._renderCheckBox()}
          <Row
            key={val.uid}
            data={{
              name,
              phone_number: phone_number_display,
              time,
              badge: this.props.badge || 0,
              profile_picture: this.props.user_detail.profile_picture || ''
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { conversation_id } = ownProps;
  const conversation_name =
  state.ContactsReducer.byId[conversation_id] ?
  (state.ContactsReducer.byId[conversation_id] || {}).name || '-' : conversation_id;
  return {
    conversation_id,
    conversation_name,
    lastMessage: state.ConversationReducer.friendChats[ownProps.item.phone_number].last_message,
    contact: state.ContactsReducer.byId[ownProps.item.phone_number] || {},
    badge: state.ConversationReducer.friendChatsBadge[ownProps.item.phone_number],
    user_detail: state.UsersReducer.byId[ownProps.item.phone_number] || {},
    my_phone_number: state.UserprofileReducer.phone_number || ''
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUserDetail,
      deleteFriendChat
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsDetailContainer);
