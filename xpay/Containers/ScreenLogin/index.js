import { connect } from 'react-redux'
import LoginScreen from '../../Components/ScreenLogin'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  // const foo = params.get('foo'); // bar
  return {
    isLoggedIn: SessionSelectors.isLoggedIn(state.session),
    sessionToken: SessionSelectors.sessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: data => dispatch(SessionAction.sessionLogin(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
