import React, { Component } from 'react'
import {View, Text, TextInput} from 'react-native'

import {styles} from './styles'

class InputSearch extends Component {
  render () {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
        <TextInput
          placeholder='type page number'
          ref='inputText'
          placeholderTextColor='#1F1F1F50'
          underlineColorAndroid='transparent'
          style={{ color: '#fff', alignSelf: 'stretch' }}
          onChangeText={this.props.onChange}
        />
      </View>
    )
  }
}
export default InputSearch
