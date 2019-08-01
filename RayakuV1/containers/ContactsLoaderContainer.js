/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  View,
  Text,
  AppState,
  Platform
} from 'react-native';

import {
  reloadLocalContacts
} from '../actions/ContactsAction';

class ContactsLoaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);

    // // console.log('[ContactsLoaderContainer] constructor => ');
  }
  componentWillMount() {
    // // console.log('[ContactsLoaderContainer] componentWillMount => ', this.props);
    const deviceId = this.props.deviceId;
    // // console.log('[ContactsLoaderContainer] deviceId => ', deviceId);

    //  if (this.props.firstLoaded) {
      //  // // console.log('[ContactsLoaderContainer] firstloaded => ', deviceId);

      this.props.reloadLocalContacts({
        deviceId: deviceId || new Date().getTime(),
        actionFlow: ['ContactsLoaderContainer.componentWillMount']
      });
    //  } else {
    //    // // console.log('[ContactsLoaderContainer] not firstloaded => ', deviceId);
    //  }
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillReceiveProps() {
    // // console.log('[ContactsLoaderContainer] componentWillReceiveProps => ');
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    // // console.log('[ContactsLoaderContainer] componentWillUnmount => ',this.props);
  }
  _handleAppStateChange() {
    if (AppState.currentState === 'active') {
      // this.props.reloadLocalContacts({
      //   deviceId: this.props.deviceId || new Date().getTime(),
      //   actionFlow: ['ContactsLoaderContainer._handleAppStateChange']
      // });
    }
  }
  render() {
    // // console.log('[ContactsLoaderContainer] => ');
    return (
      <View />
    );
  }
}

function mapStateToProps(state) {
  // // console.log('[ContactsLoaderContainer] mapStateToProps');

  //  const students = _.map(state.GurustaffReducer.listData, (val, uid) => {
  //    // // console.log('');
  //    return { ...val, uid };
  //  });
  return {
    //  RestapiReducer: state.RestapiReducer,
    //  SessionReducer: state.SessionReducer,
    //  ChatsReducer: state.ChatsReducer,
    //  ConversationReLoad: state.ConversationReducer.reLoad,
    //  ConversationAllIds: state.ConversationReducer.allIds,
    //  NotificationReducer: state.NotificationReducer,
    firstLoaded: state.ContactsReducer.firstLoaded,
    byId: state.ContactsReducer.byId,
    //  dataUsersReducer: state.dataUsersReducer,
    //  sessionReducer: state.sessionReducer,
    //  appReducer: state.appReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      reloadLocalContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsLoaderContainer);
