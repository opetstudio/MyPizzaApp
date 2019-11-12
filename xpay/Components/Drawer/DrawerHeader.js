import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {path} from 'ramda'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// import {SessionSelectors} from '../Redux/SessionRedux'

// Styles
import {drawerHeaderStyle as styles} from './Styles'
import {Images} from '../../Themes'

const drawerCover = Images.drawerCover
const drawerImage = Images.drawerImage

class DrawerHeader extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    navigation: PropTypes.object.isRequired
  }
  static defaultProps = {
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    __DEV__ && console.log('[DrawerHeader] render props', this.props)
    const photoURL = path(['photoURL'], this.props.currentUser)
    const displayName = path(['displayName'], this.props.currentUser)
    return (
      <View style={styles.drawerCoverWrapper}>
        <Image source={drawerCover} style={styles.drawerCover} />
        {
          this.props.currentUser &&
        //   <View style={styles.drawerImageWrapper}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyProfileScreen')}
            style={styles.drawerImageWrapper}
            >
            <View style={styles.profileImageView}>
              <Image
                style={styles.profileImage}
                source={{ uri: photoURL + '?type=small' }}
            />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.profileText1}> {displayName} </Text>
            </View>
            {/* <Image square style={styles.drawerImage} source={{ uri: this.props.currentUser.photoURL + '?type=small' }} /> */}
          </TouchableOpacity>
        //   </View>
        }
        {
          !this.props.currentUser &&
          <Image square style={styles.drawerImage} source={drawerImage} />
        }
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     currentUser: SessionSelectors.currentUser(state.session)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

export default DrawerHeader
