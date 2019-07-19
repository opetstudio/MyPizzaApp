import {AsyncStorage} from 'react-native'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sessionLoginWithSocmed: ['data'],
  sessionRequest: ['data'],
  sessionRegserver: ['data'],
  sessionSuccess: ['payload'],
  sessionFailure: ['errorMessage'],
  sessionLogout: null
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  loginWith: null,
  currentUser: null,
  sessionToken: null,
  payload: null,
  error: null,
  errorMessage: null,
  isLoginCompleted: true
})

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getData: state => state.data,
  getCurrentUser: state => state.currentUser,
  getSessionToken: state => state.sessionToken,
  getFetching: state => state.fetching,
  getIsLoginCompleted: state => state.isLoginCompleted,
  isError: state => state.error,
  getErrorMessage: state => state.errorMessage
}

/* ------------- Reducers ------------- */

export const loginWithSocmed = (state, action) => {
  const { data } = action
  return state.merge({ isLoginCompleted: false })
}
// request the data from an api
export const request = (state, action) => {
  const { data } = action
  __DEV__ && console.log('[SessionRedux] request action', action)
  __DEV__ && console.log('[SessionRedux] request state', state)
  return state.merge({ fetching: true, data, payload: null })
}
export const regserver = (state, action) => {
  const { data } = action
  __DEV__ && console.log('[SessionRedux] request action', action)
  __DEV__ && console.log('[SessionRedux] request state', state)
  return state.merge({ fetching: true, data, payload: null })
}

// successful api lookup
export const success = (state, {payload}) => {
  __DEV__ && console.log('[SessionRedux] success payload', payload)
  __DEV__ && console.log('[SessionRedux] success state', state)
  // const { loginWith, currentUser } = payload
  AsyncStorage.setItem('sessionToken', payload.sessionToken)
  return state.merge({ isLoginCompleted: true, fetching: false, error: null, payload, currentUser: payload.currentUser, loginWith: payload.loginWith, sessionToken: payload.sessionToken })
}

// Something went wrong somewhere.
export const failure = (state, {errorMessage}) => {
  // __DEV__ && console.log('===>p1', { errorMessage })
  return state.merge({ isLoginCompleted: true, fetching: false, error: true, payload: null, errorMessage })
}
export const logout = (state) => {
  AsyncStorage.clear()
  console.log('do logout')
  return state.merge({ isLoginCompleted: true, fetching: false, error: false, payload: null, currentUser: null, sessionToken: '' })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SESSION_LOGIN_WITH_SOCMED]: loginWithSocmed,
  [Types.SESSION_REQUEST]: request,
  [Types.SESSION_REGSERVER]: regserver,
  [Types.SESSION_SUCCESS]: success,
  [Types.SESSION_LOGOUT]: logout,
  [Types.SESSION_FAILURE]: failure
})
