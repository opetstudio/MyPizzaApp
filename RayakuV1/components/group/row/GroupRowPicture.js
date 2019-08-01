import React from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { getConf } from '../../../conf';

const conf = getConf('rayaku-file-py');
// const conf = getConf('rayaku-file-py');
const host = conf.host;

const icon_avatar = require('../../../assets/images/group-default-img-xl.png');

class GroupRowPicture extends React.Component {
    constructor(props) {
        super(props);
        this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
        this._getSourceAvatar = this._getSourceAvatar.bind(this);
        this.state = {};
    }
    componentWillMount() {
        // console.log('[GroupRowPicture] componentWillMount=', this.props);
        this.setState({
            groupPicture: this.props.groupPicture,
            source_avatar: this._getSourceAvatar(this.props.groupPicture)
        });
    }
    componentWillReceiveProps(nextProps) {
        // console.log('[GroupRowPicture] componentWillReceiveProps=', nextProps);
        this.setState({
            groupPicture: nextProps.groupPicture,
            source_avatar: this._getSourceAvatar(nextProps.groupPicture)
        });
    }
    _getSourceAvatar(groupPicture) {
        const source_avatar = groupPicture !== '' ? { uri: `${host}/api/v1/getFile/small_${groupPicture}` } : icon_avatar;
        return source_avatar;
    }
    _onErrorLoadImage(e) {
        this.setState({
          source_avatar: icon_avatar
        });
      }
    render() {
        // console.log('[GroupRowPicture] render this.state.source_avatar=', this.state.source_avatar);
        // console.log('[GroupRowPicture] render this.state.source_avatar=', this.props);
        return (
            <View>
          <Image
          source={this.state.source_avatar}
          style={{
            overflow: 'hidden',
            borderRadius: (Platform.OS === 'android') ? 10 : 20,
            height: 60,
            width: 60,
          }}
          resizeMode='cover'
          onError={this._onErrorLoadImage}
          /></View>
        );
    }
}
export default connect((state, ownProps) => {
    const groupPicture = (state.GroupReducer.byId[ownProps.groupId] || {}).picture;
    // console.log('[GroupRowPicture] groupPicture=', groupPicture);
    // console.log('[GroupRowPicture] groupId=', ownProps.groupId);
    return {
        groupPicture
    };
})(GroupRowPicture);
