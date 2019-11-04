import { put, select, call } from 'redux-saga/effects'
import ResendPassActions, { resendPassSelectors } from './redux'
// import SessionActions from '../../Redux/SessionRedux'
import { is } from 'ramda'

// process UPDAATE actions
export function * resendPassRequest (api, action) {
  console.log('[resendPassSagas] action=', action)
  const { data } = action
  const response = yield call(api.resendPassRequest, data)
  console.log('[resendPassSagas] response=', response)
  yield put(ResendPassActions.resendPassRequestDone(data))
//   yield put(SessionActions.sessionSuccess({currentUser: {}, resendPassWith: 'bayar2', sessionToken: 'abc'}))
}
