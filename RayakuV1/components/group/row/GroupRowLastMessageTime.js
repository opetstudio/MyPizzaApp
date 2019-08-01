import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

class GroupRowLastMessageTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.state.lastMessageTime = this.props.lastMessageTime;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lastMessageTime: nextProps.lastMessageTime
        });
    }
    render() {
        const time = Moment(new Date(this.state.lastMessageTime || 0)).format('HH:mm') || '';
        return (
        <View>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 12,
              color: '#AAAAA9',
              fontWeight: '500'
             }}
          >{time}</Text>
        </View>
        );
    }
}
// export default connect((state, ownProps) => ({
//     lastMessageTime: (state.GroupReducer.byId[ownProps.groupId] || {}).lastMessageTime
// }))(GroupRowLastMessageTime);

export default connect((state, ownProps) => {
    // console.log('[GroupLastMessage] connect', state);
    const listMsgArr = state.ConversationReducer.friendMessages[ownProps.groupId] || [];
    const lastMsgObj = state.ConversationReducer.byId[(listMsgArr[listMsgArr.length - 1] || '')] || {};
    const groupDetail = state.GroupReducer.byId[ownProps.groupId] || {};
    return {
        lastMessageTime: lastMsgObj.createdTimeOnDevice || groupDetail.createdon || ''
    };
    // return { lastMessage: (state.GroupReducer.byId[ownProps.groupId] || {}).lastMessage };
})(GroupRowLastMessageTime);
