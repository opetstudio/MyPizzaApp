import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MaterialIconTextButtonsFooter from './components/MaterialIconTextButtonsFooter'
import {Metrics} from '../../Themes'

export default class Index extends Component {
  render () {
    return (
      <View style={styles.container}>
        <MaterialIconTextButtonsFooter
          style={styles.materialIconTextButtonsFooter}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  materialIconTextButtonsFooter: {}
})
