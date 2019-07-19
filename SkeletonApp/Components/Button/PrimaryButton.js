import React, {Component} from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Colors, Fonts, Metrics} from '../../Themes'
import PropTypes from 'prop-types'

export default class PrimaryButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    colors: PropTypes.string
  }

  constructor (props) {
    super(props)
    let gradientColor = ['#647BFF', '#0BCDFF']
    this.state = {
      bgColor: this.props.colors === 'gradient' ? gradientColor : this.props.colors === undefined ? ['#fff', '#fff'] : [this.props.colors, this.props.colors],
      txtStyle: this.props.colors === 'gradient' ? styles.customBtnTextGradient : styles.customBtnText
    }
  }

  render () {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={'transparent'}>
        <LinearGradient colors={this.state.bgColor} style={styles.customBtnBG} start={{x: 0, y: 1}} end={{x: 1, y: 1}}>
          <Text style={this.state.txtStyle} >{this.props.title}</Text>
        </LinearGradient>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({

  customBtnTextGradient: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },

  customBtnText: {
    color: Colors.blackSecondaryOpacity,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },

  customBtnBG: {
    height: 35,
    borderRadius: 5,
    marginHorizontal: 50,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    elevation: 5
  }
})
