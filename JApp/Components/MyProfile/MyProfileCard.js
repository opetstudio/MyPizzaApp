import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail
} from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Images} from '../../Themes'
const logo = Images.logo

class MyProfileCard extends Component {
  static propTypes = {
    photoURL: PropTypes.string,
    displayName: PropTypes.string
  }
      //
      // // Defaults for props
  static defaultProps = {
  }
  _renderProfileCard () {
    return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Thumbnail square source={{ uri: this.props.photoURL + '?type=small' }} />
            <Body>
              <Text>{this.props.displayName}</Text>
              {/* <Text note>...</Text> */}
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
  }
  render () {
    return this._renderProfileCard()
  }
}

export default MyProfileCard
