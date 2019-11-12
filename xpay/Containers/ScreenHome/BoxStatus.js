import { connect } from 'react-redux'
import BoxStatus from '../../Components/ScreenHome/BoxStatus'
// import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  return {
    // isLoggedIn: SessionSelectors.isLoggedIn(state.session)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // sessionLogout: (data) => dispatch(SessionAction.sessionLogout(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxStatus)
