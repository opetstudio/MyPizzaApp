import React, { Component } from 'react'
import { View } from 'react-native'
import _ from 'lodash'
// import {
//   Container,
//   Content,
//   List,
//   ListItem,
//   Left,
//   Thumbnail,
//   Body,
//   Right
// } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import HeaderMenu from '../../Components/HeaderMenu'
import PaginationList from '../../Components/PaginationList'
import AdsBanner from '../../Components/AdsBanner'
import CommentInput from './CommentInput'
import CommentRow from './CommentRow'
// Styles
// import styles from './Styles'
// import {Images} from '../../Themes'
import CommentAction, {CommentSelectors} from '../../Redux/CommentRedux'
// import UserAction, {UserSelectors} from '../../Redux/UserRedux'

class DetailArticleCommentScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      allDataArr: []
    }
    this._handleRefresh = this._handleRefresh.bind(this)
  }
  componentWillMount () {
    this.state.allDataArr = _.orderBy(this.props.allDataArr, ['tanggal'], ['desc'])
    this.props.commentRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  componentWillReceiveProps (nextProps) {
    // const allUserIdArr = nextProps.allUserIdArr

    // this.props.userRequest({  })
    this.setState({
      allDataArr: _.orderBy(this.props.allDataArr, ['createdon'], ['desc'])
    })
  }
  _handleRefresh () {
    // this.setState({
    //   isLoading: true
    // })
    // setTimeout(() => { this.setState({ isLoading: false }) }, 2000)

    this.props.commentRequest({ newerModifiedon: this.props.maxModifiedon })
  }
  _renderListRow (item) {
    return <CommentRow item={item} />
  }
  render () {
    const {contentId, contentType} = this.props.navigation.state.params
    return (
      <View style={{flex: 1}}>
        <HeaderMenu
          hasBack
          hasSearch
          navigation={this.props.navigation}
          title={'Comments'}
        />
        <CommentInput
          contentId={contentId}
          contentType={contentType}
        />
        <PaginationList
          data={this.props.allDataArr}
          firstText={'createdby'}
          secondText={'contentComment'}
          rightText={'createdon'}
          avatar={'img'}
          itemOnPress={(item) => {
            // alert(item.title)
            // this.props.navigation.navigate('DetailScreen', {title: 'Renungan Pagi', item})
          }}
          handleRefresh={this._handleRefresh}
          isLoading={this.props.isFetching}
          renderRow={this._renderListRow}
        />
        <AdsBanner />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {contentId} = ownProps.navigation.state.params
  return {
    allDataArr: CommentSelectors.getAllDataArr(state.comment, contentId),
    isFetching: CommentSelectors.getFetching(state.comment),
    maxModifiedon: CommentSelectors.getMaxModifiedon(state.comment)
    // allUserIdArr: UserSelectors.getAllIds(state.user)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentRequest: (query) => dispatch(CommentAction.commentRequest(query))
    // userRequest: (query) => dispatch(UserAction.userRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticleCommentScreen)
