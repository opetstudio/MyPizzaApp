import React, { Component } from 'react'
import { createStackNavigator as StackNavigator, createDrawerNavigator as DrawerNavigator } from 'react-navigation'
// import DrawerFooter from '../Containers/DrawerFooter'
// import DrawerHeader from '../Containers/DrawerHeader'
import LoginMethodScreen from '../Containers/Auth/LoginMethodScreen'
import DetailContentDeckSwiperScreen from '../Containers/DetailContentDeckSwiperScreen'
import DetailScreen from '../Containers/DetailScreen'
import HomeScreen from '../Containers/HomeScreen'
import AboutAppScreen from '../Containers/AboutAppScreen'
import BookScreen from '../Containers/Book/BookScreen'
import RenunganpagiScreen from '../Containers/Renpagi/RenunganpagiScreen'
import SekolahsabatScreen from '../Containers/Ssabat/SekolahsabatScreen'
import VideoPlayerFullScreen from '../Containers/VideoPlayerFullScreen'
import TvPlayerFullScreen from '../Containers/VideoPlayerFullScreen/tv'
import RadioPlayerFullScreen from '../Containers/VideoPlayerFullScreen/radio'
import PowerpointPlayerFullScreen from '../Containers/VideoPlayerFullScreen/powerpoint'
import PDFViewerFullScreen from '../Containers/PDFViewerFullScreen'
import LoadingWebView from '../Containers/VideoPlayerFullScreen/LoadingWebView'
import ContentDetails from '../Containers/ContentDetails'
import Drawer from '../Containers/Drawer'
import PresentationScreen from '../../ignite/DevScreens/PresentationScreen'
import DetailArticleCommentScreen from '../Containers/Comment/DetailArticleCommentScreen'
import SponsorScreen from '../Containers/Sponsor/SponsorScreen'
import MovieScreen from '../Containers/Movie/MovieScreen'
import TVChannelScreen from '../Containers/TVChannel/TvScreen'
import RadioChannelScreen from '../Containers/RadioChannel/RadioScreen'
import PowerpointScreen from '../Containers/Powerpoint/PowerpointScreen'
import MyProfileScreen from '../Containers/MyProfile/MyProfileScreen'
import SupportScreen from '../Containers/Support/SupportScreen'
import navigatorHelper from '../Utils/helper/navigator'
import {isIphoneX} from '../Utils/helper/platform'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const menuRoutes = {
  HomeScreen: { screen: HomeScreen, navigationOptions: { drawerLabel: 'Home' } },
  BookScreen: { screen: BookScreen },
  RenunganpagiScreen: { screen: RenunganpagiScreen, navigationOptions: { drawerLabel: 'Renungan Pagi' } },
  SekolahsabatScreen: { screen: SekolahsabatScreen, navigationOptions: { drawerLabel: 'Sekolah Sabat' } },
  SponsorScreen: { screen: SponsorScreen, navigationOptions: { drawerLabel: 'Sponsors' } },
  MovieScreen: { screen: MovieScreen },
  TVChannelScreen: { screen: TVChannelScreen },
  RadioChannelScreen: { screen: RadioChannelScreen },
  PowerpointScreen: { screen: PowerpointScreen },
  SupportScreen: { screen: SupportScreen, navigationOptions: { drawerLabel: 'Support' } },
  AboutAppScreen: { screen: AboutAppScreen, navigationOptions: { drawerLabel: 'Tentang JemaatApp' } },
  MyProfileScreen: { screen: MyProfileScreen },
  PresentationScreen: { screen: (props) => <PresentationScreen screenProps={{ toggle: () => {} }} /> }
}
const PrimaryNav = DrawerNavigator(menuRoutes, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentComponent: props => <Drawer {...props} />
})

navigatorHelper.setMenuNavigationRoutes(menuRoutes)

const StackNav = StackNavigator({
  PrimaryNav: { screen: PrimaryNav },
  DetailScreen: { screen: DetailScreen },
  DetailContentDeckSwiperScreen: { screen: DetailContentDeckSwiperScreen },
  DetailArticleCommentScreen: { screen: DetailArticleCommentScreen },
  VideoPlayerFullScreen: { screen: VideoPlayerFullScreen },
  TvPlayerFullScreen: { screen: TvPlayerFullScreen },
  RadioPlayerFullScreen: { screen: RadioPlayerFullScreen },
  PowerpointPlayerFullScreen: { screen: PowerpointPlayerFullScreen },
  PDFViewerFullScreen: { screen: PDFViewerFullScreen },
  LoadingWebView: { screen: LoadingWebView },
  ContentDetails: { screen: ContentDetails },
  LoginMethodScreen: { screen: LoginMethodScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PrimaryNav',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

export default StackNav
