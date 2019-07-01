import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge } from '../Lib/datamining'
import { isEmpty } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sessionUpdate: ['data']
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  isLoggedIn: state => state.isLoggedIn
}

/* ------------- Reducers ------------- */

export const sessionUpdate = (state, action) => {
  console.log('[SessionRedux] sessionUpdate', action)
  const { data } = action
//   const contentDetail = data.contentDetail
  return state
//   return state.merge({})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SESSION_UPDATE]: sessionUpdate
})
