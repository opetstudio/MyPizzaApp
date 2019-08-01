import React from 'react';
import {
  Image,
  View
} from 'react-native';

const new_message = require('../assets/images/new-message-white.png');
const new_group = require('../assets/images/create-group-white.png');

const chatScene = 'messages_tab_chat';

class FloatIcon extends React.Component {
  render() {
    // console.log('FloatIcon show new chat:', this.props.msgScene);
    console.log('FloatIcon Currscene:', this.props.currScene);
    const showChat = this.props.currScene.includes(chatScene);
    console.log('Show Chat:', showChat);
   
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center' }}
      >
      <Image
        style={{height:25, width:25}}
        source={ showChat ? new_message : new_group}
        resizeMode='contain'
        backgroundColor='transparent'
      />
      </View>
    );
  }
}
export default FloatIcon;
