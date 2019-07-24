import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import DetailContent from '../Components/DetailContent'

// Styles
import styles from './Styles/DetailArticleScreenStyle'

class DetailArticleScreen extends Component {
  render () {
    const { title, htmlContent, date, contributorSpace } = this.props.screenProps

    return (
      <DetailContent
        title={title}
        date={date}
        htmlContent={htmlContent}
        contributorSpace={contributorSpace}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticleScreen)
