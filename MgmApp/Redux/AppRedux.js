import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appRequest: ['data'],
  appSuccess: ['payload'],
  appStatusbar: ['statusBarIsHidden'],
  appFailure: null
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  statusBarIsHidden: false
})

/* ------------- Selectors ------------- */

export const AppSelectors = {
  getData: state => state.data,
  getIsStatusBarHidden: state => state.statusBarIsHidden
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const setstatusbar = (state, {statusBarIsHidden}) =>
  state.merge({ statusBarIsHidden })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_REQUEST]: request,
  [Types.APP_SUCCESS]: success,
  [Types.APP_STATUSBAR]: setstatusbar,
  [Types.APP_FAILURE]: failure
})
