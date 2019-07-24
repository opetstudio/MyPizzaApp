import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content
} from 'native-base'
import { path } from 'ramda'
import HeaderMenu from '../Components/HeaderMenu'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import DetailContentDeckSwiper from '../Components/DetailContentDeckSwiper'

// Styles
import styles from './Styles/DetailContentDeckSwiperScreenStyle'

class DetailContentDeckSwiperScreen extends Component {
  showComments (contentId) {

  }
  render () {
    const { navigation } = this.props
    const params = path(['state', 'params'], navigation) || {}
    const allData = params['alldata'] || []
    const headerTitle = params['title']
    const contentType = params['contentType']
    return (
      <View style={{ flex: 1 }}>
        <HeaderMenu
          ref='myHeader'
          hasBack
          navigation={this.props.navigation}
          title={headerTitle || 'Detail'}
        />
        {/* <Content> */}
        <DetailContentDeckSwiper
          allData={allData}
          showComments={this.showComments}
          headerHeight={this.refs.myHeader}
          navigation={this.props.navigation}
          contentType={contentType}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailContentDeckSwiperScreen)
