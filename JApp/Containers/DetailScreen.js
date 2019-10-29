import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content
} from 'native-base'
import { TabNavigator } from 'react-navigation'
import { path } from 'ramda'
import HeaderMenu from '../Components/HeaderMenu'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import DetailTabs from '../Components/DetailTabs'
import DetailContent from './DetailContent'
// Styles
import styles from './Styles/DetailScreenStyle'
import AppConfig from '../Config/AppConfig'

// const DetailTabs = TabNavigator(generateTabs(), {
//   lazy: true,
//   ...TabNavigator.Presets.AndroidTopTabs,
//   tabBarOptions: {
//     upperCaseLabel: false,
//     pressColor: 'rgba(0,0,0,0)',
//     pressOpacity: 0,
//     ...tabNavigationStyles
//   },
//   tabBarPosition: 'top'
// })

class DetailScreen extends Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  render () {
    const { navigation } = this.props
    // navigation.setParams({ title: 'opeeet' })

    const params = path(['state', 'params'], navigation) || {}
    const item = path(['item'], params) || {}
    const headerTitle = path(['title'], params)
    const contentType = path(['contentType'], params)
    const title = item['title'] || 'NO-TITLE'
    const contentId = item['_id'] || Date.now()
    const tanggal = item['tanggal'] || 'NO-TITLE'
    const htmlContent = item['isi_html'] || 'NO-TITLE'
    const contributorSpace = item['contributorSpace'] || AppConfig.contributorSpace

    return (
      <View style={{ flex: 1 }}>
        <HeaderMenu
          hasBack
          navigation={this.props.navigation}
          title={headerTitle || 'Detail'}
        />
        {/* <DetailTabs
          screenProps={{
            title,
            date: tanggal,
            htmlContent,
            contributorSpace
          }}
        /> */}
        <DetailContent
          title={title}
          date={tanggal}
          htmlContent={htmlContent}
          contributorSpace={contributorSpace}
          contentId={contentId}
          contentType={contentType}
          navigation={navigation}
        />
        {/* <Content> */}
        {/* <DetailContent
          title={title}
          date={tanggal}
          htmlContent={htmlContent}
          contributorSpace={contributorSpace}
        /> */}
        {/* </Content> */}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
