import { put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../Redux/SessionRedux'
import { is } from 'ramda'

// process UPDAATE actions
export function * sessionUpdate (action) {
  console.log('[SessionSagas] sessionUpdate action=', action)
  const { data } = action
  yield put(SessionActions.sessionUpdate(data))
}
