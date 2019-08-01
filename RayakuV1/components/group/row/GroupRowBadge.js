import React from 'react';
import { Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

class GroupRowBadge extends React.Component {
    render() {
        const badge = this.props.badgeNumber;
        if (badge === 0) return null;
        return (
            <View>
          <Text
          style={
            badge ?
              {
                fontSize: 12,
                color: '#FFFFFF',
                paddingTop: (Platform.OS === 'ios') ? 3 : 1,
                paddingLeft: (Platform.OS === 'ios') ? 1 : 0,
                textAlign: 'center',
                borderRadius: 10,
                backgroundColor: '#FD5B31',
                width: 20,
                height: 20,
                overflow: 'hidden'
              } :
            null
           }
          >{badge}</Text></View>
        );
    }
}
export default connect((state, ownProps) => ({
    badgeNumber: state.ConversationReducer.friendChatsBadge[ownProps.groupId] || 0
}))(GroupRowBadge);
