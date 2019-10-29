import { connect } from 'react-redux'
import LoginScreen from '../../Components/ScreenLogin'
import LoginScreenAction, {LoginSelectors} from '../../Containers/ScreenLogin/redux'
import {SessionSelectors} from '../../Redux/SessionRedux'
import {WebsocketSelectors} from '../../Redux/WebsocketRedux'

const mapStateToProps = (state, ownProps) => {
  // console.log('state========>', state.websocket)
  // const foo = params.get('foo'); // bar
  return {
    sessionToken: SessionSelectors.getSessionToken(state.session),
    socketClientStatus: WebsocketSelectors.getConnectionSuccess(state.websocket),
    socketClient: WebsocketSelectors.getSocketClient(state.websocket)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    // loginRequest: data => {
    //     alert('cek')
    // }
    loginRequest: (data, socketClient) => dispatch(LoginScreenAction.loginRequest(data, socketClient))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
