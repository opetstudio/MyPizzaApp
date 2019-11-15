import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Title,
  Body,
  Right,
  Text,
  Icon
} from "native-base";
import {ImageBackground, View, Image, StatusBar} from 'react-native'
import {isIphoneX} from '../../Lib/helper/platform'
import StyledStatusBar from '../../Containers/StyledStatusBar'
import { Center } from '@builderx/utils'
// import Icon from '@builderx/icons'
import Footer from '../../Containers/Footer'
import {Images, Metrics, Colors} from '../../Themes'

const styles = {
    container: {
        backgroundColor: '#eb1c24'
    },
    backgroundImg: {
        flex: 1,
        width: Metrics.screenWidth
    },
    icon2: {
        color: 'rgba(255,255,255,1)',
        fontSize: 35,
    },
    images: {
        color: 'rgba(0,0,0,1)',
        width: '100%',
        marginTop: 40
      },
      text2: {
        color: 'rgba(255,255,255,1)',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 30
      },
  }
  class ScreenShowqr extends Component {
  render() {
    return (
      <Container style={styles.container}>
            <StatusBar translucent backgroundColor={'#eb1c24'} />
            <Header transparent>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body />
              <Right />
            </Header>
            <Content padder style={{}}>
                <Text style={styles.text2}>Scan This QR Code</Text>
                <Image source={Images.qrcode} style={styles.images} />
            </Content>
      </Container>
    );
  }
}

export default ScreenShowqr;
