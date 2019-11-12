import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, StatusBar, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Center } from '@builderx/utils'
import Svg, { Ellipse } from 'react-native-svg'
import _, {concat, filter} from 'lodash'
import {
  Container
} from 'native-base'
import MaterialIconButtonsFooter from '../symbols/MaterialIconButtonsFooter'
import Footer from '../../Containers/Footer'
import Icon from '@builderx/icons'
import { Images, Metrics } from '../../Themes'
import Header from '../Header'
import AppConfig from '../../Config/AppConfig'
import BoxStatus from '../../Containers/ScreenHome/BoxStatus'
import {isIphoneX} from '../../Lib/helper/platform'

import {MaterialCardWithContentAndActionButtons} from '../ProfileComponent'
import CardSwipe from '../../Containers/CardSwipe'
import MaterialButtonViolet from '../symbols/MaterialButtonViolet'
import MaterialIconTextButtonsFooter from '../../Containers/MaterialIconTextButtonsFooter'


const datastructure = require('../../Data/datastructure.json')


const propTypes = {
  featuredData: PropTypes.array,
  wcmsUrl: PropTypes.string,
  locale: PropTypes.string,
  providers: PropTypes.array,
  categoriesConfig: PropTypes.array,
  genresConfigList: PropTypes.array,
  carousalData: PropTypes.array,
  onClickMoreCategory: PropTypes.func,
  onClickMoreGenre: PropTypes.func,
  showPopup: PropTypes.func
  // onClickItem: PropTypes.func.isRequired
}
const defaultProps = {
  featuredData: datastructure.featuredData,
  wcmsUrl: '',
  providers: [
    {
      tid: 'resourceId1',
      name: 'providername'
    }
  ],
  categoriesConfig: [],
  genresConfigList: [],
  carousalData: [],
  locale: ''
}

export default class ScreenHome extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._onSelectTab = this._onSelectTab.bind(this)
  }
  _onSelectTab (activeTab) {
    this.setState({activeTab: activeTab})
  }
  navigateToContentDetailScreen (id) {
    this.props.onClickItem(id)
  }
  render () {
    // const {} = this.props
    return (
      <Container> 
        <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={styles.backgroundImg}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{flex: 1}}>
            <MaterialCardWithContentAndActionButtons />
          </View>
          <View style={{height: 250, backgroundColor: 'blue'}}>
            <CardSwipe />
          </View>
          <MaterialButtonViolet title={'Add Card'} onPress={() => this.props.navigation.navigate('ScreenCard')} style={styles.ButtonVioletSignUp} />
        </ScrollView>
        {/* <CardList /> */}
      {/* <View style={styles.container}> */}
         {/* <MaterialIconTextButtonsFooter
          style={styles.materialIconTextButtonsFooter}
        /> */}
        {/* <Container> */}
        {/* <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{flex: 1, width: null, height: null}}> */}
          {/* <Header
            // isHomePage
            // hasHamburger
            // hasSearch
            navigation={this.props.navigation}
            noBackground
            noTitle
            // title={AppConfig.appName}
          /> */}
          {/* <ScrollView style={{ flex: 1 }}> */}
            {/* <BoxStatus /> */}
            {/* <View style={{backgroundColor: 'blue'}}>
              <CardList
                items={featuredData}
                onItemPress={this.navigateToContentDetailScreen}
                rootURL={wcmsUrl}
                locale={locale}
                providers={providers}
              />
            </View> */}
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
            </View> */}
            {/* <Icon
              type={'MaterialCommunityIcons'}
              name={'chevron-left'}
              style={styles.icon}
            /> */}
            {/* <Icon
              type={'MaterialCommunityIcons'}
              name={'chevron-right'}
              style={styles.icon2}
            />
            <Icon onPress={() => this.props.navigation.navigate('ScreenCard')}
              type={'MaterialCommunityIcons'}
              name={'credit-card-plus'}
              style={styles.icon3}
            /> */}
            {/* <Center horizontal>
              <Text style={styles.text4}>Rayapay (Default)</Text>
            </Center> */}
            {/* <MaterialIconButtonsFooter style={styles.materialIconButtonsFooter} /> */}
          {/* </ScrollView> */}
        {/* </ImageBackground> */}
        {/* <Footer
          onSelectTab={this._onSelectTab}
          initialTab={'tab1'}
          navigation={this.props.navigation}
          /> */}
      {/* </Container> */}
        
      {/* </View> */}
      {/* <View style={{backgroundColor: 'blue', height: 50}}>
        <Text>home</Text>
      </View> */}
      </ImageBackground>
        <MaterialIconTextButtonsFooter
          navigation={this.props.navigation}
          isLoggedIn={this.props.isLoggedIn}
          style={styles.materialIconTextButtonsFooter} />
        
      </Container>
    )
  }
}

ScreenHome.propTypes = propTypes
ScreenHome.defaultProps = defaultProps

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    flex: 1,
    width: Metrics.screenWidth
  },
  materialIconTextButtonsFooter: {
    width: Metrics.screenWidth,
    height: isIphoneX ? 78 : 40,
    marginTop: 734,
    alignSelf: 'center'
  },
  // materialIconTextButtonsFooter: {
  //   width: 375,
  //   height: 78,
  //   marginTop: 734,
  //   alignSelf: "center"
  // },
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
  statusBar: {},
  ButtonVioletSignUp: {
    width: 350,
    height: 59,
    backgroundColor: '#eb1c24',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 24
  }
})
