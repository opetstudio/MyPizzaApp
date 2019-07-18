import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import {TabNavigator} from 'react-navigation'
import styles, {tabNavigationStyles} from './Styles/DetailTabsStyle'

import I18n from '../I18n'
import DetailArticleScreen from '../Containers/DetailArticleScreen'
import DetailArticleCommentScreen from '../Containers/Comment/DetailArticleCommentScreen'

const textMessage = I18n.t

const tabList = [
  {
    name: 'tab-content',
    screen: DetailArticleScreen,
    navigationOptions: {
      tabBarLabel: () => textMessage('tab-content')
    }
  },
  {
    name: 'tab-comments',
    screen: DetailArticleCommentScreen,
    navigationOptions: {
      tabBarLabel: () => textMessage('tab-comments')
    }
  }
]

const generateTabs = () => {
  var tabs = {}
  tabList.map(tab => {
    const navigationOptions = tab.navigationOptions || null
    tabs[tab.name] = {
      screen: tab.screen,
      navigationOptions
    }
  })
  return tabs
}

const DetailTabs = TabNavigator(generateTabs(), {
  lazy: true,
  ...TabNavigator.Presets.AndroidTopTabs,
  swipeEnabled: false,
  tabBarOptions: {
    upperCaseLabel: false,
    pressColor: 'rgba(0,0,0,0)',
    pressOpacity: 0,
    ...tabNavigationStyles
  },
  tabBarPosition: 'top'
})

export default DetailTabs
