import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restapiRequest: ['data', 'payload'],
  restapiSuccess: ['byId', 'allIds', 'maxModifiedon'],
  restapiFailure: null
})

export const RestapiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  maxModifiedon: 0,
  data: null,
  byId: null,
  allIds: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const RestapiSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => state.byId[id])
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data, payload }) =>
  state.merge({ fetching: true, data, payload })

// successful api lookup
export const success = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds], maxModifiedon) })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAPI_REQUEST]: request,
  [Types.RESTAPI_SUCCESS]: success,
  [Types.RESTAPI_FAILURE]: failure
})
