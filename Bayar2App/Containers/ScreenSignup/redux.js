import {AsyncStorage} from 'react-native'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: ['data'],
  signupRequestDone: ['data']
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  signupRequest: false,
  status: null
})

/* ------------- Selectors ------------- */

export const SignupSelectors = {
  signupRequest: state => state.signupRequest,
  status: state=>state.status
}

/* ------------- Reducers ------------- */

export const signupRequest = (state, action) => {
  console.log('[signupRedux] signupRequest begin', action)
  const { data } = action
  return state.merge({signupRequest: true})
}
export const signupRequestDone = (state, action) => {
  console.log('[signupRedux] signupRequest done', action)
  const { data } = action
  return state.merge({signupRequest: false, status: data.status})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_REQUEST_DONE]: signupRequestDone
})
