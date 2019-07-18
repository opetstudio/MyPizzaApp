import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left
} from 'native-base'
import I18n from '../I18n'
import HeaderMenu from '../Components/HeaderMenu'
import AppConfig from '../Config/AppConfig'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AboutAppScreenStyle'

const labelScreen = 'About App'

class AboutAppScreen extends Component {
  render () {
    return (
      <Container>
        <HeaderMenu
          hasHamburger
          hasSearch
          navigation={this.props.navigation}
          title={labelScreen}
        />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{I18n.t('APP_DESCRIPTION')}</Text>
                  {/* <Text note>...</Text> */}
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>AppVersion: {AppConfig.appVersion}</Text>
                  <Text>AppVersionBuild: {AppConfig.appVersionBuild}</Text>
                  {/* <Text note>...</Text> */}
                </Body>
              </Left>
            </CardItem>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutAppScreen)
