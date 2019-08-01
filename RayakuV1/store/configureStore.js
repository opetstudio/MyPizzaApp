
import { createStore, applyMiddleware, compose } from 'redux';
import Config from 'react-native-config';
// import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
// import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
// import { routerActions } from 'react-router-redux';
// import { AsyncStorage } from 'react-native';

import rootReducer from '../reducers';

const environment = Config.environment;

const setupMiddleware = () => {
  const mw = [];
  mw.push(thunk);
  if (environment !== 'production') {
    mw.push(createLogger({ level: 'info', collapsed: true }));
  }
  return mw;
};

const initialState = {};
export const configureStore = () => {
  const middleware = setupMiddleware();
  const enhancers = [];
  // Redux DevTools Configuration
  const actionCreators = {
    // ...routerActions
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);
  const store = createStore(rootReducer, initialState, enhancer);
  // persistStore(store, { storage: AsyncStorage }, () => {
  //   ////console.log('restored');
  // });
  return store;
};

// export { configureStore };
