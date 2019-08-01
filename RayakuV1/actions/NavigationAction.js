import {
  SWITCH_TAB,
  SWITCH_MENU
} from '../constants';

export const switchTab = (tab) => {
  ////console.log('switchTab=>', tab);
  return (dispatch) => {
    //upsert user
    dispatch({
      type: SWITCH_TAB,
      payload: tab
    });
  };
};
export const switchMenu = (menu) => {
  ////console.log('switchMenu=>', menu);
  return (dispatch) => {
    //upsert user
    dispatch({
      type: SWITCH_MENU,
      payload: menu
    });
  };
};
