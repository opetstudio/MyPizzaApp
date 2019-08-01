import {
  SELECT_EDIT_MODE,
  SELECT_PHONE_NUMBER,
  FLAG_SET_EDITMODE_PER_SCENE,
  FLAG_PUSH_OR_POP_SELECTED_ITEM
}
from '../constants';

const INITIAL_STATE = {
  editMode: false,
  editModePerScene: {},
  listChecked: {},
  messageIds: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'persist/REHYDRATE':
    // return {
    //   ...INITIAL_STATE
    // };
    case SELECT_EDIT_MODE:
    console.log('[FlagCheckBoxReducer] SELECT_EDIT_MODE', action.payload);
      return {
        ...state,
        editMode: action.payload.editMode
      };
    case SELECT_PHONE_NUMBER:
    console.log('[FlagCheckBoxReducer] SELECT_PHONE_NUMBER', action.payload);
      return {
        ...state,
        messageIds: action.payload
      };
    case FLAG_SET_EDITMODE_PER_SCENE:
    console.log('[FlagCheckBoxReducer] FLAG_SET_EDITMODE_PER_SCENE', action.payload);
      return {
        ...state,
        editModePerScene: action.payload
      };
    case FLAG_PUSH_OR_POP_SELECTED_ITEM:
      return {
        ...state,
        listChecked: action.payload
      };
    default:
      return state;
  }
};
