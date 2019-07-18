import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { SessionTypes } from '../Redux/SessionRedux'
import { LoginTypes } from '../Containers/ScreenLogin/redux'
import { WebsocketTypes } from '../Redux/WebsocketRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { sessionUpdate } from './SessionSagas'
import { loginRequest } from '../Containers/ScreenLogin/sagas'
import { websocketSetup } from './WebsocketSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WebsocketTypes.WEBSOCKET_SETUP, websocketSetup),

    takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest, API.create('http://202.158.24.186:8090/api-v1/processor-user')),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
