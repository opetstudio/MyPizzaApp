import {
  SELECT_GROUP_MEMBER_SUCCESS
} from '../constants';

export const selectGroupMembers = (opt) => {
  console.log('selectGroupMembers=>', opt);
  return (dispatch, getState) => {
    getState().GroupMemberReducer.listSelectedGroupMembers.push(opt);
    dispatch({
      type: SELECT_GROUP_MEMBER_SUCCESS,
      // payload: {
      //   contactIds: opt.contactIds,
      //   phoneName: opt.name,
      // }
    });
  };
};
