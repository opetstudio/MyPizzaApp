import React from 'react'
import { connect } from 'react-redux'
import {LoginSelectors} from './redux'
import LoginPageComponent from '../../Components/ScreenAuthLoading'

const mapStateToProps = (state, ownProps) => ({isLoggedIn: LoginSelectors.isLoggedIn(state.login)})
const mapDispatchToProps = dispatch => ({})
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )((props) => <LoginPageComponent {...props} />)
