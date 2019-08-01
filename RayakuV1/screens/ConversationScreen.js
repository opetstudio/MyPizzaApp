import React from 'react';
import { View } from 'react-native';

// import ConversationContainer from '../containers/ConversationContainer';
import ConversationContainer from '../containers/ConversationContainer';

class ConversationScreen extends React.Component {
  componentWillMount() {
    // //console.log('[ConversationScreen] component componentWillMount', this.props);
  }
  render() {
    const {
      conversation_id, title, friendsPhoneNumber, contactDetail, isGroup
    } = this.props;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ConversationContainer
          conversation_id={conversation_id}
          title={title}
          friendsPhoneNumber={friendsPhoneNumber}
          contactDetail={contactDetail}
          isGroup={isGroup}
        />
      </View>
    );
  }
}

export default ConversationScreen;
