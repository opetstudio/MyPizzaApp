import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import AppConfig from '../Config/AppConfig'
import { AsyncStorage } from 'react-native'

var socketClient = null

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  websocketSetup: ['data'],
  disconnectSuccess: null,
  connectionSuccess: ['data'],
  incomingEvent: ['data'],
  connectionError: ['data']
})

export const WebsocketTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  client: null,
  connectionSuccess: false
})

/* ------------- Selectors ------------- */

export const WebsocketSelectors = {
  getClient: state => state.client,
  getSocketClient: state => socketClient
}

/* ------------- Reducers ------------- */

export const websocketSetup = (state, action) => {
  console.log('[WebsocketRedux] websocketSetup', action)
  // const { data } = action
  // let client = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
  // client.onopen = (e) => {
  //   console.log('websocket client on open e=', e)
  //   socketClient = client
  //   // AsyncStorage.setItem('SOCKET_CLIENT', client)
  //   // client.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}))
  // }
  // client.onmessage = (e) => {
  //   console.log('on message', e)
  // }
  // client.onerror = (err) => {
  //   console.log('on error err=', err)
  //   socketClient = null
  //   // AsyncStorage.setItem('SOCKET_CLIENT', null)
  // }
  // client.onclose = () => {
  //   console.log('websocket client on close')
  //   socketClient = null
  //   client = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
  // }
  return state
  // return state.merge({client})
}
export const disconnectSuccess = state => {
  console.log('disconnectSuccess')
  return state
}
export const connectionSuccess = (state, action) => {
  console.log('connectionSuccess. action=', action)
  // state.client = action.data
  socketClient = action.data
  return state.merge({'connectionSuccess': true, client: 'exist'})
}
export const incomingEvent = (state, action) => {
  console.log('incomingEvent')
  return state
}
export const connectionError = (state, action) => {
  console.log('connectionError err=', action.data)
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEBSOCKET_SETUP]: websocketSetup,
  [Types.DISCONNECT_SUCCESS]: disconnectSuccess,
  [Types.CONNECTION_SUCCESS]: connectionSuccess,
  [Types.INCOMING_EVENT]: incomingEvent,
  [Types.CONNECTION_ERROR]: connectionError
})
