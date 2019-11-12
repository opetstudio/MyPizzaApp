/*
 * AuthConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const PREAUTHENTICATE_MSISDN = 'PizzaApp/Auth/PREAUTHENTICATE_MSISDN'
export const PREAUTHENTICATE_MSISDN_SUCCESSED =
  'PizzaApp/Auth/PREAUTHENTICATE_MSISDN_SUCCESSED'
export const PREAUTHENTICATE_MSISDN_FAILED =
  'PizzaApp/Auth/PREAUTHENTICATE_MSISDN_FAILED'
export const PREAUTHENTICATE_MSISDN_CANCELLED =
  'PizzaApp/Auth/PREAUTHENTICATE_MSISDN_CANCELLED'

export const SEND_OTP_REQUESTED = 'PizzaApp/Auth/SEND_OTP_REQUESTED'
export const SEND_OTP_SUCCESSED = 'PizzaApp/Auth/SEND_OTP_SUCCESSED'
export const SEND_OTP_FAILED = 'PizzaApp/Auth/SEND_OTP_FAILED'

export const VERIFY_OTP_REQUESTED = 'PizzaApp/Auth/VERIFY_OTP_REQUESTED'
export const VERIFY_OTP_FAILED = 'PizzaApp/Auth/VERIFY_OTP_FAILED'

export const RESET_ERROR = 'PizzaApp/Auth/RESET_ERROR'
export const SET_PROFILE = 'PizzaApp/Auth/SET_PROFILE'
export const CHANGE_LOGGED_IN_STATUS = 'PizzaApp/Auth/CHANGE_LOGGED_IN_STATUS'

export const RESET_IDENTITY = 'PizzaApp/Auth/RESET_IDENTITY'
export const LOGIN_ACTION_FAILED = 'PizzaApp/Auth/LOGIN_ACTION_FAILED'
export const LOGOUT = 'PizzaApp/Auth/LOGOUT'

export const RENEW_AUTH = 'PizzaApp/Auth/RENEW_AUTH'

export const SAVE_PREFERENCES = 'PizzaApp/Auth/SAVE_PREFERENCES'

export const PREFERENCES_FETCH_REQUESTED =
  'PizzaApp/Auth/PREFERENCES_FETCH_REQUESTED'
export const PREFERENCES_FETCH_SUCCEEDED =
  'PizzaApp/Auth/PREFERENCES_FETCH_SUCCEEDED'
export const PREFERENCES_FETCH_FAILED =
  'PizzaApp/Auth/PREFERENCES_FETCH_FAILED'

export const GENRES_POPUP_SAVE_REQUESTED =
  'PizzaApp/Auth/GENRES_POPUP_SAVE_REQUESTED'

export const PREFERENCES_SAVE_REQUESTED =
  'PizzaApp/Auth/PREFERENCES_SAVE_REQUESTED'
export const PREFERENCES_SAVE_SUCCEEDED =
  'PizzaApp/Auth/PREFERENCES_SAVE_SUCCEEDED'
export const PREFERENCES_SAVE_FAILED = 'PizzaApp/Auth/PREFERENCES_SAVE_FAILED'
export const LOGIN_COMPLETE = 'PizzaApp/Auth/LOGIN_COMPLETE'
export const SET_LOADING = 'PizzaApp/Auth/SET_LOADING'
export const LOGIN_WITH_SOCIAL_ACCOUNT =
  'PizzaApp/Auth/LOGIN_WITH_SOCIAL_ACCOUNT'
export const CONNECT_SOCIAL_ACCOUNT = 'PizzaApp/Auth/CONNECT_SOCIAL_ACCOUNT'
export const COMPLETE_SIGNUP = 'PizzaApp/Auth/COMPLETE_SIGNUP'
export const START_SIGNUP = 'PizzaApp/Auth/START_SIGNUP'
export const START_LOGIN = 'PizzaApp/Auth/START_LOGIN'
export const RESET_LOADING = 'PizzaApp/Auth/RESET_LOADING'
export const DISCONNECT_SOCIAL_ACCOUNT =
  'PizzaApp/Auth/DISCONNECT_SOCIAL_ACCOUNT'
export const SET_LOGIN_FROM_PACKAGE = 'PizzaApp/Auth/SET_LOGIN_FROM_PACKAGE'

export const SET_CONCURRENCYID = 'PizzaApp/Auth/SET_CONCURRENCYID'
export const SET_KICKED = 'PizzaApp/Auth/SET_KICKED'
export const UPDATE_LOCK_TICK = 'PizzaApp/Auth/UPDATE_LOCK_TICK'

export const WRITE_ACCESS_CODE = 'PizzaApp/Auth/WRITE_ACCESS_CODE'
export const SUBSCRIPTION_FETCH_SUCCEEDED =
  'PizzaApp/Auth/SUBSCRIPTION_FETCH_SUCCEEDED'
export const SUBSCRIPTION_FETCH_FAILED =
  'PizzaApp/Auth/SUBSCRIPTION_FETCH_FAILED'
export const RESET_SUBSCRIPTION = 'PizzaApp/Auth/RESET_SUBSCRIPTION'

export const ACCESS_RIGHT_ANONYMOUS = 1
export const ACCESS_RIGHT_TSEL = 2
export const ACCESS_RIGHT_LOGIN_NO_UPCC = 4
export const ACCESS_RIGHT_LOGIN_UPCC = 8
export const ACCESS_RIGHT_TSEL_LOGIN_NO_UPCC = 16
export const ACCESS_RIGHT_TSEL_LOGIN_UPCC = 32

export const ALL_ACCESS =
  ACCESS_RIGHT_ANONYMOUS +
  ACCESS_RIGHT_TSEL +
  ACCESS_RIGHT_LOGIN_NO_UPCC +
  ACCESS_RIGHT_LOGIN_UPCC +
  ACCESS_RIGHT_TSEL_LOGIN_NO_UPCC +
  ACCESS_RIGHT_TSEL_LOGIN_UPCC
