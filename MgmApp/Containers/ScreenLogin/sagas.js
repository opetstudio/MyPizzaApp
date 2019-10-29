import { put, select, call } from 'redux-saga/effects'
import LoginActions, { LoginSelectors } from './redux'
import SessionActions from '../../Redux/SessionRedux'
import { is } from 'ramda'

// process UPDAATE actions
export function * loginRequest (api, action) {
  console.log('[LoginSagas] loginRequest action=', action)
  const { data, socketClient } = action
  const response = yield call(api.loginRequest, data, {}, socketClient)
  console.log('[LoginSagas] loginRequest response=', response)
  yield put(LoginActions.loginRequestDone(data))
  yield put(SessionActions.sessionSuccess({currentUser: {}, loginWith: 'bayar2', sessionToken: 'abc'}))
}
