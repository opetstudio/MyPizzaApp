import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    otpvalidationFormSubmit: ['data'],
    otpvalidationPatch: ['data'],
    reset: null
})

export const OtpvalidationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    version: 0,
    otpvalidationFormSubmitMSG: {ir: false, rc: '', rs: '', rd: ''},
})

export const OtpvalidationSelectors = {
    otpvalidationFormSubmitMSG: st => st.otpvalidationFormSubmitMSG,
    version: st => st.version
}
export const otpvalidationFormSubmit = (state, { data }) => {
    data.otpvalidationFormSubmitMSG = { ir: true, rc: '', rs: '', rd: '' }
    return otpvalidationPatch(state, {data})
}

export const otpvalidationPatch = (state, {data}) => {
    let mergeData = {}
  if (data.hasOwnProperty('otpvalidationFormSubmitMSG')) mergeData.otpvalidationFormSubmitMSG = data.otpvalidationFormSubmitMSG
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}


export const reducer = createReducer(INITIAL_STATE, {
    [Types.OTPVALIDATION_FORM_SUBMIT]: otpvalidationFormSubmit,
    [Types.OTPVALIDATION_PATCH]: otpvalidationPatch,
    [Types.RESET]: (state) => INITIAL_STATE
  })