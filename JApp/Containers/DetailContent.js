import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import {SessionSelectors} from '../Redux/SessionRedux'
import PopupActions from '../Redux/PopupRedux'

import DetailContentComponent from '../Components/DetailContent'
// Styles
import styles from './Styles/DetailContentStyle'

class DetailContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contentType: this.props.contentType,
      contentId: this.props.contentId
    }
    this.showComments = this.showComments.bind(this)
  }
  showComments (contentId, contentType) {
    if (this.props.currentUser) this.props.navigation.navigate('DetailArticleCommentScreen', { contentId, contentType })
    else {
      this.props.popupShow({
        title: 'Login',
        body: {template: 'Please login or sign up to continue.'},
        actions: [
          { name: 'Cancel', handler: this.props.popupHide },
          { name: 'Confirm',
            handler: () => {
              this.props.navigation.navigate('LoginMethodScreen', { contentId })
            }
          }
        ],
        imageSource: null,
        imageBody: null
      })
    }
  }
  render () {
    const {title, date, htmlContent, contributorSpace, contentId, contentType} = this.props
    return (
      <View style={{ flex: 1 }}>
        <DetailContentComponent
          title={title}
          date={date}
          htmlContent={htmlContent}
          contributorSpace={contributorSpace}
          showComments={this.showComments}
          contentId={contentId}
          contentType={contentType}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: SessionSelectors.getCurrentUser(state.session)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
    popupHide: (popupMessage) => dispatch(PopupActions.popupHide())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContent)
