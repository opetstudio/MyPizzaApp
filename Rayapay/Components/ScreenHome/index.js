import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Text, StatusBar, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Center } from '@builderx/utils'
import Svg, { Ellipse } from 'react-native-svg'
import _ from 'lodash'
import {
  Container
} from 'native-base'
import MaterialIconButtonsFooter from '../symbols/MaterialIconButtonsFooter'
import Footer from '../../Containers/Footer'
import CardList from '../CardList'
import Icon from '@builderx/icons'
import { Images, Metrics } from '../../Themes'
import Header from '../Header'
import AppConfig from '../../Config/AppConfig'
import BoxStatus from '../../Containers/ScreenHome/BoxStatus'

import MaterialIconTextButtonsFooter from '../MaterialIconTextButtonsFooter'
import {MaterialCardWithContentAndActionButtons} from '../ProfileComponent'


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
    const {
      featuredData,
      wcmsUrl,
      locale,
      providers
    } = this.props
    return (
      <Container> 
      <View style={{backgroundColor: 'yellow', flex: 1}}>
        <MaterialCardWithContentAndActionButtons />
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
            {/* <CardList
              items={featuredData}
              onItemPress={this.navigateToContentDetailScreen}
              rootURL={wcmsUrl}
              locale={locale}
              providers={providers}
            /> */}
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
      <View style={{backgroundColor: 'blue', height: 50}}>
        <Text>home</Text>
      </View>
      </View>
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
  materialIconTextButtonsFooter: {
    width: 375,
    height: 78,
    marginTop: 734,
    alignSelf: "center"
  },
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
