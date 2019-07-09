/**
 * The auth state selectors
 */
import { createSelector } from 'reselect'
import { includes } from 'lodash'

const selectAuth = state => state.get('auth')

const selectStatus = () =>
  createSelector(selectAuth, auth => auth.get('status'))

const selectLoadingMobile = () =>
  createSelector(
    selectAuth,
    auth =>
      auth.get('loadingSend') ||
      auth.get('loadingPreauntheticate') ||
      auth.get('loadingVerify')
  )

const selectIsLoginCompleted = () =>
  createSelector(selectAuth, auth => auth.get('isLoginCompleted'))

const selectLoadingOTP = () =>
  createSelector(
    selectAuth,
    auth =>
      auth.get('loadingVerify') ||
      auth.get('loadingSend') ||
      auth.get('loadingPreferences') ||
      auth.get('loadingVerifyOTP')
  )

const selectError = () =>
  createSelector(selectAuth, auth => auth.get('error').toJS())

const selectProfile = () =>
  createSelector(selectAuth, auth => auth.get('profile').toJS())

const selectPreferences = () =>
  createSelector(selectAuth, auth => auth.get('preferences'))

const selectGenrePreferences = () =>
  createSelector(
    selectPreferences(),
    (prefs = {}) => (prefs && prefs.toJS ? prefs.toJS()['genre'] : prefs.genre)
  )

const selectLikedVideos = () =>
  createSelector(selectPreferences(), (prefs = {}) => {
    return prefs && prefs.toJS
      ? prefs.toJS()['likedVideos']
      : prefs.likedVideos
  })

const selectNavParamsId = (_, ownProps) =>
  ownProps && ownProps.navigation.state.params.contentId

const selectIsVideoLiked = () =>
  createSelector(
    selectLikedVideos(),
    selectNavParamsId,
    (likedVideos, contentId) => includes(likedVideos, contentId)
  )

const selectPreferencesLoading = () =>
  createSelector(selectAuth, auth => auth.get('loadingPreferences'))

const selectLoadingSocialAccount = () =>
  createSelector(selectAuth, auth => auth.get('loadingSocialAccount'))

const selectIsSigningUp = () =>
  createSelector(selectAuth, auth => auth.get('isSigningUp'))

const selectIsLoginFromPackage = () =>
  createSelector(selectAuth, auth => auth.get('isLoginFromPackage'))

const selectIsKicked = () =>
  createSelector(selectAuth, auth => auth.get('isKicked'))

const selectConcurrencyId = () =>
  createSelector(selectAuth, auth => auth.get('concurrencyId'))

const selectAccessCode = () =>
  createSelector(selectAuth, auth => auth.get('accessCode'))

const selectSubscriptions = () =>
  createSelector(selectAuth, auth => auth.get('subscriptions'))

export {
  selectAccessCode,
  selectAuth,
  selectError,
  selectGenrePreferences,
  selectIsLoginCompleted,
  selectIsSigningUp,
  selectIsVideoLiked,
  selectLikedVideos,
  selectLoadingMobile,
  selectLoadingOTP,
  selectLoadingSocialAccount,
  selectPreferences,
  selectPreferencesLoading,
  selectProfile,
  selectStatus,
  selectSubscriptions,
  selectIsLoginFromPackage,
  selectConcurrencyId,
  selectIsKicked
}
