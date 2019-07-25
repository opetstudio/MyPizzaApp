import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  movieRequest: ['data', 'payload'],
  movieRequestsubtitle: ['data'],
  movieSuccesssubtitle: ['subtitle', 'contentDetail'],
  movieSetmoviesource: ['movieSource'],
  movieResetmoviesource: ['id'],
  movieSuccess: ['byId', 'allIds', 'maxModifiedon'],
  movieFailure: null,
  movieFailuresubtitle: null
})

export const MovieTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  byId: null,
  subtitle: [],
  allIds: [],
  maxModifiedon: 0,
  fetching: null,
  fetchingSubtitle: null,
  movieSource: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const MovieSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getFetching: state => state.fetching || false,
  getSubtitle: state => state.subtitle || [],
  getMovieSource: (state, id) => (state.movieSource || {})[id],
  getFetchingsubtitle: state => state.fetchingSubtitle || false
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data, payload }) =>
  state.merge({ fetching: true, data, payload })
export const requestSubtitle = (state) =>
  state.merge({ fetchingSubtitle: true })

export const successSubtitle = (state, action) => {
  const { subtitle, contentDetail } = action
  const byId = {}
  byId[contentDetail._id] = contentDetail
  return state.merge({ fetchingSubtitle: false, subtitle, byId: {...state.byId, ...byId} })
}
export const setmoviesource = (state, action) => {
  const { movieSource } = action
  return state.merge({ movieSource: {...state.movieSource, ...movieSource} })
}
export const resetmoviesource = (state, action) => {
  const { id } = action
  return state.merge({ movieSource: {...state.movieSource, [id]: {}} })
}

// successful api lookup
export const success = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]), maxModifiedon })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })
export const failureSubtitle = state =>
  state.merge({ fetchingSubtitle: false, subtitle: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVIE_REQUEST]: request,
  [Types.MOVIE_REQUESTSUBTITLE]: requestSubtitle,
  [Types.MOVIE_SUCCESS]: success,
  [Types.MOVIE_SUCCESSSUBTITLE]: successSubtitle,
  [Types.MOVIE_FAILURE]: failure,
  [Types.MOVIE_SETMOVIESOURCE]: setmoviesource,
  [Types.MOVIE_RESETMOVIESOURCE]: resetmoviesource,
  [Types.MOVIE_FAILURESUBTITLE]: failureSubtitle
})
