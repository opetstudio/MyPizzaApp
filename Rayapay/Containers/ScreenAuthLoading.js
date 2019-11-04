import React from 'react'
import { connect } from 'react-redux'
import SessionAction, {SessionSelectors} from '../Redux/SessionRedux'
import ScreenAuthLoading from '../Components/ScreenAuthLoading'

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: SessionSelectors.isLoggedIn(state.session),
  sessionToken: SessionSelectors.sessionToken(state.session)
})
const mapDispatchToProps = dispatch => ({
  sessionPatch: data => dispatch(SessionAction.sessionPatch(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )((props) => <ScreenAuthLoading {...props} />)
