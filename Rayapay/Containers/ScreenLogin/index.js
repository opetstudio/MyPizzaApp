import { connect } from 'react-redux'
import LoginScreen from '../../Components/ScreenLogin'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  console.log('state login========>', state.session)
  // const foo = params.get('foo'); // bar
  return {
    isLoggedIn: SessionSelectors.isLoggedIn(state.session),
    sessionToken: SessionSelectors.sessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    // loginRequest: data => {
    //     alert('cek')
    // }
    loginRequest: data => dispatch(SessionAction.sessionLogin(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)


