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

import MovieActions, {MovieSelectors} from '../../Redux/MovieRedux'
import FabCreate from '../FabCreate'
import AdsBanner from '../../Components/AdsBanner'
import MovieRow from './MovieRow'

// Styles
import styles from './styles'

const labelScreen = 'Inspired Movie'

class MovieScreen extends Component {
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
    this.state.allDataArr = _.orderBy(this.props.allDataArr, ['modifiedon'], ['desc'])
    this.props.movieRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  componentWillReceiveProps (nextProps) {
    __DEV__ && console.log('componentWillReceiveProps ==> props:', nextProps)
    this.setState({
      allDataArr: _.orderBy(nextProps.allDataArr, ['modifiedon'], ['desc']),
      fetching: nextProps.fetching
    })
  }
  _handleRefresh () {
    this.props.movieRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  render () {
    __DEV__ && console.log('MovieScreen render ==> props:', this.props)
    __DEV__ && console.log('MovieScreen render ==> state:', this.state)
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
          renderRow={(item) => <MovieRow item={item} onPress={(item) => this.props.navigation.navigate('ContentDetails', {
            content: item,
            contentType: 'mv'
            // cover: {
            //   banner: {
            //     'mdpi': item.cover,
            //     'hdpi': item.cover,
            //     'xhdpi': item.cover,
            //     'xxhdpi': item.cover
            //   }
            // },
            // movieId: item._id,
            // url: item.url,
            // subtitle: item.subtitle,
            // content: {id: item._id, type: 'mv'},
            // drmAssetID: ''
          })} />}
          // renderRow={(item) => <MovieRow item={item} onPress={(item) => this.props.navigation.navigate('VideoPlayerFullScreen', {movieId: item._id, url: item.url, subtitle: item.subtitle, content: {}, drmAssetID: ''})} />}
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
    allDataArr: MovieSelectors.getAllDataArr(state.movie),
    fetching: MovieSelectors.getFetching(state.movie),
    maxModifiedon: MovieSelectors.getMaxModifiedon(state.movie)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    movieRequest: (query) => dispatch(MovieActions.movieRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen)
