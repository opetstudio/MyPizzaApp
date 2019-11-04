import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  powerpointRequest: ['data', 'payload'],
  powerpointSuccess: ['byId', 'allIds', 'maxModifiedon'],
  powerpointSetpowerpointsource: ['powerpointSource'],
  powerpointResetpowerpointsource: ['id'],
  powerpointFailure: null,
  powerpointRequestdetail: ['data'],
  powerpointSuccessdetail: ['contentDetail'],
  powerpointFailuredetail: null
})

export const PowerpointTypes = Types
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
  powerpointSource: null,
  fetchingDetail: null
})

/* ------------- Selectors ------------- */

export const PowerpointSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false,
  getPowerpointSource: (state, id) => (state.powerpointSource || {})[id],
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

export const setpowerpointsource = (state, action) => {
  const { powerpointSource } = action
  return state.merge({ powerpointSource: {...state.powerpointSource, ...powerpointSource} })
}
export const resetpowerpointsource = (state, action) => {
  const { id } = action
  return state.merge({ powerpointSource: {...state.powerpointSource, [id]: {}} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const failureDetail = state =>
  state.merge({ fetchingDetail: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POWERPOINT_REQUEST]: request,
  [Types.POWERPOINT_SUCCESS]: success,
  [Types.POWERPOINT_FAILURE]: failure,
  [Types.POWERPOINT_SETPOWERPOINTSOURCE]: setpowerpointsource,
  [Types.POWERPOINT_RESETPOWERPOINTSOURCE]: resetpowerpointsource,
  [Types.POWERPOINT_REQUESTDETAIL]: requestDetail,
  [Types.POWERPOINT_SUCCESSDETAIL]: successDetail,
  [Types.POWERPOINT_FAILUREDETAIL]: failureDetail
})
