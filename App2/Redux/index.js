import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  app: require('./AppRedux').reducer,
  tv: require('./TvRedux').reducer,
  radio: require('./RadioRedux').reducer,
  powerpoint: require('./PowerpointRedux').reducer,
  scriptinject: require('./ScriptinjectRedux').reducer,
  movie: require('./MovieRedux').reducer,
  book: require('./BookRedux').reducer,
  restapi: require('./RestapiRedux').reducer,
  session: require('./SessionRedux').reducer,
  renpagi: require('./RenpagiRedux').reducer,
  ssdewasa: require('./SsdewasaRedux').reducer,
  popup: require('./PopupRedux').reducer,
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  comment: require('./CommentRedux').reducer,
  user: require('./UserRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
