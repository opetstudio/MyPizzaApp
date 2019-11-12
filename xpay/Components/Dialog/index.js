import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Lodash from 'lodash'
import I18n from '../../I18n'
import Overlay from '../Overlay'
import StyledText from '../StyledText'
import styles, { modalStyle } from './styles'
// import {
//   Button
// } from 'native-base'
import Button from '../Button/StyledButton'
// import { isNullOrUndefined } from 'util'

const textMessage = I18n.t

export default class Dialog extends Component {
  // // Prop type warnings
  static propTypes = {
    hidePopup: PropTypes.func,
    isOpen: PropTypes.bool,
    message: PropTypes.object
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  generateActionButton (type, addedStyle, actionObject) {
    const { message, hidePopup } = this.props
    const onPressHandler = () => {
      hidePopup()
      // alert('coook')
      if (actionObject && actionObject.handler) {
        return actionObject.handler()
      }
      return null
    }

    // return (
    //   <Button
    //     onPress={onPressHandler}
    //     block
    //     info
    //     >
    //     <Text
    //       style={{ color: 'white' }}
    //     >{textMessage(actionObject.name)}</Text>
    //   </Button>
    // )
    return (
      <View
        style={[
          styles.buttonContainer,
          message.actions.length > 2 ? styles.smallButton : styles.largeButton
        ]}
      >
        <Button type={type} onPress={onPressHandler} addedStyle={addedStyle}>
          {textMessage(actionObject.name)}
        </Button>
      </View>
    )
  }

  render () {
    const { isOpen, message } = this.props
    if (!isOpen) {
      return null
    }
    const actionButtons = message && message.actions
    const title = message.title ? message.title : 'popup-error'
    const body = message.body ? message.body : ''
    const imageBody = message.imageBody ? message.imageBody : ''
    const imageUrl = message.imageSource ? message.imageSource : ''
    /**
     * This was written in order to add support for injecting
     * components inside the popup(at title and body position).
     *
     * Returns component if a component is passed to it,
     * returns a translated string if String type is passed,
     * returns a stubbed string if an Object with the Template String and Substitute values is passed
     *
     * @param content { React.Component | String | {template: String, values: Object}}
     * @returns {React.Component}
     */
    const renderReactElementOrString = content => {
      if (content) {
        if (React.isValidElement(content)) {
          __DEV__ && console.log('====> content is valid element', content)
          return content
        } else {
          __DEV__ && console.log('====> content is not valid element', content)
          if (
            Lodash.isPlainObject(content) &&
            Lodash.has(content, 'template')
          ) {
            return textMessage(content.template)
          } else if (
            Lodash.isPlainObject(content) &&
            Lodash.has(content, 'template') &&
            Lodash.has(content, 'values')
          ) {
            return textMessage(content.template, content.values)
          }
          return content
        }
      }

      return null
    }
    return (
      <Overlay
        animationType='fade'
        childrenWrapperStyle={modalStyle.modalBody}
        closeOnTouchOutside={false}
        containerStyle={modalStyle.modalContainer}
        visible={isOpen}
      >
        <StyledText textStyle='h4MedWhiteP' isUnderline>
          {renderReactElementOrString(title)}
        </StyledText>
        {(message.imageUrl || message.imageBody) && (
          <View style={styles.imageContainer}>
            <Image source={imageUrl} />
            <StyledText textStyle='h6' addedStyle={styles.imageBody}>
              {renderReactElementOrString(imageBody)}
            </StyledText>
          </View>
        )}
        {message.body && !React.isValidElement(message.body) && (
          <StyledText textStyle='h11LtGreyS2' addedStyle={styles.message}>
            {renderReactElementOrString(body)}
          </StyledText>
        )}
        {message.body && React.isValidElement(message.body) && (
          <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
            {renderReactElementOrString(body)}
          </View>
        )}

        {actionButtons.length === 1 &&
          this.generateActionButton(
            'secondary',
            styles.buttonAddedStyle,
            actionButtons[0]
          )
        }
        {actionButtons.length === 2 &&
          <View
            style={[
              styles.actionButtons,
              actionButtons.length === 1
                ? styles.centerButton
                : styles.spaceBetweenButton
            ]}
          >
            {this.generateActionButton(
            'secondary',
            styles.buttonAddedStyle,
            actionButtons[0]
          )}
            {this.generateActionButton(
            'primary',
            styles.highlightedButtonStyle,
            actionButtons[1]
          )}
          </View>
        }
        {actionButtons.length > 2 &&
          <View
            style={[
              styles.actionButtons,
              actionButtons.length === 1
                ? styles.centerButton
                : styles.spaceBetweenButton
            ]}
          >
            {this.generateActionButton(
              'secondary',
              styles.buttonAddedStyle,
              actionButtons[1]
            )}
            {this.generateActionButton(
              'primary',
              styles.highlightedButtonStyle,
              actionButtons[actionButtons.length - 1]
            )}
          </View>
        }
      </Overlay>
    )
  }
}
