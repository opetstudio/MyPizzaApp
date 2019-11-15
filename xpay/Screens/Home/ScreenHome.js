import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import {ImageBackground, View, StatusBar} from 'react-native'
import {isIphoneX} from '../../Lib/helper/platform'
import StyledStatusBar from '../../Containers/StyledStatusBar'
import CardSwipe from './CardSwipe'
import Footer from '../../Containers/Footer'
import {Images, Metrics, Colors} from '../../Themes'
import {MaterialCardWithContentAndActionButtons} from './ProfileComponent'
import MaterialButtonViolet from '../../Components/Button/MaterialButtonViolet'

const styles = {
    container: {
      backgroundColor: "#fff"
    },
    backgroundImg: {
        flex: 1,
        width: Metrics.screenWidth
    }
  }
  class ScreenHome extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height: 1}}>
          <StatusBar barStyle="light-content"/>
          <Left />
          <Body />
          <Right />
        </Header>
        {/* <StatusBar translucent backgroundColor={'#c41f19'} /> */}
        {/* {isIphoneX && <StyledStatusBar
            translucent
            backgroundColor={
            isIphoneX
              ? Colors.colorPrimaryDark
              : Colors.colorPrimaryDark
          }
            barStyle='light-content'
            StatusBarAnimation='fade'
          />} */}
        <ImageBackground source={Images.backgroundXpay} style={styles.backgroundImg}>
            <Content>
                <View style={{flex: 1}}>
                    <MaterialCardWithContentAndActionButtons />
                </View>
                <View style={{height: 250}}>
                    <CardSwipe />
                </View>
                <MaterialButtonViolet title={'Add Card'} onPress={() => this.props.navigation.navigate('ScreenAddCard')} style={styles.ButtonVioletSignUp} />
            </Content>
            <Footer />
        </ImageBackground>
      </Container>
    );
  }
}

export default ScreenHome;
