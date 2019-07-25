import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tvRequest: ['data', 'payload'],
  tvSuccess: ['byId', 'allIds', 'maxModifiedon'],
  tvSettvsource: ['tvSource'],
  tvResettvsource: ['id'],
  tvFailure: null,
  tvRequestdetail: ['data'],
  tvSuccessdetail: ['contentDetail'],
  tvFailuredetail: null
})

export const TvTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  byId: null,
  subtitle: [],
  allIds: [],
  tvSource: null,
  fetchingDetail: null
})

/* ------------- Selectors ------------- */

export const TvSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false,
  getTvSource: (state, id) => (state.tvSource || {})[id],
  getFetchingdetail: state => state.fetchingDetail || false
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data, payload }) =>
  state.merge({ fetching: true, data, payload })
export const requestDetail = (state) =>
  state.merge({ fetchingDetail: true })

// successful api lookup
export const success = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]), maxModifiedon })
}
export const successDetail = (state, action) => {
  const { contentDetail } = action
  const byId = {}
  byId[contentDetail._id] = contentDetail
  return state.merge({ fetchingDetail: false, byId: {...state.byId, ...byId} })
}

export const settvsource = (state, action) => {
  const { tvSource } = action
  return state.merge({ tvSource: {...state.tvSource, ...tvSource} })
}
export const resettvsource = (state, action) => {
  const { id } = action
  return state.merge({ tvSource: {...state.tvSource, [id]: {}} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const failureDetail = state =>
  state.merge({ fetchingDetail: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TV_REQUEST]: request,
  [Types.TV_SUCCESS]: success,
  [Types.TV_FAILURE]: failure,
  [Types.TV_SETTVSOURCE]: settvsource,
  [Types.TV_RESETTVSOURCE]: resettvsource,
  [Types.TV_REQUESTDETAIL]: requestDetail,
  [Types.TV_SUCCESSDETAIL]: successDetail,
  [Types.TV_FAILUREDETAIL]: failureDetail
})
