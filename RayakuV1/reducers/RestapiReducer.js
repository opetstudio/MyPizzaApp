import {
  RESTAPI_FETCH_ALL,
  RESTAPI_FETCH_ALL_SUCCESS,
  RESTAPI_FETCH_ALL_ERROR,
}
from '../constants';

const INITIAL_STATE = {
  fetchAllInProcess: false,
  errorMessage: '',
  listAll: [],
  listOne: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESTAPI_FETCH_ALL:
      return {
        ...state,
        fetchAllInProcess: true
      };
    case RESTAPI_FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchAllInProcess: false,
        listAll: action.payload
      };
    case RESTAPI_FETCH_ALL_ERROR:
      return {
        ...state,
        fetchAllInProcess: false
      };
    default:
      return state;
  }
};
