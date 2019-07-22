import { connect } from 'react-redux'
import ScreenHome from '../../Components/ScreenHome'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  return {
    sessionToken: SessionSelectors.getSessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sessionLogout: () => dispatch(SessionAction.sessionLogout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenHome)
