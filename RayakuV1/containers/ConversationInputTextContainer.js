import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  inputMessageModification
} from '../actions/ConversationAction';

import { fetchUserDetail } from '../actions/UsersAction';

const sendMsgIcon = require('../assets/images/send-msg.png');

class ConversationInputTextContainer extends React.Component {
  constructor(props) {
    // //console.log('[ConversationInputTextContainer] constructor');
    super(props);
    this.state = {};
    this._renderInputText = this._renderInputText.bind(this);
    this._onChangeTextInput = this._onChangeTextInput.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }

  componentWillMount() {
    // //console.log('[ConversationInputTextContainer] componentWillMount');
    this.state.inputTextValue = this.props.inputMessageObj[this.props.friendPhoneNumberB64] || '';
    this.state.friendPhoneNumberB64 = this.props.friendPhoneNumberB64;
    this.state.myPhoneNumberB64 = this.props.myPhoneNumberB64;
    this.state.inputHeight = 0;
    this.state.marginBottom = 0;

    this.state.userDetail = this.props.userDetail;

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    // get users detail
    this.props.fetchUserDetail({
      friendPhoneNumberB64: this.state.friendPhoneNumberB64,
      myPhoneNumberB64: this.state.myPhoneNumberB64,
      isGroup: this.props.isGroup
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('[ConversationInputTextContainer] componentWillReceiveProps');
    this.state.friendPhoneNumberB64 = nextProps.friendPhoneNumberB64;
    this.state.userDetail = nextProps.userDetail;
  }
  _keyboardDidShow(e) {
    // console.log('[ConversationInputTextContainer] _keyboardDidShow');

      // this.props.navigation.setParams({
      //     keyboardHeight: e.endCoordinates.height,
      //     normalHeight: Dimensions.get('window').height,
      //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height,
      // });

      // const { height, screenX, screenY, width } = e.endCoordinates.height;
      // // console.log('e.endCoordinates.height:', e.endCoordinates.height);
      // console.log('[ConversationInputTextContainer] _keyboardDidShow setState');
      this.setState({ marginBottom: e.endCoordinates.height });
      // alert('cek');
  }
  _keyboardDidHide(e) {
    // console.log('[ConversationInputTextContainer] _keyboardDidHide');
    // console.log('[ConversationInputTextContainer] _keyboardDidHide setState');
    this.setState({ marginBottom: 0 });
  }
  _onChangeTextInput(text) {
    // console.log('[ConversationInputTextContainer] _onChangeTextInput setState');
    this.props.inputMessageModification({
      text,
      friendPhoneNumberB64: this.state.friendPhoneNumberB64
    });
    this.setState({
      inputTextValue: text
    });
  }
  _onContentSizeChange = ({ nativeEvent: event }) => {
    let currentHeight = event.contentSize.height;
      if (currentHeight > 150) {
        currentHeight = 150;
      }
    // console.log('[ConversationInputTextContainer] _onContentSizeChange setState');
    this.setState({ inputHeight: currentHeight });
  };
  _doSendMessage = (msg) => new Promise(() => {
      this.props.sendMessage(msg, this.state.userDetail);
  });
  _sendMessage() {
    // console.log('[ConversationInputTextContainer] begin _sendMessage');

    this._doSendMessage(this.state.inputTextValue);
    // this._onChangeTextInput('');
    this.setState({
      inputTextValue: ''
    });
    // console.log('[ConversationInputTextContainer] end _sendMessage');
  }
  _renderInputText() {
    // console.log('[ConversationInputTextContainer] _renderInputText ');
      return (
            <TextInput
              value={this.state.inputTextValue}
              multiline
              onChangeText={this._onChangeTextInput}
              onContentSizeChange={this._onContentSizeChange}
              placeholder="Type something.."
              placeholderTextColor="#1F1F1F50"
              underlineColorAndroid="transparent"
              style={{
                  flex: 4,
                  fontSize: 15,
                  height: Math.max(Platform.OS === 'ios' ? 40 : 45, (this.state || {}).inputHeight || 0),
                  marginTop: Platform.OS === 'ios' ? 5 : 0,
                  marginLeft: 15,
                  marginBottom: Platform.OS === 'android' ? 0 : 0,
                  marginRight: 10,
                  paddingVertical: Platform.OS === 'ios' ? 10 : 0,
                  //paddingBottom: Platform.OS === 'android' ? 4 : 0,
                  paddingBottom: 6,
                  backgroundColor: '#FFF'
                }}
            />
    );
  }
  render() {
    // console.log('[ConversationInputTextContainer] render ');
    return (
      <View>
        <LinearGradient
           colors={['#FFFFFF00', '#FFF']}
           style={{ height: 15 }}
        />
        <View
          style={{
          flexDirection: 'row',
          height: Math.max(45, (this.state.inputHeight)),
          //height: 45,
          marginBottom: Platform.OS === 'ios' ? this.state.marginBottom : 0,
          backgroundColor: '#FFF',
          }}
        >
          {this._renderInputText()}
          <TouchableOpacity onPress={this._sendMessage} underlayColor=''>
            <View
              style={{
              flex: 1,
              marginRight: 15,
              marginBottom: 6,
              justifyContent: 'center'
              }}
            >
              <Image
                source={sendMsgIcon}
                resizeMode='contain'
                style={{
                height: 50,
                width: 40,
                }}
              />
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // //console.log('[ConversationInputTextContainer] mapStateToProps');
    const userDetail = ownProps.isGroup ?
    state.GroupReducer.byId[ownProps.friendPhoneNumberB64]
      : state.UsersReducer.byId[ownProps.friendPhoneNumberB64] || {};
  return {
    inputMessageObj: state.ConversationReducer.inputMessageObj,
    userDetail
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      inputMessageModification,
      fetchUserDetail
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationInputTextContainer);
