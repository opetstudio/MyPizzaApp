import React from 'react';
import {
  View,
  Text,
  Alert
}
from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChatsContainer from '../containers/ChatsContainer';
import CreateProfileScreen from './CreateProfileScreen';

let selfNumber = '';
let redirect = null;

class ChatsScreen extends React.Component {
  componentWillMount() {
    if (this.props.selfNumber !== '') selfNumber = this.props.selfNumber;
    else if (this.props.session.sessionPhoneNumber !== '') selfNumber = this.props.session.sessionPhoneNumber;
    this.setState({
      selfNumber: this.props.selfNumber
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selfNumber: nextProps.selfNumber
    });
  }
  componentDidMount() {
    console.log('[ChatsScreen] component componentDidMount', this.props);
  }
  componentWillUnmount() {
    console.log('[ChatsScreen] component componentWillUnmount');
  }

  render() {
    console.log('ChatScreen render');
    console.log('ChatScreen render editable', this.props.editMode);
    if (this.state.selfNumber !== '' && redirect !== null) {
      redirect = 'ok';
      Actions.createProfile();
    }
    return (
        <ChatsContainer editMode={this.props.editMode || false}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    selfNumber: state.SessionReducer.sessionPhoneNumber || '',
    display_name: state.UserprofileReducer.display_name || ''
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsScreen);
