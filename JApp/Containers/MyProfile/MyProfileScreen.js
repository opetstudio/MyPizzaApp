import React from 'react'
import { connect } from 'react-redux'
import {path} from 'ramda'
import MyProfile from '../../Components/MyProfile'

import {SessionSelectors} from '../../Redux/SessionRedux'

const renderProfile = (props) => {
  const photoURL = path(['photoURL'], props.currentUser)
  const displayName = path(['displayName'], props.currentUser)
  return (
    <MyProfile
      photoURL={photoURL}
      displayName={displayName}
      navigation={props.navigation}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: SessionSelectors.getCurrentUser(state.session)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(renderProfile)
