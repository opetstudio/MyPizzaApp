import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ssdewasaRequest: ['data', 'payload'],
  ssdewasaSuccess: ['byId', 'allIds', 'maxModifiedon'],
  ssdewasaFailure: null
})

export const SsdewasaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  byId: null,
  allIds: [],
  maxModifiedon: 0,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SsdewasaSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getAllIds: state => state.allIds,
  getFetching: state => state.fetching || false,
  getAllDataArr: state => state.allIds.map(id => state.byId[id]),
  getAllLessons: (state, filter) => {
    const r = []
    SsdewasaSelectors.getAllDataArr(state).forEach((v = {}) => {
      if (new Date(v.tanggal).getDay() + 1 === 7) {
        r.push(v)
      }
    })
    return r
  }
  // getAllLessonsByFilter: (state, filter) => {
  //   // { pelajaranke: v.pelajaranke, triwulanke: v.triwulanke, year: v.year }
  //   const r = _.orderBy(_.filter(
  //     SsdewasaSelectors.getAllDataArr(state),
  //     filter
  //     ), ['tanggal'], ['asc'])
  //   // const r = []
  //   // SsdewasaSelectors.getAllDataArr(state).forEach((v) => {
  //   //   if (new Date(v.tanggal).getDay() + 1 === 7) {
  //   //     r.push(v)
  //   //   }
  //   // })
  //   return r
  // }
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

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SSDEWASA_REQUEST]: request,
  [Types.SSDEWASA_SUCCESS]: success,
  [Types.SSDEWASA_FAILURE]: failure
})
