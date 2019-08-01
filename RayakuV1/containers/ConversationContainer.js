import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  AppState
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import FCM from 'react-native-fcm';


import {
  fetchAll,
  inputMessageModification,
  sendMessage,
  updateStatusMessageRead,
  updateStatusMessageReadGroup,
  setConversationOnFocus,
  fetchAllEachConversation,
  resetGroupBadge
} from '../actions/ConversationAction';

import { setFcmToken } from '../actions/SessionAction';

import ConversationInputTextContainer from './ConversationInputTextContainer';
import ConversationDetailContainer from './ConversationDetailContainer';
import { addMessage as addMessageGraphql } from '../actions/GraphqlAction';
import { fetchUserDetail } from '../actions/UsersAction';

import { setLastMessageToGroupById } from '../actions/GroupprofileAction';

const bgChat = require('../assets/images/batikbg-transp.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bubbleDay: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF70',
    opacity: 100,
    marginBottom: 30
  },
  bubbleDayText: {
    fontSize: 12,
    color: '#999999'
  }
});

class ConversationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._sendMessage = this._sendMessage.bind(this);
    this._scrollToBottom = this._scrollToBottom.bind(this);
    this._renderScrollView = this._renderScrollView.bind(this);
    this._render_row = this._render_row.bind(this);
    this._renderStartChat = this._renderStartChat.bind(this);
    this._getPaginatedItems = this._getPaginatedItems.bind(this);
    this._next_offset = this._next_offset.bind(this);
    this._setDataSource = this._setDataSource.bind(this);
    this._messagePendingCallback = this._messagePendingCallback.bind(this);
    this._messageSentCallback = this._messageSentCallback.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._updateStatusMessageRead = this._updateStatusMessageRead.bind(this);
    this._fetchAllConversation = this._fetchAllConversation.bind(this);
    this._setFcmTokenOnFirebase = this._setFcmTokenOnFirebase.bind(this);
    this.state = {};
  }
  componentWillMount() {
    const myPhoneNumber = this.props.sessionPhoneNumber;
    // const myPhoneNumberB64 = b64.encode(myPhoneNumber);
    this.state.myPhoneNumberB64 = myPhoneNumber;
    this.state.friendPhoneNumberB64 = this.props.friendsPhoneNumber;
    this.state.friendMessagesList = this.props.friendMessagesList;
    this.state.total_message = this.props.total_message;
    this.state.byId = this.props.byId;
    this.state.isGroup = this.props.isGroup;
    this.state.lastUidMessage = '';
    this.state.messageUnRead = [];
    this.state.page = 1;
    this.state.seed = 1;
    this.state.per_page = 15;
    this.state.textYPosition = 0;
    this.state.textHeight = 0;
    this.state.rerender = true;

    if (!this.state.isGroup) {
      this.props.fetchUserDetail({
        friendPhoneNumberB64: this.state.friendPhoneNumberB64,
        myPhoneNumberB64: this.state.myPhoneNumberB64
      });
    }

    this._fetchAllConversation();
    this._setFcmTokenOnFirebase(this.state.myPhoneNumberB64);

    // set listAllMessages
    // set totalItems
    this._setDataSource();
    this.props.setConversationOnFocus('');
    // set currentListAllArr
    this._getPaginatedItems();

    this.props.resetGroupBadge(this.state.friendPhoneNumberB64);

    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillReceiveProps(nextProps) {
    this.state.myPhoneNumberB64 = nextProps.sessionPhoneNumber;
    this.state.friendMessagesList = nextProps.friendMessagesList;
    this.state.total_message = nextProps.total_message;
    this.state.byId = nextProps.byId;
    this.state.friendPhoneNumberB64 = nextProps.friendsPhoneNumber;
    this.state.isGroup = nextProps.isGroup;

    this._setDataSource();
    this._getPaginatedItems();
  }
  componentWillUnmount() {
    this.props.setConversationOnFocus('');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _setFcmTokenOnFirebase(phoneNumber) {
    FCM.getFCMToken().then((token) => {
      setFcmToken(phoneNumber, token);
    });
  }

  contentHeight = 0;
  scrollViewHeight = 0;
  _handleAppStateChange() {
    // this._updateStatusMessageRead(this.state.currentListAllArr);
    this._fetchAllConversation();
  }
  _fetchAllConversation() {
    this.props.fetchAllEachConversation({
      page: this.state.page,
      my_msisdn: this.state.myPhoneNumberB64,
      conversation_id: this.state.friendPhoneNumberB64,
      // myPhoneNumberB64: this.state.myPhoneNumberB64,
      // myFriendPhoneNumberB64: this.state.friendPhoneNumberB64, // group_id
      isGroup: this.state.isGroup
    });
  }
  _updateStatusMessageRead(listData) {
    // console.log('[ConversationContainer] _updateStatusMessageRead ', listData);
    console.log('[ConversationContainer] _updateStatusMessageRead ', AppState.currentState);
    // console.log('[ConversationContainer] _updateStatusMessageRead state=', this.state);
    this.props.setConversationOnFocus(this.state.friendPhoneNumberB64);
    // if (this.state.isGroup) return;

    if (AppState.currentState === 'active') {
      let messageUnRead = [];
      if (!this.state.isGroup) {
        messageUnRead =
        _.filter(listData, (o) => o.status < 4 && o.type === 'r');
        this.props.updateStatusMessageRead(messageUnRead);
      }
      if (this.state.isGroup) {
        messageUnRead =
        // _.filter(listData, (o) => o.status < 4 && o.sender !== this.state.myPhoneNumberB64);
        _.filter(listData, (o) => (o.status < 4 && o.sender !== this.state.myPhoneNumberB64));
        this.props.updateStatusMessageReadGroup(messageUnRead);
      }
    }
  }
  _setDataSource() {
    let lastDay = null;
    this.state.listAllMessages =
    (_.orderBy(this.state.friendMessagesList.filter((v) => this.state.byId[v] !== undefined), ['createdTimeOnDevice'], ['desc'])).map((v) => {
      const messageRow = this.state.byId[v] || {};
      messageRow.createdTimeOnDevice = messageRow.createdTimeOnDevice || messageRow.createdon;
      const day = new Date(messageRow.createdTimeOnDevice).getDay();
      if (day !== lastDay) {
        messageRow.showdate = true;
        lastDay = day;
      } else {
        messageRow.showdate = false;
      }
      return messageRow;
    }).reverse();

    this.state.totalItems = this.state.listAllMessages.length;
  }
  _getPaginatedItems() {
    const offset = (this.state.page - 1) * this.state.per_page;
    const paginatedItems = _.slice(this.state.listAllMessages, 0, offset + this.state.per_page);
    this._updateStatusMessageRead(paginatedItems);
    this.setState({
      currentListAllArr: paginatedItems
    });
  }
  _next_offset() {
    if (this.state.totalItems / this.state.per_page < this.state.page) return false;
    this.state.page += 1;
    this._getPaginatedItems();
    this.setState({ rerender: !this.state.rerender });
    return true;
  }
  _messagePendingCallback(messagePandingOpt) {
    console.log('[ConversationContainer._messagePendingCallback]');
    this.state.currentListAllArr.unshift(messagePandingOpt.messageData);
    this.state.byId = messagePandingOpt.byId;
    this.state.allIds = messagePandingOpt.allIds;
    this.setState({
      rerender: !this.state.rerender
    });
    this._setDataSource();
    if (this.state.isGroup) {
      this.props.setLastMessageToGroupById({
        groupId: this.props.roomId,
        lastMessage: messagePandingOpt.messageData.message,
        createdTimeOnDevice: messagePandingOpt.messageData.createdTimeOnDevice
      });
    }
  }
  _messageSentCallback(messageSentOpt) {
    console.log('[ConversationContainer._messageSentCallback] ', this.state.currentListAllArr);
    // console.log('[ConversationContainer._messageSentCallback] ', this.state.currentListAllArr);
    const findIndex = this.state.isGroup ?
    _.findIndex(this.state.currentListAllArr, {
      id: messageSentOpt.messageData.id
    }) :
    _.findIndex(this.state.currentListAllArr, {
      uid: messageSentOpt.messageData.uid
    });

    console.log('[ConversationContainer._messageSentCallback] findIndex=', findIndex);
    console.log('[ConversationContainer._messageSentCallback] valueByIndex=', this.state.currentListAllArr[findIndex]);
    this.state
      .currentListAllArr[findIndex] = messageSentOpt.messageData;

    this.state.byId = messageSentOpt.byId;
    this.state.allIds = messageSentOpt.allIds;

    this.setState({
      rerender: !this.state.rerender
    });
    this._setDataSource();
  }
  _sendMessage = (msg, userDetail) => new Promise(() => {
    // console.log('[ConversationContainer] _sendMessage msg=', msg);
    // console.log('[ConversationContainer] _sendMessage userDetail=', userDetail);
    // console.log('[ConversationContainer] _sendMessage state=', this.state);
    let isValidMsg = msg.replace(/ |\n/gm, '') !== '';
    if (!isValidMsg) {
      return;
    }
    // const startTime = new Date().getTime();
    const msgPkg = {
      msg,
      friendPhoneNumberB64: this.state.friendPhoneNumberB64,
      myPhoneNumberB64: this.state.myPhoneNumberB64,
      messagePendingCallback: this._messagePendingCallback,
      messageSentCallback: this._messageSentCallback,
      userDetail,
      isGroup: this.state.isGroup
    };
    if (!this.state.isGroup) {
      // console.log('[ConversationContainer] _sendMessage handle user message=', this.state);
      this.props.sendMessage(msgPkg);
    } else {
      // console.log('[ConversationContainer] _sendMessage handle group message=', this.state);
      this.props.addMessageGraphql(msgPkg);
    }
    // const endTime = new Date().getTime();
    // const difTime = endTime - startTime;
    this._scrollToBottom();
  });
  _scrollToBottom(animated = true) {
    const scrollHeight = this.contentHeight - this.scrollViewHeight;
    if (scrollHeight > 0) {
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo({ x: 0, scrollHeight, animated });
    }
  }

  _render_row({ item }) {
    return (
      <ConversationDetailContainer
        item={item}
        sender={this.props.title}
        isGroup={this.props.isGroup}
      />
    );
  }
  _renderStartChat() {
    return (
       <View style={styles.container}>
           <View style={styles.bubbleDay}>
             <Text style={styles.bubbleDayText}>
               Your Conversation Start Here
             </Text>
           </View>
         </View>
     );
  }
  _renderScrollView() {
   // //console.log('_renderScrollView listAllMessages', this.state.currentListAllArr);
    if (this.state.currentListAllArr.length > 0) {
    return (
        <FlatList
          inverted
          data={this.state.currentListAllArr}
          renderItem={this._render_row}
          keyExtractor={(item) => item.uid || item.id}
          initialNumToRender={3}
          style={{
          }}
          onMomentumScrollEnd={() => {
            this._next_offset();
          }}
        />
    );
    }
    return (
      this._renderStartChat()
    );
  }
  render() {
    console.log('[ConversationContainer] render ', this.state);

    return (
      <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F0F0F0' }}>
      <Image
        source={bgChat}
        style={{
          position: 'absolute',
        }}
      />
        {this._renderScrollView()}
        <ConversationInputTextContainer
          sendMessage={this._sendMessage}
          friendPhoneNumberB64={this.state.friendPhoneNumberB64}
          myPhoneNumberB64={this.state.myPhoneNumberB64}
          isGroup={this.props.isGroup}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const friendMessagesList =
    state.ConversationReducer.friendMessages[ownProps.friendsPhoneNumber] || [];
  // //console.log('[ConversationContainer] mapStateToProps');

  return {
    friendMessagesList,
    byId: state.ConversationReducer.byId,
    total_message: friendMessagesList.length,
    sessionPhoneNumber: state.SessionReducer.sessionPhoneNumber,
    roomId: ownProps.friendsPhoneNumber
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAll,
      fetchAllEachConversation,
      inputMessageModification,
      sendMessage,
      updateStatusMessageRead,
      updateStatusMessageReadGroup,
      setConversationOnFocus,
      addMessageGraphql,
      setLastMessageToGroupById,
      resetGroupBadge,
      fetchUserDetail
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ConversationContainer);

