import React, {Component} from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'
import Metrics from '../Themes/Metrics'
import PropTypes from 'prop-types'

export default class CustomButton extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  render () {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={'transparent'}>
        <LinearGradient colors={['#647BFF', '#0BCDFF']} style={styles.customBtnBG} start={{x: 0, y: 1}} end={{x: 1, y: 1}}>
          <Text style={styles.customBtnText}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({

  customBtnText: {
    color: Colors.snow,
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
});
