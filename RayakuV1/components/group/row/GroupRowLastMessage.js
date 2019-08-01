import React from 'react';
import { Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

class GroupRowLastMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        // console.log('[GroupLastMessage] componentWillMount', this.props);
        this.setState({
            lastMessage: this.props.lastMessage
        });
    }
    componentWillReceiveProps(nextProps) {
        // console.log('[GroupLastMessage] componentWillReceiveProps', nextProps);
        this.setState({
            lastMessage: nextProps.lastMessage
        });
    }
    render() {
        return (
            <View>
          <Text
          numberOfLines={2}
          style={{
            fontSize: 12,
            color: '#1F1F1F50',
            paddingTop: (Platform.OS === 'ios') ? 9 : 6.5
           }}
          >{this.state.lastMessage}</Text></View>
        );
    }
}
export default connect((state, ownProps) => {
    // console.log('[GroupLastMessage] connect', state);
    const listMsgArr = state.ConversationReducer.friendMessages[ownProps.groupId] || [];
    const lastMsgObj = state.ConversationReducer.byId[(listMsgArr[listMsgArr.length - 1] || '')] || {};
    return {
        lastMessage: lastMsgObj.message || ''
    };
})(GroupRowLastMessage);
