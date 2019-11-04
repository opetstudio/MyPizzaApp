import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { WebsocketTypes } from '../Redux/WebsocketRedux'
import { LoginTypes } from '../Containers/ScreenLogin/redux'
import { SessionTypes } from '../Redux/SessionRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { websocketSetup } from './WebsocketSagas'
import { loginRequest } from '../Containers/ScreenLogin/sagas'
import { sessionLogin, sessionLogout } from './SessionSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
// const hostBackend = AppConfig.env === 'development' ? 'http://localhost:8762' : 'https://api.erevnaraya.com'
const apiDashboard = DebugConfig.useFixtures ? FixtureAPI : API.create(AppConfig.backendHost + '/dashboard-api/')
const apiDashboardPy = DebugConfig.useFixtures ? FixtureAPI : API.create(AppConfig.backendHost + '/dashboard-api/py/')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WebsocketTypes.WEBSOCKET_SETUP, websocketSetup),
    takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest, API.create('http://202.158.24.186:8090/api-v1/processor-user')),
    takeLatest(SessionTypes.SESSION_LOGIN, sessionLogin, apiDashboard),
    takeLatest(SessionTypes.SESSION_LOGOUT, sessionLogout, apiDashboard)
  ])
}
