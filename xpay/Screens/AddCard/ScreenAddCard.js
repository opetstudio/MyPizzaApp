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
import {ImageBackground, View} from 'react-native'
import { Grid, Row } from "react-native-easy-grid";
import Footer from '../../Containers/Footer'
import {Images, Metrics, Colors} from '../../Themes'
import FormAddCard from './FormAddCard'

const styles = {
    container: {
      backgroundColor: "#fff"
    },
    backgroundImg: {
        flex: 1,
        width: Metrics.screenWidth
    }
  }
  class ScreenAddCard extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground source={Images.backgroundXpay} style={styles.backgroundImg}>
            <Header rounded>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Add Card</Title>
              </Body>
              <Right />
            </Header>
            <Grid>
              <Row />
              <Row style={{height: 200}}>
                <FormAddCard
                    onSuccessSubmit={() => {
                      console.log('onSuccessSubmit=====')
                      this.props.navigation.navigate('ScreenOtpValidation')
                    }}
                  />
              </Row>
            </Grid>
        </ImageBackground>
      </Container>
    );
  }
}

export default ScreenAddCard;
