import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl, Platform } from 'react-native'
import {
  ListItem, Body, Text, Right
} from 'native-base'
import moment from 'moment'
import _ from 'lodash'
import styles from './Styles/PaginationListStyle'

import StyledRow1 from './StyledRow1'

export default class PaginationList extends Component {
  // // Prop type warnings
  static propTypes = {
    numberOfLines: PropTypes.number
    // someSetting: PropTypes.bool.isRequired,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)
    this.state = {}
    this._renderRow = this._renderRow.bind(this)
    this._renderList = this._renderList.bind(this)
    this._setDataSource = this._setDataSource.bind(this)
    this._getPaginatedItems = this._getPaginatedItems.bind(this)
    this._handleRefresh = this._handleRefresh.bind(this)
    this._nextOffset = this._nextOffset.bind(this)
  }
  componentWillMount () {
    __DEV__ && console.log('PaginationList.componentWillReceiveProps props', this.props)
    this.state.page = 1
    this.state.seed = 1
    this.state.per_page = 15
    this.state.allDataArr = this.props.data || []
    this.state.currentListAllArr = []
    // this.state.isLoading = this.props.isLoading
    this.state.rerenderToggle = false

    this._setDataSource()
    // set currentListAllArr
    this._getPaginatedItems()
    this.setState({
      isLoading: this.props.isLoading
    })
  }
  componentWillReceiveProps (nextProps) {
    __DEV__ && console.log('PaginationList.componentWillReceiveProps props', nextProps)
    this.state.allDataArr = nextProps.data
    // this.state.isLoading = nextProps.isLoading
    this._setDataSource()
    // set currentListAllArr
    this._getPaginatedItems()
    this.setState({
      isLoading: nextProps.isLoading
    })
  }
  _setDataSource () {
    this.state.listAllMessages = this.state.allDataArr
    this.state.totalItems = this.state.listAllMessages.length
  }
  _getPaginatedItems () {
    const offset = (this.state.page - 1) * this.state.per_page
    let paginatedItems = _.slice(this.state.listAllMessages, 0, offset + this.state.per_page)
    this.setState({
      currentListAllArr: paginatedItems,
    })
  }
  _nextOffset () {
    if (this.state.totalItems / this.state.per_page < this.state.page) return false
    this.state.page += 1
    this._getPaginatedItems()
    return true
  }
  _renderRow (p) {
    const { item } = p
    if (this.props.renderRow) return this.props.renderRow(item)

    const date = moment(new Date(item[this.props.rightText])).format('DD-MM/YY')
    const avatar = item[this.props.avatar]
    return (
      <StyledRow1
        firstText={item[this.props.firstText]}
        secondText={item[this.props.secondText]}
        rightText={date}
        itemOnPress={() => this.props.itemOnPress(item)}
        avatar={avatar}
        numberOfLines={this.props.numberOfLines}
      />
    )
  }
  _handleRefresh () {
    this.props.handleRefresh()
  }
  _bannerError (p1, p2) {
  }
  _renderList () {
    // if (this.state.isLoading) return <View><Text>loading</Text></View>
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF'
        }}
      >
        <FlatList
          data={this.state.currentListAllArr || []}
          renderItem={this._renderRow}
          keyExtractor={(item = {}) => item._id}
          initialNumToRender={3}
          onMomentumScrollEnd={() => {
            this._nextOffset()
          }}
          // refreshControl={
          //   <RefreshControl
          //    refreshing={this.state.isLoading}
          //    onRefresh={this._handleRefresh}
          //   />
          // }
          refreshing={this.props.isLoading}
          onRefresh={this._handleRefresh}
        />
      </View>
    )
  }
  render () {
    __DEV__ && console.log('PaginationList.render props', this.props)
    return this._renderList()
  }
}
