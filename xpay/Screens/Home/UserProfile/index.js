import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { Center } from '@builderx/utils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {isIphoneX} from '../../../Lib/helper/platform'
import {Images} from '../../../Themes'

export default class UserProfile extends Component {
  static propTypes = {
    showSaldo: PropTypes.bool
  }
  //
  // // Defaults for props
  static defaultProps = {
    showSaldo: true
  }
  constructor (props) {
    super(props)
    this.state = {
      showSaldo: this.props.showSaldo
    }
    this._toggleShowSaldo = this._toggleShowSaldo.bind(this)
  }
  _toggleShowSaldo () {
    this.setState({showSaldo: !this.state.showSaldo})
  }
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={Images.cardImage2}
          style={styles.image}
        />
        {/* <Center horizontal> */}
        <Text style={styles.text}>Nofrets Poaiiii</Text>
        {/* </Center> */}
        {/* <Center horizontal> */}
        {/* </Center> */}
        {this.state.showSaldo && (<TouchableOpacity style={styles.iconStack} onPress={this._toggleShowSaldo}>
          <Text style={styles.text2}>My wallet</Text>
          <Text style={styles.text3}>IDR 900,000</Text>
        </TouchableOpacity>)}
        {!this.state.showSaldo && (<TouchableOpacity style={styles.iconStack} onPress={this._toggleShowSaldo}>
          <Image source={Images.walletIcon} />
        </TouchableOpacity>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(218,55,49,1)',
    alignItems: 'center',
    borderRadius: 2,
    overflow: 'hidden'
  },
  image: {
    width: 103,
    height: 103,
    backgroundColor: '#CCC',
    borderRadius: isIphoneX ? 50 : 100,
    margin: 40
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    fontFamily: 'Roboto-Bold'
  },
  text2: {
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    fontFamily: 'roboto-Light'
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 40
  },
  text3: {
    color: 'rgba(255,253,84,1)',
    fontSize: 25,
    fontFamily: 'roboto-Light'
  },
  iconStack: {
    width: '100%',
    alignItems: 'center',
    margin: 10
  }
})
