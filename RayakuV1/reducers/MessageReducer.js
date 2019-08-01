import {
  MESSAGE_READ_INPROGRESS,
  MESSAGE_READ_SUCCESS,
  MESSAGE_READ_ERROR
} from '../constants';

const INITIAL_STATE = {
  createInProgress: false,
  readInProgress: false,
  byId: {},
  allIds: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case MESSAGE_READ_INPROGRESS:
      return {
        ...state,
        readInProgress: true
      };
    case MESSAGE_READ_SUCCESS:
      return {
        ...state,
        readInProgress: false
      };
    case MESSAGE_READ_ERROR:
      return {
        ...state,
        readInProgress: false
      };
    default:
      return state;
  }
};
