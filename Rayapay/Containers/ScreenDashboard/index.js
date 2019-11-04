import { connect } from 'react-redux'
import ScreenDashboard from '../../Components/ScreenDashboard'
import LoginAction, {LoginSelectors} from '../../Containers/Login/redux'

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sessionLogout: (data) => dispatch(LoginAction.loginDoLogout(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenDashboard)
