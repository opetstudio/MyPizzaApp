import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import RestapiActions from '../Redux/RestapiRedux'
import RenpagiActions from '../Redux/RenpagiRedux'
import SsdewasaActions from '../Redux/SsdewasaRedux'
import CommentAction from '../Redux/CommentRedux'
import ScriptinjectAction from '../Redux/ScriptinjectRedux'

import { is } from 'ramda'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }
  yield put(RestapiActions.restapiRequest({ newerModifiedon: 0 }))
  yield put(RenpagiActions.renpagiRequest({ newerModifiedon: 0 }))
  yield put(SsdewasaActions.ssdewasaRequest({ newerModifiedon: 0 }))
  yield put(CommentAction.commentRequest({ newerModifiedon: 0 }))
  yield put(ScriptinjectAction.scriptinjectRequest({ newerModifiedon: 0 }))
}
