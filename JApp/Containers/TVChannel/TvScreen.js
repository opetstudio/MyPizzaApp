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

import TvActions, {TvSelectors} from '../../Redux/TvRedux'
import FabCreate from '../FabCreate'
import AdsBanner from '../../Components/AdsBanner'
import TvRow from './TvRow'

// Styles
import styles from './styles'

const labelScreen = 'TV Channel'

class TvScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allDataArr: [],
      fetching: false
    }
    this._handleRefresh = this._handleRefresh.bind(this)
  }
  componentWillMount () {
    // if (this.props.columnOrderBy && this.props.orientationOrderBy) {
    //   paginatedItems = _.orderBy(paginatedItems, this.props.columnOrderBy, this.props.orientationOrderBy)
    //   // paginatedItems = _.orderBy(paginatedItems, ['tanggal'], ['desc'])
    // }
    this.state.allDataArr = _.orderBy(this.props.allDataArr, ['title'], ['asc'])
    this.props.tvRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  componentWillReceiveProps (nextProps) {
    __DEV__ && console.log('componentWillReceiveProps ==> props:', nextProps)
    this.setState({
      allDataArr: _.orderBy(nextProps.allDataArr, ['title'], ['asc']),
      fetching: nextProps.fetching
    })
  }
  _handleRefresh () {
    this.props.tvRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  render () {
    __DEV__ && console.log('TvScreen render ==> props:', this.props)
    __DEV__ && console.log('TvScreen render ==> state:', this.state)
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
          // firstText={'title'}
          // secondText={''}
          // rightText={'tanggal'}
          itemOnPress={(item) => {
            // alert(item.title)
            // this.props.navigation.navigate('DetailScreen', {title: 'Renungan Pagi', item, contentType: 'rp'})
          }}
          handleRefresh={this._handleRefresh}
          isLoading={this.state.fetching}
          numberOfLines={1}
          renderRow={(item) => <TvRow item={item} onPress={(item) => this.props.navigation.navigate('ContentDetails', {
            content: item,
            contentType: 'tv'
            // cover: {
            //   banner: {
            //     'mdpi': item.cover,
            //     'hdpi': item.cover,
            //     'xhdpi': item.cover,
            //     'xxhdpi': item.cover
            //   }
            // },
            // tvId: item._id,
            // url: item.url,
            // subtitle: item.subtitle,
            // content: {id: item._id, type: 'mv'},
            // drmAssetID: ''
          })} />}
          // renderRow={(item) => <TvRow item={item} onPress={(item) => this.props.navigation.navigate('VideoPlayerFullScreen', {tvId: item._id, url: item.url, subtitle: item.subtitle, content: {}, drmAssetID: ''})} />}
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
    allDataArr: TvSelectors.getAllDataArr(state.tv),
    fetching: TvSelectors.getFetching(state.tv),
    maxModifiedon: TvSelectors.getMaxModifiedon(state.tv)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tvRequest: (query) => dispatch(TvActions.tvRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TvScreen)
