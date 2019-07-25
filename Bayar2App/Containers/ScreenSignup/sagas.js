import { put, select, call } from 'redux-saga/effects'
import SignupActions, { SignupSelectors } from './redux'
// import SessionActions from '../../Redux/SessionRedux'
import { is } from 'ramda'

// process UPDAATE actions
export function * signupRequest (api, action) {
  console.log('[signupSagas] signupRequest action=', action)
  const { data } = action
  const response = yield call(api.signupRequest, data)
  console.log('[signupSagas] signupRequest response=', response)
  yield put(SignupActions.signupRequestDone(data))
//   yield put(SessionActions.sessionSuccess({currentUser: {}, signupWith: 'bayar2', sessionToken: 'abc'}))
}
