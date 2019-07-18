import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WebView, View, Platform } from 'react-native'
import {
  Button,
  Text
} from 'native-base'
import moment from 'moment'
import styles from './Styles/DetailContentStyle'

import AppConfig from '../Config/AppConfig'
import FabShare from '../Containers/FabShare'
import AdsBanner from './AdsBanner'
import {Colors} from '../Themes'

export default class DetailContent extends Component {
  // // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired,
    htmlContent: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    contributorSpace: PropTypes.string,
    showComments: PropTypes.func,
    contentId: PropTypes.string.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render () {
    // const { data: { title, tanggal, isi_html }, even } = this.props
    const {title, htmlContent, date, contributorSpace, showComments, contentId, contentType} = this.props
    const formatedDate = moment(new Date(date)).format('dddd DD-MMM YYYY')

    const html = `<h3>${formatedDate}</h3><h2>${title}</h2><div>${htmlContent}</div>${AppConfig.getContributorSpace(contributorSpace)}`
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            style={{ flex: 1 }}
            source={{ html }}
            scalesPageToFit={Platform.OS === 'android'}
          />
          <View style={{alignSelf: 'center', backgroundColor: 'transparent', position: 'absolute', bottom: 5}}>
            <Button
              onPress={() => showComments(contentId, contentType)}
              style={{ backgroundColor: Colors.colorSecondary10 }}
            >
              <Text>Comments</Text>
            </Button>
          </View>
        </View>
        <FabShare />
        <AdsBanner />
      </View>
    )
  }
}
