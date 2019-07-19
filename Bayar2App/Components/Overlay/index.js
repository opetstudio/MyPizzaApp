import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import styles from './styles'

export default class Overlay extends Component {
  // // Prop type warnings
  static propTypes = {
    animationType: PropTypes.string,
    children: PropTypes.node,
    childrenWrapperStyle: PropTypes.object,
    closeOnTouchOutside: PropTypes.bool,
    containerStyle: PropTypes.object,
    visible: PropTypes.bool
  }
  //
  // // Defaults for props
  static defaultProps = {
    children: null,
    animationType: 'fade',
    visible: false,
    closeOnTouchOutside: false
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({ visible: newProps.visible })
  }

  _hideModal = () => {
    this.setState({ visible: false })
  };

  _stopPropagation = e => e.stopPropagation();

  render () {
    const {
      animationType,
      closeOnTouchOutside,
      children,
      containerStyle,
      childrenWrapperStyle
      // visible
    } = this.props
    return (
      <Modal
        animationType={animationType}
        transparent
        visible={this.state.visible}
        onRequestClose={this._hideModal}
      >
        <TouchableWithoutFeedback
          onPress={closeOnTouchOutside ? this._hideModal : null}
        >
          <View style={[styles.container, containerStyle]}>
            <TouchableWithoutFeedback onPress={this._stopPropagation}>
              <View style={[styles.innerContainer, childrenWrapperStyle]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
