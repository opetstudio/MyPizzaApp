import { connect } from 'react-redux'
import SignupScreen from '../../Components/ScreenSignup'
import SignupScreenAction, {SignupSelectors} from '../../Containers/ScreenSignup/redux'
import {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  console.log('state signup ====>', state.session)
  return {
    // sessionToken: SessionSelectors.getSessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {

    signupRequest: data => dispatch(SignupScreenAction.signupRequest(data))
  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)