/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import SessionActions from '../Redux/SessionRedux'
import {getTokenUsingSocialAccount} from '../Services/identity'
import I18n from '../I18n'
import {path} from 'ramda'
// import { SessionSelectors } from '../Redux/SessionRedux'

export function * getSession (api, action) {
  __DEV__ && console.log('[SessonSaga] getSession action', action)
  const { data } = action
  // get current data from Store
  // const currentData = yield select(SessionSelectors.getData)
  // make the call to the api
  // const response = yield call(api.getsession, data)

  // success?
  // if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
  // yield put(SessionActions.sessionRequest(data))
  // } else {
  //   yield put(SessionActions.sessionFailure())
  // }
}
export function * postSessionRegServer (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(SessionSelectors.getData)
  // make the call to the api
  const response = yield call(api.postSessionRegServer, data)

  // success?
  // if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
  // yield put(SessionActions.sessionRequest(data))
  // } else {
  //   yield put(SessionActions.sessionFailure())
  // }
}

export function * setSession (api, action) {
  __DEV__ && console.log('[SessonSaga] setSession action', action)
  const { loginWith, currentUser } = action
  yield put(SessionActions.sessionSuccess(loginWith, currentUser))
}

export function * loginWithSocmed (api, { data }) {
  // const token = yield
  try {
    const token = yield call(getTokenUsingSocialAccount, data)
    if ('loginError' in token) throw new Error(token.errorMessage)
    const { accountType: loginWith } = data
    const currentUser = token
    const dataUser = {
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      accountType: loginWith
    }
    const response = yield call(api.postUser, dataUser)
    __DEV__ && console.log('response===>', response)

    if (!response.ok) {
      if ((response.problem).match(/NETWORK_ERROR/i)) {
        throw new Error(I18n.t('ERROR_LOGIN_NETWORK_ERROR', 'netework error'))
      } else if (response.problem) {
        throw new Error(response.problem)
      }
    } else if (!('data' in response)) {
      throw new Error(I18n.t('ERROR_LOGIN_NETWORK_ERROR', 'netework error'))
    }

    const mongoId = path(['_id'], response.data.currUser)
    if (!response.ok || !response.data.status || !mongoId) throw new Error(I18n.t('ERROR_LOGIN_NETWORK_ERROR', 'netework error'))
    currentUser['_id'] = mongoId
    yield put(SessionActions.sessionSuccess({loginWith, currentUser}))
  } catch (e) {
    __DEV__ && console.log('error==>', e)
    const errorMessage = e.message
    yield put(SessionActions.sessionFailure(errorMessage))
  }
}
