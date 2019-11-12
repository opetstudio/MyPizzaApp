import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, StatusBar, Image, ScrollView } from 'react-native'
import { Center } from '@builderx/utils'
import Svg, { Ellipse } from 'react-native-svg'
import _ from 'lodash'
import {
  Container
} from 'native-base'
import MaterialIconButtonsFooter from '../symbols/MaterialIconButtonsFooter'
import Footer from '../../Containers/Footer'
import Icon from '@builderx/icons'
import { Images, Metrics } from '../../Themes'

export default class ScreenDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._onSelectTab = this._onSelectTab.bind(this)
  }
  _onSelectTab (activeTab) {
    this.setState({activeTab: activeTab})
  }
  render () {
    return (
      <Container>
      {/* <View style={styles.root}> */}
        {/* <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}> */}
          {/* <View style={styles.rect} />
          <Center horizontal>
            <Svg viewBox={NaN} style={styles.ellipse2}>
              <Ellipse
                strokeWidth={1}
                fill={'rgba(230, 230, 230,1)'}
                stroke={'rgba(230, 230, 230,1)'}
                cx={50}
                cy={50}
                rx={49.5}
                ry={49.5}
            />
            </Svg>
          </Center>
          <Center horizontal>
            <Text style={styles.text}>Berty Tumatangtangggg</Text>
            <Text style={styles.text2}>2.730,330,00</Text>
            <Text style={styles.text3}>Choose Your Payment Card</Text>
          </Center>
          <View style={styles.centered}>
            <Image source={Images.logo3} style={styles.logo} />
          </View>
          <Icon
            type={'MaterialCommunityIcons'}
            name={'chevron-left'}
            style={styles.icon}
        />
          <Icon
            type={'MaterialCommunityIcons'}
            name={'chevron-right'}
            style={styles.icon2}
        />
        <Icon onPress={() => this.props.navigation.navigate('ScreenCard')}
            type={'MaterialCommunityIcons'}
            name={'credit-card-plus'}
            style={styles.icon3}
        />
          <Center horizontal>
            <Text style={styles.text4}>Rayapay (Default)</Text>
          </Center> */}
          {/* <MaterialIconButtonsFooter style={styles.materialIconButtonsFooter} /> */}
          
        {/* </ImageBackground> */}
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.rect} />
          <Center horizontal>
            <Svg viewBox={NaN} style={styles.ellipse2}>
              <Ellipse
                strokeWidth={1}
                fill={'rgba(230, 230, 230,1)'}
                stroke={'rgba(230, 230, 230,1)'}
                cx={50}
                cy={50}
                rx={49.5}
                ry={49.5}
            />
            </Svg>
          </Center>
          <Center horizontal>
            <Text style={styles.text}>Berty Tumatangtangggg</Text>
            <Text style={styles.text2}>2.730,330,00</Text>
            <Text style={styles.text3}>Choose Your Payment Card</Text>
          </Center>
          <View style={styles.centered}>
            <Image source={Images.logo3} style={styles.logo} />
          </View>
          <Icon
            type={'MaterialCommunityIcons'}
            name={'chevron-left'}
            style={styles.icon}
        />
          <Icon
            type={'MaterialCommunityIcons'}
            name={'chevron-right'}
            style={styles.icon2}
        />
        <Icon onPress={() => this.props.navigation.navigate('ScreenCard')}
            type={'MaterialCommunityIcons'}
            name={'credit-card-plus'}
            style={styles.icon3}
        />
          <Center horizontal>
            <Text style={styles.text4}>Rayapay (Default)</Text>
          </Center>
          {/* <MaterialIconButtonsFooter style={styles.materialIconButtonsFooter} /> */}
          
          </ImageBackground>
        </ScrollView>
        <Footer
          onSelectTab={this._onSelectTab}
          initialTab={'tab1'}
          navigation={this.props.navigation}
          />
      {/* </View> */}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  image: {
    top: '13.84%',
    width: '190.64%',
    height: '86.16%',
    position: 'absolute'
  },
  rect: {
    top: '0%',
    left: '0%',
    width: '100%',
    height: '34.92%',
    backgroundColor: '#eb1c24',
    position: 'absolute'
  },
  ellipse2: {
    top: '05.00%',
    width: 100,
    height: 100,
    position: 'absolute'
  },
  text: {
    top: '21.94%',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 16
  },
  text2: {
    top: '26.48%',
    color: 'rgba(126,211,33,1)',
    position: 'absolute',
    fontSize: 30
  },
  text3: {
    top: '40.48%',
    position: 'absolute',
    fontSize: 30
  },
  text4: {
    top: '80.48%',
    position: 'absolute',
    fontSize: 20
  },
  icon: {
    top: '60.00%',
    left: 0,
    position: 'absolute',
    fontSize: 60
  },
  icon2: {
    top: '60.00%',
    right: 0,
    position: 'absolute',
    fontSize: 60
  },
  icon3: {
    top: '78.00%',
    left: 20,
    position: 'absolute',
    fontSize: 60
  },
  logo: {
    marginTop: '80.00%',
    height: 300,
    width: 300,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  materialIconButtonsFooter: {
    left: 0,
    width: '100%',
    height: 55.97,
    backgroundColor: '#2d2d2d',
    position: 'absolute',
    bottom: 0.03
  },
  statusBar: {}
})
