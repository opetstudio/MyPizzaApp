import { connect } from 'react-redux'
import ForgotPassScreen from '../../Components/ScreenForgetpassword'
import ForgotPassScreenAction, {ForgotPassSelectors} from '../../Containers/ScreenForgotPassword/redux'
import {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state, ownProps) => {
  console.log('state ForgotPass ====>', state.session)
  return {
    // sessionToken: SessionSelectors.getSessionToken(state.session)
  }
}

const mapDispatchToProps = dispatch => {
  return {

    resendPassRequest: data => dispatch(ForgotPassScreenAction.ForgotPassRequest(data))
  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassScreen)