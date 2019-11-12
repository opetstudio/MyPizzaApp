import { call, put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../Redux/SessionRedux'
import { is, path } from 'ramda'

// process UPDAATE actions
export function * sessionUpdate (action) {
  console.log('[SessionSagas] sessionUpdate action=', action)
  const { data } = action
  yield put(SessionActions.sessionUpdate(data))
}
export function * sessionLogin (api, action) {
  console.log('[SessionSagas] sessionLogin action=', action)
  const { data } = action
  const response = yield call(api.sessionLogin, data)
  console.log('response=', response)
  let sessionLoginMSG = {ir: false, rc: path(['data', 'responseCode'], response), rm: path(['data', 'responseMessage'], response), rd: path(['data', 'responseDescription'], response)}
  if (!response.ok) {
    sessionLoginMSG = {ir: false, rc: 'MBDD99', rm: 'FAILED_SYSTEM', rd: response.problem}
    return yield put(SessionActions.sessionPatch({sessionLoginMSG}))
  }
  let sessionToken = path(['data', 'sessionToken'], response)
  if (sessionLoginMSG.rc === 'MBDD00') return yield put(SessionActions.sessionLoginSuccess({sessionToken, sessionLoginMSG}))
  else return yield put(SessionActions.sessionLoginFailed({sessionToken: '', sessionLoginMSG}))
}
export function * sessionLogout (api, action) {
  console.log('[SessionSagas] sessionLogout action=', action)
  const { data } = action
  const response = yield call(api.sessionLogout, data, {})
  yield put(SessionActions.sessionLogoutSuccess({}))
}
