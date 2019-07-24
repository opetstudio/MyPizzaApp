import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  scriptinjectRequest: ['data', 'payload'],
  scriptinjectSuccess: ['byId', 'allIds', 'maxModifiedon'],
  scriptinjectSetscriptinjectsource: ['scriptinjectSource'],
  scriptinjectResetscriptinjectsource: ['id'],
  scriptinjectFailure: null,
  scriptinjectRequestdetail: ['data'],
  scriptinjectSuccessdetail: ['contentDetail'],
  scriptinjectFailuredetail: null
})

export const ScriptinjectTypes = Types
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
  scriptinjectSource: null,
  fetchingDetail: null
})

/* ------------- Selectors ------------- */

export const ScriptinjectSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  funcGetByProvider: state => {
    return (provider) => {
      return _.filter(ScriptinjectSelectors.getAllDataArr(state), {'provider': provider})[0] || {}
    }
  },
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false,
  getScriptinjectSource: (state, id) => (state.scriptinjectSource || {})[id],
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

export const setscriptinjectsource = (state, action) => {
  const { scriptinjectSource } = action
  return state.merge({ scriptinjectSource: {...state.scriptinjectSource, ...scriptinjectSource} })
}
export const resetscriptinjectsource = (state, action) => {
  const { id } = action
  return state.merge({ scriptinjectSource: {...state.scriptinjectSource, [id]: {}} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const failureDetail = state =>
  state.merge({ fetchingDetail: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SCRIPTINJECT_REQUEST]: request,
  [Types.SCRIPTINJECT_SUCCESS]: success,
  [Types.SCRIPTINJECT_FAILURE]: failure,
  [Types.SCRIPTINJECT_SETSCRIPTINJECTSOURCE]: setscriptinjectsource,
  [Types.SCRIPTINJECT_RESETSCRIPTINJECTSOURCE]: resetscriptinjectsource,
  [Types.SCRIPTINJECT_REQUESTDETAIL]: requestDetail,
  [Types.SCRIPTINJECT_SUCCESSDETAIL]: successDetail,
  [Types.SCRIPTINJECT_FAILUREDETAIL]: failureDetail
})
