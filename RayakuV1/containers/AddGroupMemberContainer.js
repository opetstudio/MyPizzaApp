import React from 'react';
import {
  View,
  TextInput
}
from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SELECTED_EXISTING_GROUP_MEMBERS_KEY } from '../constants';
import GroupContactsContainer from './GroupContactsContainer';
import { saveGroupProfileId, clearFormCreateGroup } from '../actions/GroupprofileAction';

class AddGroupMemberContainer extends React.Component {
  constructor(props) {
    super(props);
    this._onChangeInputSearch = this._onChangeInputSearch.bind(this);
  }
  componentWillMount() {
    this.setState({
      inputSearch: ''
    });
    this.props.saveGroupProfileId(this.props.groupId);
  }
  componentWillUnmount() {
    this.props.clearFormCreateGroup();
  }
  _onChangeInputSearch(val) {
    // //console.log('[NewChatScreen] _onChangeInputSearch', this.state);

    this.setState({
      inputSearch: val
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF'
        }}
      >
        <View
          style={{
            marginBottom: 15,
            marginTop: 1,
            backgroundColor: '#FFF',
            elevation: 10,
            paddingTop: 5,
            paddingBottom: 3,
            paddingHorizontal: 14
          }}
        >
          <TextInput
            style={{
              height: 40,
              fontSize: 17,
            }}
            underlineColorAndroid='transparent'
            placeholder='Search...'
            onChangeText={(text) => this._onChangeInputSearch(text)}
            value={this.state.inputSearch}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            marginLeft: 5
          }}
        >
          <GroupContactsContainer
            inputSearch={this.state.inputSearch}
            selectedKey={SELECTED_EXISTING_GROUP_MEMBERS_KEY}
            groupId={this.props.groupId}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveGroupProfileId,
      clearFormCreateGroup
    },
    dispatch
  );
}

export default connect((state) => ({ session: state.SessionReducer }), mapDispatchToProps)(AddGroupMemberContainer);
