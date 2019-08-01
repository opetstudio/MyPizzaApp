import React from 'react';
import {
  View,
  Text,
}
from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PopupMenuMessage } from '../components/PopupMenuMessage';

import { selectEditMode } from '../actions/FlagCheckBoxAction';

import styles from '../styles/NavBar.style';

const icon_down = require('../assets/images/expand-down-white.png');
const icon_down_ios = require('../assets/images/expand-down.png');

class PopupMenuMessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this._toggleEditMode = this._toggleEditMode.bind(this);
  }

  componentWillMount() {
    console.log('[PopupMenuMessageContainer] componentWillMount', this.props);
  }
  componentWillReceiveProps() {
    console.log('[PopupMenuMessageContainer] componentWillReceiveProps', this.props);
  }
  _toggleEditMode() {
      console.log('[PopupMenuMessageContainer] _toggleEditMode', this.props);
    PopupMenuMessage(this.props.selectEditMode);
  }

  render() {
    console.log('[PopupMenuMessageContainer] render');
      return (
        <View style={[styles.conversationMid]}>
        {/* <TouchableOpacity
          onPress = {() => this._toggleEditMode()}
          onLongPress= {() => alert('On Long Pressed')}> */}
          <Text
            style={styles.middleText}
          >{ this.props.title }</Text>
          {/* <Image
            style={styles.imgExpand}
            source= {Platform.OS === 'ios' ? icon_down_ios : icon_down}/> */}
          {/* </TouchableOpacity> */}
        </View>
      );
    }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectEditMode
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(PopupMenuMessageContainer);
