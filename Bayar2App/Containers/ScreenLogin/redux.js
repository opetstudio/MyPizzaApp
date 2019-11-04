import {AsyncStorage} from 'react-native'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginRequestDone: ['data']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loginRequest: false
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  loginRequest: state => state.loginRequest
}

/* ------------- Reducers ------------- */

export const loginRequest = (state, action) => {
  console.log('[LoginRedux] loginRequest begin', action)
  const { data } = action
  return state.merge({loginRequest: true})
}
export const loginRequestDone = (state, action) => {
  console.log('[LoginRedux] loginRequest done', action)
  const { data } = action
  return state.merge({loginRequest: false})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_REQUEST_DONE]: loginRequestDone
})
