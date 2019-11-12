import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import _ from 'lodash'
import MaterialIconTextButtonsFooter from './components/MaterialIconTextButtonsFooter'
import {Metrics} from '../../Themes'

export default class Index extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.isLoggedIn !== null && !_.isEqual(prevProps.isLoggedIn, this.props.isLoggedIn)) {
      if (!this.props.isLoggedIn) this.props.navigation.navigate('unloggedinNavigator')
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <MaterialIconTextButtonsFooter
          style={styles.materialIconTextButtonsFooter}
          sessionLogout={this.props.sessionLogout}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  materialIconTextButtonsFooter: {}
})
