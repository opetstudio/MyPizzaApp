import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import {isEmpty} from 'lodash'

import styles from './Styles'
import {Images, Colors} from '../../Themes'
import AlertMessage from '../AlertMessage'

const sendMsgIcon = Images.sendMsgIcon

class CommentInput extends Component {
  static defaultProps = { isPostingInProgress: false, commentResetInputtext: () => {} }

  static propTypes = {
    commentPost: PropTypes.func,
    isPostingInProgress: PropTypes.bool,
    currentTextInputValue: PropTypes.string,
    errorMessage: PropTypes.string,
    commentResetInputtext: PropTypes.func,
    currentUser: PropTypes.object,
    contentType: PropTypes.string,
    contentId: PropTypes.string
  }

  constructor (props) {
    super(props)
    this._renderInputText = this._renderInputText.bind(this)
    this._submitInputText = this._submitInputText.bind(this)
  }
  componentWillMount () {
    this.props.commentResetInputtext()
  }
  _submitInputText (inputText = {}) {
    if (!isEmpty(this.props.currentTextInputValue)) {
      const dataPost = {
        contentComment: this.props.currentTextInputValue,
        // contentComment: inputText._lastNativeText,
        contentType: this.props.contentType,
        contentId: this.props.contentId,
        user: this.props.currentUser._id // mongo_id
      }
      this.props.commentPost(dataPost)
    }
  }
  _renderInputText () {
    return (
      <TextInput
        value={this.props.currentTextInputValue}
        ref='inputText'
        multiline
        onChangeText={this.props.commentTextinputOnchange}
        placeholder='Type something..'
        placeholderTextColor='#1F1F1F50'
        underlineColorAndroid='transparent'
        style={[styles.textInput]}
      />
    )
  }
  render () {
    const errorMessage = this.props.errorMessage
    return (
      <View>
        <View
          style={[styles.inputWrapper]}
        >
          {this._renderInputText()}
          {this.props.isPostingInProgress &&
            <View
              style={styles.rightWrapper}
            >
              <ActivityIndicator size='small' color={Colors.colorPrimary} />
            </View>
          }
          {!this.props.isPostingInProgress &&
          <TouchableOpacity onPress={() => this._submitInputText(this.refs.inputText)} underlayColor=''>
            <View
              style={styles.rightWrapper}
            >
              <Image
                source={sendMsgIcon}
                resizeMode='contain'
                style={{
                  height: 50,
                  width: 40
                }}
              />
            </View>
          </TouchableOpacity>}
        </View>
        {errorMessage && errorMessage !== null &&
        <AlertMessage
          title={errorMessage}
          style={{backgroundColor: 'yellow'}}
          styleText={{color: 'red'}}
        />}
      </View>
    )
  }
}

export default CommentInput
