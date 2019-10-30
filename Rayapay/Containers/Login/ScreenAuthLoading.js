import React from 'react'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from './redux'
import {isLoggedIn} from '../../Lib/Utils'
import LoginPageComponent from '../../Components/ScreenAuthLoading'

class TheComponent extends React.PureComponent {
  render () {
    console.log('render ', this.props)
    // if (isLoggedIn(this.props.isLoggedIn) !== true)
    return (<LoginPageComponent {...this.props} />)
    // this.props.navigation.navigate('loggedinNavigator')
    // return null
  }
}
const mapStateToProps = (state, ownProps) => {
    // const isLoggedIn = LoginSelectors.isLoggedIn(state.login)
    // console.log('mapStateToProps isLoggedIn=', isLoggedIn)
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login),
    sessionToken: LoginSelectors.sessionToken(state.login),
    formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
    responseMessage: LoginSelectors.responseMessage(state.login),
    responseDescription: LoginSelectors.responseDescription(state.login),
    responseCode: LoginSelectors.responseCode(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginDoLogin: data => dispatch(LoginActions.loginDoLogin(data)),
    loginPatch: data => dispatch(LoginActions.loginPatch(data)),
    logout: data => dispatch(LoginActions.logout())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TheComponent)
