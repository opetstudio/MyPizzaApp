import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, WebView, ScrollView, Platform } from 'react-native'
import styles from './Styles/DetailContentDeckSwiperStyle'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { Metrics } from '../Themes'
import HeaderMenu from '../Components/HeaderMenu'
import FabShare from '../Containers/FabShare'

import AppConfig from '../Config/AppConfig'
import DetailTabs from './DetailTabs'
import DetailContent from '../Containers/DetailContent'

export default class DetailContentDeckSwiper extends Component {
  // // Prop type warnings
  static propTypes = {
    allData: PropTypes.array.isRequired,
    // someSetting: PropTypes.bool.isRequired,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   showComments: () => {}
  // }
  constructor (props) {
    super(props)
    this.state = {
    }
    this._renderRow = this._renderRow.bind(this)
  }
  _renderRow (v) {
    const {title, isi_html: isiHtml, tanggal, contributorSpace: contributorS, _id: contentId} = v
    const contributorSpace = contributorS || AppConfig.contributorSpace
    // const formatedDate = moment(new Date(tanggal)).format('dddd DD-MMM YYYY')
    // const html = `<h3>${formatedDate}</h3><h2>${title}</h2> ${isiHtml}`
    // const htmlContent = `<h3>${formatedDate}</h3><div>${isiHtml}</div>${AppConfig.getContributorSpace(contributorSpace || AppConfig.contributorSpace)}`
    // const htmlContent = `<h3>${formatedDate}</h3><h2>${title}</h2><div>${isiHtml}</div>${AppConfig.getContributorSpace(contributorSpace || AppConfig.contributorSpace)}`
    // if (Platform.OS === 'ios') {
    return (
      <View style={styles.slide} key={v._id}>
        <DetailContent
          title={title}
          date={tanggal}
          htmlContent={isiHtml}
          contributorSpace={contributorSpace}
          contentId={contentId}
          navigation={this.props.navigation}
          contentType={this.props.contentType}
        />
        {/* <DetailTabs
          screenProps={{
            title,
            date: tanggal,
            htmlContent: isiHtml,
            contributorSpace
          }}
        /> */}
        {/* <WebView source={{ html }} scalesPageToFit={Platform.OS === 'android'} />
        <FabShare /> */}
      </View>
    )
    // }
    // return (
    //   // <Text>{html}</Text>
    //   <WebView source={{ html }} scrollEnabled />
    // )
  }
  render () {
    // const v = this.props.allData[1]
    // const {title, isi_html: isiHtml, tanggal} = v
    // const formatedDate = moment(new Date(tanggal)).format('dddd DD-MMM YYYY')
    // const html = `<h3>${formatedDate}</h3><h2>${title}</h2> ${isiHtml}`
    // const headerH = this.props.headerHeight
    // if (Platform.OS === 'android') {
    //   return (<View style={{flex: 1}}>
    //     {/* <WebView style={{ flex: 1 }} source={{ html }} /> */}
    //     {this._renderRow(this.props.allData[0])}
    //   </View>)
    //   // return (
    //   //   <Swiper style={styles.wrapper} showsButtons height={Metrics.screenHeight - Metrics.navBarHeight}>
    //   //     {this.props.allData.map(v => this._renderRow(v))}
    //   //   </Swiper>)
    // }
    return (
      <View style={{ flex: 1 }}>
        <Swiper style={styles.wrapper} showsButtons>
          {this.props.allData.map(v => this._renderRow(v))}
        </Swiper>
        {/* <AdMobBanner
          adSize='fullBanner'
          adUnitID={AppConfig.bannerAdUnitID}
          testDeviceID={AdMobBanner.simulatorId}
          onAdFailedToLoad={this._bannerError}
        /> */}
      </View>
    )
  }
}
