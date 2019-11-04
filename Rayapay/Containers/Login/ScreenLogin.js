import React from 'react'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from './redux'
import LoginPageComponent from '../../Components/ScreenLogin'

const TheComponent = (props) => <LoginPageComponent {...props} />
const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: LoginSelectors.isLoggedIn(state.login),
  isRequesting: LoginSelectors.isRequesting(state.login),
  sessionToken: LoginSelectors.sessionToken(state.login),
  formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
  responseMessage: LoginSelectors.responseMessage(state.login),
  responseDescription: LoginSelectors.responseDescription(state.login),
  responseCode: LoginSelectors.responseCode(state.login)
})

const mapDispatchToProps = dispatch => ({
  loginDoLogin: data => dispatch(LoginActions.loginDoLogin(data)),
  loginPatch: data => dispatch(LoginActions.loginPatch(data)),
  logout: data => dispatch(LoginActions.logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TheComponent)
