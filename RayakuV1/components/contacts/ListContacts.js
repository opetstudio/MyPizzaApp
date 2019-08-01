import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TextInput
}
from 'react-native';

import ContactsListContainer from '../../containers/contacts/ContactsListContainer';

class ListContacts extends React.Component {
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
          <ContactsListContainer
            inputSearch={this.state.inputSearch}
          />
        </View>
      </View>
    );
  }
}
export default ListContacts;

