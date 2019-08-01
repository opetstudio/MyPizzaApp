import {
  SWITCH_TAB,
  SWITCH_MENU,
  LOGGED_OUT
}
from '../constants';

const initialMenu = {
  menu: 1
};
const initialTab = {
  tab: 1
};
const INITIAL_STATE = {
  ...initialMenu,
  ...initialTab
};

const initialState = { menu: 1, tab: 1 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_TAB:
      return {
        ...state,
        tab: action.payload
      };
    case SWITCH_MENU:
      return {
        ...state,
        menu: action.payload
      };
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};
