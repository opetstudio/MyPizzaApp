import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TextInput
}
from 'react-native';
import { connect } from 'react-redux';

import GroupContactsContainer from './GroupContactsContainer';
import { SELECTED_GROUP_MEMBERS_KEY } from '../constants';

class NewGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this._onChangeInputSearch = this._onChangeInputSearch.bind(this);
  }
  componentWillMount() {
    this.setState({
      inputSearch: ''
    });
  }
  _onChangeInputSearch(val) {
    // //console.log('[NewChatScreen] _onChangeInputSearch', this.state);

    this.setState({
      inputSearch: val
    });
  }

  render() {
    const exceptList = [this.props.session.sessionPhoneNumber];
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
            //flex: 1
          }}
        >
          <GroupContactsContainer
            inputSearch={this.state.inputSearch}
            selectedKey={SELECTED_GROUP_MEMBERS_KEY}
            except={exceptList}
          />
        </View>
      </View>
    );
  }
}

export default connect((state) => ({ session: state.SessionReducer }))(NewGroupContainer);
