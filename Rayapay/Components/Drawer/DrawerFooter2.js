import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './Styles'

import { Text, List, ListItem, Icon, Left, Right, Badge, Thumbnail, Button, Body } from 'native-base'

class DrawerFooter2 extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    popupShow: PropTypes.func.isRequired,
    popupHide: PropTypes.func.isRequired,
    sessionLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    sessionToken: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      sessionToken: this.props.sessionToken
    }
  }

  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate ===> prevProps=', prevProps)
    if (this.props.sessionToken !== null && !_.isEqual(prevProps.sessionToken, this.props.sessionToken) && this.props.sessionToken === '') {
      this.props.navigation.navigate('Auth')
    }
  }

  render () {
    return (
      <View style={styles.drawerFooter2}>
        <ListItem button noBorder onPress={() => this.props.sessionLogout()}>
          <Left>
            <Icon
              active
              name='heart'
              style={{ color: '#00bfff', fontSize: 26, width: 30 }}
              type='FontAwesome' />
            <Text style={styles.text}>
                        Keluar
                      </Text>
          </Left>
        </ListItem>
      </View>
    )
  }
}

export default DrawerFooter2
