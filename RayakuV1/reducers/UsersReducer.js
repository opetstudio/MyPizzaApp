import {
  USER_UPSERT_INPROGRESS,
  USER_UPSERT_SUCCESS
}
from '../constants';

const INITIAL_STATE = {
  upsertInprogress: false,
  byId: {},
  allIds: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case USER_UPSERT_INPROGRESS:
      return {
        ...state,
        upsertInprogress: true
      };
    case USER_UPSERT_SUCCESS:
      return {
        ...state,
        upsertInprogress: false
      };
    default:
      return state;
  }
};
