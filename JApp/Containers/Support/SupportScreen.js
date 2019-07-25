import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail
} from 'native-base'
import HeaderMenu from '../../Components/HeaderMenu'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Images, Metrics, Fonts} from '../../Themes'
const labelScreen = 'Support'
const logo = Images.logo

class SupportScreen extends Component {
  _renderSponsorList () {
    const list = [1, 2, 3, 4, 5]
    return list.map(row => (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Thumbnail source={logo} />
            <Body>
              <Text>NativeBase</Text>
              <Text note>GeekyAnts</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    ))
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
          {/* {this._renderSponsorList()} */}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
