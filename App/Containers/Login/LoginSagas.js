import { put, select, call } from 'redux-saga/effects'
import LoginActions, { LoginSelectors } from './LoginRedux'
import { is } from 'ramda'

// process UPDAATE actions
export function * loginRequest (api, action) {
  console.log('[LoginSagas] loginRequest action=', action)
  const { data } = action
  const response = yield call(api.loginRequest, data)
  console.log('[LoginSagas] loginRequest response=', response)
  yield put(LoginActions.loginRequestDone(data))
}
