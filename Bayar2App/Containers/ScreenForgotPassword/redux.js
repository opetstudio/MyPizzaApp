import {AsyncStorage} from 'react-native'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resendPassRequest: ['data'],
  resendPassRequestDone: ['data']
})

export const resendPassTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  resendPassRequest: false,
  status: null,
  message: null
})

/* ------------- Selectors ------------- */

export const ResendPassSelectors = {
  resendPassRequest: state => state.resendPassRequest,
  status: state=>state.status,
  message: state=>state.message
}

/* ------------- Reducers ------------- */

export const resendPassRequest = (state, action) => {
  console.log('[resendPassRedux] resendPassRequest begin', action)
  const { data } = action
  return state.merge({resendPassRequest: true})
}
export const resendPassRequestDone = (state, action) => {
  console.log('[resendPassRedux] resendPassRequest done', action)
  const { data } = action
  return state.merge({resendPassRequest: false, status: data.status, message: data.message})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.Resend_Pass_REQUEST]: resendPassRequest,
  [Types.Resend_Pass_REQUEST_DONE]: resendPassRequestDone
})
