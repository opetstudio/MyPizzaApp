import React from 'react';
import { Image, View, Platform } from 'react-native';

import { getConf } from '../conf';

const conf = getConf('rayaku-file-py');
const host = conf.host;

const icon_avatar = require('../assets/images/default-avatar.png');

class RowPicture extends React.Component {
    constructor(props) {
        super(props);
        this._renderSelection = this._renderSelection.bind(this);
        this._onErrorLoadImage = this._onErrorLoadImage.bind(this);
    }
    componentWillMount() {
        // console.log('[RowPicture] component componentWillMount', this.props);
        const profile_picture = this.props.profile_picture || '';
        // console.log('[RowPicture]  componentWillMount profile_picture', profile_picture);
        const source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_avatar;
        // console.log('[RowPicture]  componentWillMount source_avatar', source_avatar);
        this.setState({
          profile_picture,
          source_avatar
        });
    }
    componentWillReceiveProps(nextProps) {
        const profile_picture = nextProps.profile_picture || '';
        const source_avatar = profile_picture !== '' ? { uri: `${host}/api/v1/getFile/small_${profile_picture}` } : icon_avatar;
        this.setState({
          profile_picture,
          source_avatar
        });
      }
    _renderSelection() {
        if (this.props.data.editMode) {
          return (
            <View style={{ width: 50 }}/>
          );
        }
        return null;
    }
      _onErrorLoadImage(e) {
        // console.log('[RowPicture] _onErrorLoadImage e=', e);
        this.setState({
          source_avatar: icon_avatar
        });
    }
    render() {
        console.log('[RowPicture] render this.state.source_avatar}', this.state.source_avatar);
        return (
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
              />
        </View>
        );
    }
}
export default RowPicture;
