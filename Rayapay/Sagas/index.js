import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { WebsocketTypes } from '../Redux/WebsocketRedux'
// begin Ignite-Entity-Login
import { LoginTypes } from '../Containers/Login/redux'
// end Ignite-Entity-Login

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { websocketSetup } from './WebsocketSagas'
// begin Ignite-Entity-Login
import {
  loginDoLogin, loginCheckStatus,
  postLogin,
  getLogins,
  getLogin,
  updateLogin,
  removeLogin
} from '../Containers/Login/sagas'
// end Ignite-Entity-Login

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
// const hostBackend = AppConfig.env === 'development' ? 'http://localhost:8762' : 'https://api.erevnaraya.com'
const apiDashboard = API.create(AppConfig.backendHost + '/dashboard-api/')
const apiDashboardPy = API.create(AppConfig.backendHost + '/dashboard-api/py/')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WebsocketTypes.WEBSOCKET_SETUP, websocketSetup),
    takeLatest(LoginTypes.LOGIN_CREATE, postLogin, apiDashboard),
    takeLatest(LoginTypes.LOGIN_REMOVE, removeLogin, apiDashboard),

    takeLatest(LoginTypes.LOGIN_DO_LOGIN, loginDoLogin, apiDashboard),
    takeLatest(LoginTypes.LOGIN_CHECK_STATUS, loginCheckStatus, apiDashboard)
  ])
}
