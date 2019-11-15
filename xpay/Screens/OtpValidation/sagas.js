import { call, put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../../Redux/SessionRedux'
import OtpvalidationActions from './redux'
import { is, path } from 'ramda'

// process UPDAATE actions
export function * otpvalidationFormSubmit (api, action) {
  console.log('[formOtpvalidationSubmit] action=', action)
  const { data } = action
  const response = yield call(api.otpvalidationFormSubmit, data)
  console.log('response=', response)
  let otpvalidationFormSubmitMSG = {ir: false, rc: path(['data', 'responseCode'], response), rm: path(['data', 'responseMessage'], response), rd: path(['data', 'responseDescription'], response)}
  if (!response.ok) {
    otpvalidationFormSubmitMSG = {ir: false, rc: '99', rm: 'FAILED_SYSTEM', rd: response.problem}
  }
  yield put(OtpvalidationActions.otpvalidationPatch({otpvalidationFormSubmitMSG}))
}
