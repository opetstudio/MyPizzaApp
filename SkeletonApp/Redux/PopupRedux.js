import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  popupRequest: ['data'],
  popupSuccess: ['payload'],
  popupFailure: null,
  popupShow: ['popupMessage'],
  popupHide: null
})

export const PopupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  popupMessage: null,
  popupOpen: false,
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const PopupSelectors = {
  getData: state => state.data,
  getPopupOpen: state => state.popupOpen,
  getPopupMessage: state => state.popupMessage
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const show = (state, action) => {
  return state.merge({
    popupOpen: true,
    popupMessage: {
      title: action.popupMessage.title,
      body: action.popupMessage.body,
      actions: action.popupMessage.actions,
      imageSource: action.popupMessage.imageSource,
      imageBody: action.popupMessage.imageBody
    }
  })
}

export const hide = state =>
  state.merge({ popupOpen: false, popupMessage: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POPUP_REQUEST]: request,
  [Types.POPUP_SUCCESS]: success,
  [Types.POPUP_FAILURE]: failure,
  [Types.POPUP_SHOW]: show,
  [Types.POPUP_HIDE]: hide
})
