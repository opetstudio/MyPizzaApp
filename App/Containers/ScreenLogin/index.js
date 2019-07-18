import { connect } from 'react-redux'
import LoginScreen from '../../Components/ScreenLogin'
import LoginScreenAction, {LoginSelectors} from '../../Containers/ScreenLogin/redux'
import {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  console.log('state========>', state.session)
  // const foo = params.get('foo'); // bar
  return {
    sessionToken: SessionSelectors.getSessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    // loginRequest: data => {
    //     alert('cek')
    // }
    loginRequest: data => dispatch(LoginScreenAction.loginRequest(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
