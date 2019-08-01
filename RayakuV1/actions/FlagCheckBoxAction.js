import { Actions } from 'react-native-router-flux';

import {
  SELECT_EDIT_MODE,
  SELECT_PHONE_NUMBER,
  FLAG_SET_EDITMODE_PER_SCENE,
  FLAG_PUSH_OR_POP_SELECTED_ITEM
} from '../constants';

export const selectEditMode = (editMode) => {
  console.log('selectEditMode=>', editMode);
  return (dispatch) => {
    dispatch({
      type: SELECT_EDIT_MODE,
      payload: editMode
    });
  };
};
export const setEditModePerScene = (currScene, editMode) => {
  console.log('selectEditMode=>', editMode);
  return (dispatch, getState) => {
    const editModePerScene = getState().FlagCheckBoxReducer.editModePerScene || {};
    const listCheckedObj = getState().FlagCheckBoxReducer.listChecked || {};
    listCheckedObj[currScene] = [];
    editModePerScene[currScene] = editMode;
    dispatch({
      type: FLAG_SET_EDITMODE_PER_SCENE,
      payload: editModePerScene
    });
  };
};
export const pushOrPopSelectedItem = (opt) => (dispatch, getState) => {
  console.log('[FlagCheckBoxAction] opt', opt);
  const screens = opt.screens;
  const item_id = opt.id;
  const listCheckedObj = getState().FlagCheckBoxReducer.listChecked || {};
  listCheckedObj[screens] = listCheckedObj[screens] || [];
  const index = listCheckedObj[screens].indexOf(item_id);
  if (index === -1) {
    listCheckedObj[screens].push(item_id);
  } else {
    listCheckedObj[screens].splice(index, 1);
  }
  dispatch({ type: FLAG_PUSH_OR_POP_SELECTED_ITEM, payload: listCheckedObj });
};
export const selectPhoneNumber = (rowIds) => {
  console.log('selectPhoneNumber=>', rowIds);
  return (dispatch) => {
    // upsert user
    dispatch({
      type: SELECT_PHONE_NUMBER,
      payload: menu
    });
  };
};
