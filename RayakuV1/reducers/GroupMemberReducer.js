import {
  SELECT_GROUP_MEMBER_SUCCESS
} from '../constants';

const INITIAL_STATE = {
  listSelectedGroupMembers: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_GROUP_MEMBER_SUCCESS:
      console.log('GroupMemberReducer');
      return {
        ...state,
      };
    default:
      return state;
  }
}
