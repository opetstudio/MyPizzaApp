import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Container,
  Content,
  Button
} from 'native-base'
import HeaderMenu from '../../Components/HeaderMenu'
import PaginationList from '../../Components/PaginationList'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import RenpagiActions, {RenpagiSelectors} from '../../Redux/RenpagiRedux'
import FabCreate from '../FabCreate'
import AdsBanner from '../../Components/AdsBanner'
import RenpagiRow from './RenpagiRow'

// Styles
import styles from './styles'

const labelScreen = 'Renungan'

class RenunganpagiScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allDataArr: []
    }
    this._handleRefresh = this._handleRefresh.bind(this)
  }
  componentWillMount () {
    // if (this.props.columnOrderBy && this.props.orientationOrderBy) {
    //   paginatedItems = _.orderBy(paginatedItems, this.props.columnOrderBy, this.props.orientationOrderBy)
    //   // paginatedItems = _.orderBy(paginatedItems, ['tanggal'], ['desc'])
    // }
    this.state.allDataArr = _.orderBy(this.props.allDataArr, ['tanggal'], ['desc'])
    this.props.renpagiRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      allDataArr: _.orderBy(nextProps.allDataArr, ['tanggal'], ['desc'])
    })
  }
  _handleRefresh () {
    this.props.renpagiRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <HeaderMenu
          hasHamburger
          hasSearch
          navigation={this.props.navigation}
          title={labelScreen}
        />
        {/* <Content> */}
        <PaginationList
          data={this.state.allDataArr}
          firstText={'title'}
          secondText={''}
          rightText={'tanggal'}
          itemOnPress={(item) => {
            // alert(item.title)
            // this.props.navigation.navigate('DetailScreen', {title: 'Renungan Pagi', item, contentType: 'rp'})
          }}
          handleRefresh={this._handleRefresh}
          isLoading={this.props.fetching}
          numberOfLines={1}
          renderRow={(item) => <RenpagiRow item={item} onPress={(item) => this.props.navigation.navigate('DetailScreen', {title: 'Renungan Pagi', item, contentType: 'rp'})} />}
          />
        <FabCreate />
        <AdsBanner />
        {/* </Content> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allDataArr: RenpagiSelectors.getAllDataArr(state.renpagi),
    fetching: RenpagiSelectors.getFetching(state.renpagi),
    maxModifiedon: RenpagiSelectors.getMaxModifiedon(state.renpagi)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renpagiRequest: (query) => dispatch(RenpagiActions.renpagiRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenunganpagiScreen)
