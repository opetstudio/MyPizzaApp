import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Content
} from 'native-base'
import HeaderMenu from '../HeaderMenu'
import MyProfileCard from './MyProfileCard'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
const labelScreen = 'My Profile'

class MyProfileScreen extends Component {
     // // Prop type warnings
  static propTypes = {
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    navigation: PropTypes.object
  }
  //
  // // Defaults for props
  static defaultProps = {
  }
  render () {
    return (
      <Container>
        <HeaderMenu
          hasHamburger
          hasSearch
          navigation={this.props.navigation}
          title={labelScreen}
        />
        <Content padder>
          <MyProfileCard
            photoURL={this.props.photoURL}
            displayName={this.props.displayName}
          />
        </Content>
      </Container>
    )
  }
}

export default MyProfileScreen
