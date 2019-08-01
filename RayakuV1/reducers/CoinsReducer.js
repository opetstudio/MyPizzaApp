import {
    COINS_UPSERT_INPROGRESS,
    COINS_UPSERT_SUCCESS
  }
  from '../constants';

  const INITIAL_STATE = {
    upsert_inprogress: false,
    byId: {},
    allIds: []
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      // case 'persist/REHYDRATE':
      // return {
      //   ...INITIAL_STATE
      // };
      case COINS_UPSERT_INPROGRESS:
        return {
          ...state,
          upsert_inprogress: true
        };
      case COINS_UPSERT_SUCCESS:
        return {
          ...state,
          upsert_inprogress: false
        };
      default:
        return state;
    }
  };
