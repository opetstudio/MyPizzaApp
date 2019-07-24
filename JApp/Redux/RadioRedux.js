import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  radioRequest: ['data', 'payload'],
  radioSuccess: ['byId', 'allIds', 'maxModifiedon'],
  radioSetradiosource: ['radioSource'],
  radioResetradiosource: ['id'],
  radioFailure: null,
  radioRequestdetail: ['data'],
  radioSuccessdetail: ['contentDetail'],
  radioFailuredetail: null
})

export const RadioTypes = Types
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
  radioSource: null,
  fetchingDetail: null
})

/* ------------- Selectors ------------- */

export const RadioSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false,
  getRadioSource: (state, id) => (state.radioSource || {})[id],
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

export const setradiosource = (state, action) => {
  const { radioSource } = action
  return state.merge({ radioSource: {...state.radioSource, ...radioSource} })
}
export const resetradiosource = (state, action) => {
  const { id } = action
  return state.merge({ radioSource: {...state.radioSource, [id]: {}} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const failureDetail = state =>
  state.merge({ fetchingDetail: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RADIO_REQUEST]: request,
  [Types.RADIO_SUCCESS]: success,
  [Types.RADIO_FAILURE]: failure,
  [Types.RADIO_SETRADIOSOURCE]: setradiosource,
  [Types.RADIO_RESETRADIOSOURCE]: resetradiosource,
  [Types.RADIO_REQUESTDETAIL]: requestDetail,
  [Types.RADIO_SUCCESSDETAIL]: successDetail,
  [Types.RADIO_FAILUREDETAIL]: failureDetail
})
