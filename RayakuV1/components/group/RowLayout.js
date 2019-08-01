import React from 'react';
import { View } from 'react-native';

import { getConf } from '../../conf';

import GroupRowName from './row/GroupRowName';
import GroupRowLastMessage from './row/GroupRowLastMessage';
import GroupRowLastMessageTime from './row/GroupRowLastMessageTime';
import GroupRowBadge from './row/GroupRowBadge';
import GroupRowPicture from './row/GroupRowPicture';

// const conf = getConf('rayaku-file-js');
// const host = conf.host;

class RowLayout extends React.Component {
  componentWillMount() {
    this.setState({
      groupId: this.props.groupId
    });
    // this.setState({
    //   profile_picture: this.props.data.profile_picture || '',
    //   source_avatar: this.props.data.profile_picture !== '' ? { uri: `${host}/${this.props.data.profile_picture}` } : icon_avatar
    // });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      groupId: nextProps.groupId
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          marginHorizontal: 7
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: '#FFF',
            height: 70,
            width: 70,
            paddingRight: 5,
          }}
        >
          <GroupRowPicture groupId={this.state.groupId} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            borderBottomWidth: 0.5,
            borderBottomColor: '#97979740',
            height: 70,
            marginLeft: 8,
            paddingLeft: 4,
            paddingTop: 10,
            paddingRight: 4,
            paddingBottom: 2
          }}
        >
          <GroupRowName groupId={this.state.groupId} />
          <GroupRowLastMessage groupId={this.state.groupId} />
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            height: 70,
            width: 60,
            borderBottomWidth: 0.5,
            borderBottomColor: '#97979740',
            paddingTop: 10,
            alignItems: 'flex-end',
            marginRight: 6
          }}
        >
          <GroupRowLastMessageTime groupId={this.state.groupId} />
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <GroupRowBadge groupId={this.state.groupId} />
          </View>
        </View>
        </View>
    );
  }
}

export default RowLayout;
