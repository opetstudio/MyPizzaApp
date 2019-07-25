import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge} from '../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  commentRequest: ['data'],
  commentSuccess: ['byId', 'allIds', 'maxModifiedon'],
  commentFailure: ['errorCode', 'errorMessage'],
  commentPost: ['dataPost'],
  commentPostsuccess: ['byId', 'allIds', 'maxModifiedon'],
  commentPostfailure: ['errorCode', 'errorMessage'],
  commentTextinputOnchange: ['textInput'],
  commentResetInputtext: null
})

export const CommentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  byId: null,
  allIds: [],
  maxModifiedon: 0,
  fetching: null,
  payload: null,
  error: null,
  posting: null,
  dataPost: null,
  errorCode: null,
  errorMessage: null,
  textInput: null
})

/* ------------- Selectors ------------- */

export const CommentSelectors = {
  getMaxModifiedon: state => state.maxModifiedon,
  getData: state => state.data,
  getById: state => state.byId,
  getAllIds: state => state.allIds,
  getAllDataArr: (state, contentId) => {
    return _.orderBy(_.filter(state.allIds.map(id => state.byId[id]), {'contentId': contentId}), ['createdon'], ['desc'])
  },
  getTotalCommentByContentId: (state, contentId) => {
    return _.filter(state.allIds.map(id => state.byId[id]), {'contentId': contentId}).length
    // return (_.filter(state.allIds.map(id => state.byId[id]), {'contentId': contentId})).length
  },
  getTotalCommentByListContentId: (state, contentIdArr) => {
    const listTotal = contentIdArr.map(contentId => CommentSelectors.getTotalCommentByContentId(state, contentId))
    var tot = 0
    listTotal.forEach((v) => {
      tot += v
    })
    return tot
    // return (_.filter(state.allIds.map(id => state.byId[id]), {'contentId': contentId})).length
  },
  getFetching: state => state.fetching || false,
  getIsPostingInProgress: state => state.posting || false,
  getTextInput: state => state.textInput,
  getErrorMessage: state => state.errorMessage
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { byId, allIds, maxModifiedon } = action
  return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]), maxModifiedon })
}
// Something went wrong somewhere.
export const failure = (state, { errorCode, errorMessage }) =>
state.merge({ fetching: false, posting: false, error: true, payload: null, dataPost: null, errorCode, errorMessage })

// POSTING COMMENT
export const textinputOnchange = (state, { textInput }) => state.merge({ textInput })
export const post = (state, { dataPost }) => state.merge({ posting: true, dataPost })
export const postsuccess = (state, {byId, allIds, maxModifiedon}) => state.merge({ textInput: '', posting: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]), maxModifiedon, errorMessage: null })
export const postfailure = (state, { errorCode, errorMessage }) => state.merge({ fetching: false, posting: false, error: true, payload: null, dataPost: null, errorCode, errorMessage })
export const resetInputtext = (state) =>
  state.merge({
    textInput: null,
    posting: false,
    error: null,
    errorCode: null,
    errorMessage: null
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMENT_REQUEST]: request,
  [Types.COMMENT_SUCCESS]: success,
  [Types.COMMENT_FAILURE]: failure,
  [Types.COMMENT_POST]: post,
  [Types.COMMENT_TEXTINPUT_ONCHANGE]: textinputOnchange,
  [Types.COMMENT_POSTSUCCESS]: postsuccess,
  [Types.COMMENT_POSTFAILURE]: postfailure,
  [Types.COMMENT_RESET_INPUTTEXT]: resetInputtext // commentResetInputText
})
