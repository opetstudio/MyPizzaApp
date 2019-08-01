import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class GroupRowName extends React.Component {
    render() {
        return (
            <View>
          <Text
          adjustsFontSizeToFit
          ellipsizeMode={'tail'}
          numberOfLines={1}
          minimumFontScale={0.9}
          style={{
            color: 'black',
            fontSize: 16
          }}
          >{this.props.groupName}</Text></View>
        );
    }
}
export default connect((state, ownProps) => ({
    groupName: (state.GroupReducer.byId[ownProps.groupId] || {}).name
}))(GroupRowName);
