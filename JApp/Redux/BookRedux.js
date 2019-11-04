import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookRequest: ['data', 'payload'],
  bookSuccess: ['byId', 'allIds', 'maxModifiedon'],
  bookSetCurrentPage: ['bookId', 'page'],
  bookSetCurrentPath: ['bookId', 'path'],
  bookFailure: null
})

export const BookTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  byId: null,
  allIds: [],
  maxModifiedon: 0,
  currentPage: null,
  currentPath: null
})

/* ------------- Selectors ------------- */

export const BookSelectors = {
  getData: state => state.data,
  getMaxModifiedon: state => state.maxModifiedon,
  getById: state => state.byId,
  getDetailById: (state, id) => (state.byId || {})[id],
  getCurrentPageById: (state, id) => (state.currentPage || {})[id],
  getCurrentPathById: (state, id) => (state.currentPath || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data, payload }) =>
  state.merge({ fetching: true, data, payload })

// successful api lookup
export const success = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]), maxModifiedon })
}
export const setCurrentPage = (state, action) => {
  __DEV__ && console.log('setCurrentPage ', action)
  const { bookId, page } = action
  return state.merge({ currentPage: {...state.currentPage, [bookId]: page} })
}
export const setCurrentPath = (state, action) => {
  const { bookId, path } = action
  return state.merge({ currentPath: {...state.currentPath, [bookId]: path} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOK_REQUEST]: request,
  [Types.BOOK_SUCCESS]: success,
  [Types.BOOK_SET_CURRENT_PAGE]: setCurrentPage,
  [Types.BOOK_SET_CURRENT_PATH]: setCurrentPath,
  [Types.BOOK_FAILURE]: failure
})
