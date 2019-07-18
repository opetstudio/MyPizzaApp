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
import CommentActions from '../Redux/CommentRedux'
// import { CommentSelectors } from '../Redux/CommentRedux'

export function * getComment (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommentSelectors.getData)
  // make the call to the api
  const response = yield call(api.getcomment, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { byId, allIds, maxModifiedon } = response.data
    yield put(CommentActions.commentSuccess(byId, allIds, maxModifiedon))
  } else {
    const {problem} = response
    yield put(CommentActions.commentFailure(problem, 'System error.'))
  }
}
export function * postingComment (api, action) {
  __DEV__ && console.log('postingComment', action)
  const { dataPost } = action
  // get current data from Store
  // const currentData = yield select(CommentSelectors.getData)
  // make the call to the api
  const response = yield call(api.postComment, dataPost)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const { byId, allIds, maxModifiedon, status, errorMessage } = response.data
    if (status) yield put(CommentActions.commentPostsuccess(byId, allIds, maxModifiedon))
    else yield put(CommentActions.commentPostfailure('POST_COMMENT_ERROR', errorMessage))
  } else {
    const {problem} = response
    yield put(CommentActions.commentPostfailure(problem, 'System error, Plase try again.'))
  }
}
