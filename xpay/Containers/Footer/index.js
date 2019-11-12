import { connect } from 'react-redux'
import Footer from '../../Components/Footer'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  return {
    sessionToken: SessionSelectors.sessionToken(state.session),
    isLoggedIn: SessionSelectors.isLoggedIn(state.session)
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
)(Footer)
