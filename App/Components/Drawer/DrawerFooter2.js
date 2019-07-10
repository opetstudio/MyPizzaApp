import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles'

import { Text, List, ListItem, Icon, Left, Right, Badge, Thumbnail, Button, Body } from 'native-base'

class DrawerFooter2 extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    popupShow: PropTypes.func.isRequired,
    popupHide: PropTypes.func.isRequired,
    sessionLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  render()
  {
      return(
          <View style={styles.drawerFooter2}>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate('LoginScreen2')}>
                <Left>
                    <Icon
                        active
                        name="heart"
                        style={{ color:  '#00bfff', fontSize: 26, width: 30 }}
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