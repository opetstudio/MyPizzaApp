import { call, put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../../Redux/SessionRedux'
import AddcardActions from './redux'
import { is, path } from 'ramda'

// process UPDAATE actions
export function * addcardFormSubmit (api, action) {
  console.log('[addcardFormSubmit] action=', action)
  const { data } = action
  const response = yield call(api.addcardFormSubmit, data)
  console.log('response=', response)
  let addcardFormSubmitMSG = {ir: false, rc: path(['data', 'responseCode'], response), rm: path(['data', 'responseMessage'], response), rd: path(['data', 'responseDescription'], response)}
  if (!response.ok) {
    addcardFormSubmitMSG = {ir: false, rc: '99', rm: 'FAILED_SYSTEM', rd: response.problem}
  }
  yield put(AddcardActions.addcardPatch({addcardFormSubmitMSG}))
}
