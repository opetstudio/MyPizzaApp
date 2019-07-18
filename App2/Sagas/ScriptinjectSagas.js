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
import ScriptinjectActions from '../Redux/ScriptinjectRedux'
// import { ScriptinjectSelectors } from '../Redux/ScriptinjectRedux'

export function * getScriptinject (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ScriptinjectSelectors.getData)
  // make the call to the api
  const response = yield call(api.getScriptinject, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { byId, allIds, maxModifiedon } = response.data
    yield put(ScriptinjectActions.scriptinjectSuccess(byId, allIds, maxModifiedon))
  } else {
    yield put(ScriptinjectActions.scriptinjectFailure())
  }
}

export function * requestDetail (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(MovieSelectors.getData)
  // make the call to the api
  const response = yield call(api.getScriptinjectDetail, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { contentDetail } = response.data
    yield put(ScriptinjectActions.scriptinjectSuccessdetail(contentDetail))
  } else {
    yield put(ScriptinjectActions.scriptinjectFailuredetail())
  }
}
