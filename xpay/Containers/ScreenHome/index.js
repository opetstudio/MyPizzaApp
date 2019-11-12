import { connect } from 'react-redux'
import ScreenHome from '../../Components/ScreenHome'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: SessionSelectors.isLoggedIn(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sessionLogout: (data) => dispatch(SessionAction.sessionLogout(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenHome)
