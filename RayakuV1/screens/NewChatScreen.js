
import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import ContactsContainer from '../containers/ContactsContainer';

class NewChatScreen extends React.Component {
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
          <ContactsContainer
            inputSearch={this.state.inputSearch}
            session={this.props.session}
          />
        </View>
      </View>
    );
  }
}

export default NewChatScreen;
