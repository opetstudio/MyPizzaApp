import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    // form add card
    addcardFormSubmit: ['data'],
    addcardPatch: ['data'],
    reset: null
})

export const AddcardTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    version: 0,
    addcardFormSubmitMSG: {ir: false, rc: '', rs: '', rd: ''}
})

export const AddcardSelectors = {
    addcardFormSubmitMSG: st => st.addcardFormSubmitMSG,
    version: st => st.version
}
export const addcardFormSubmit = (state, { data }) => {
    data.addcardFormSubmitMSG = { ir: true, rc: '', rs: '', rd: '' }
    return addcardPatch(state, {data})
}

export const addcardPatch = (state, {data}) => {
    let mergeData = {}
  if (data.hasOwnProperty('addcardFormSubmitMSG')) mergeData.addcardFormSubmitMSG = data.addcardFormSubmitMSG
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}


export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADDCARD_FORM_SUBMIT]: addcardFormSubmit,
    [Types.ADDCARD_PATCH]: addcardPatch,
    [Types.RESET]: (state) => INITIAL_STATE
  })