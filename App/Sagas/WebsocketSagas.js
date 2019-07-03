import { put, select, call, take, delay, apply, fork, cancelled, cancel, cps } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import WebsocketActions, { WebsocketSelectors } from '../Redux/WebsocketRedux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import AppConfig from '../Config/AppConfig'

function socketConnection () {
  return new Promise((resolve, reject) => {
    // cb(null, 'ok')
    // new Promise(() => {
    const socket = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
    // const socket = new WebSocket("ws://localhost:1555");
    socket.onopen = function () {
      console.log('socket onopen =====')
      resolve(socket)
    }
    socket.onerror = function (evt) {
      console.log('socket onerror =====', evt)
      reject(evt)
    }
  })
}

async function createWebSocketConnection () {
  // Wrapping you function into a promise
  const socket = await socketConnection()
  return socket
}

function createSocketChannel (socket) {
  return eventChannel(emitter => {
    socket.onmessage = (event) => {
      console.log('websocket client onmessage ', event)
      emitter(event.data)
    }
    socket.onclose = () => {
      emitter(END)
    }
    const unsubscribe = () => {
      socket.onmessage = null
    }
    return unsubscribe
    // client.onmessage = (e) => {
    //   console.log('on message', e)
    // }
    // client.onerror = (err) => {
    //   console.log('on error err=', err)
    //   emitter(null)
    // }
    // client.onclose = () => {
    //   console.log('websocket client on close')
    //   // setupSocket()
    // }
    // const unsubscribe = () => {
    //   // socket.off('ping', pingHandler)
    // }
    // return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function * pong (socket) {
  console.log('in 5 seconds, send pong')
  // yield delay(5000)
  // yield apply(socket, socket.send, ['pong']) // call `emit` as a method with `socket` as context
}

function * listenForSocketMessages () {
  let socket
  let socketChannel

  try {
    socket = yield call(createWebSocketConnection)
    console.log('teeesssssss===========socket=', socket)
    socketChannel = yield call(createSocketChannel, socket)

    // tell the application that we have a connection
    console.log('connection success=====')
    yield put(WebsocketActions.connectionSuccess(socket))
    while (true) {
      // wait for a message from the channel
      console.log('wait for incoming websocket message')
      const payload = yield take(socketChannel)

      // a message has been received, dispatch an action with the message payload
      console.log('a message has been received, dispatch an action with the message payload = ', payload)
      yield put(WebsocketActions.incomingEvent(payload))
      yield fork(pong, socket)
    }
  } catch (error) {
    console.log('error===>', error)
    yield put(WebsocketActions.connectionError('Error while connecting to the WebSocket'))
  } finally {
    if (yield cancelled()) {
      console.log('close the channel')
      // socketChannel.close()

      // close the WebSocket connection
      // socket.close()
    } else {
      console.log('WebSocket disconnected')
      yield put(WebsocketActions.connectionError('WebSocket disconnected'))
    }
  }
}

export function * websocketSetup (action) {
  console.log('[WebsocketSagas] websocketSetup action=', action)
  const { data } = action
  // yield put(WebsocketActions.websocketSetup(data))
  // starts the task in the background
  const socketTask = yield fork(listenForSocketMessages)
  console.log('test2')

  // when DISCONNECT action is dispatched, we cancel the socket task
  // yield take(LiveDataTypes.DISCONNECT)
  // yield cancel(socketTask)
  // yield put(WebsocketActions.disconnectSuccess())

  // yield put(WebsocketActions.websocketSetup(socketClient))
  // yield put(action)

  // while (true) {
  //   try {
  //     // An error from socketChannel will cause the saga jump to the catch block
  //     const payload = yield take(socketChannel)
  //     yield put({ type: 'INCOMING_PONG_PAYLOAD', payload })
  //     yield fork(pong, socket)
  //   } catch (err) {
  //     console.error('socket error:', err)
  //     // socketChannel is still open in catch block
  //     // if we want end the socketChannel, we need close it explicitly
  //     // socketChannel.close()
  //   }
  // }

  // if (test === 'ok') yield put(WebsocketActions.websocketSetup())

  // const setupSocket = () => {
  //   let client = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
  //   client.onopen = (e) => {
  //     console.log('websocket client on open e=', e)
  //   }
  //   client.onmessage = (e) => {
  //     console.log('on message', e)
  //   }
  //   client.onerror = (err) => {
  //     console.log('on error err=', err)
  //   }
  //   client.onclose = () => {
  //     console.log('websocket client on close')
  //     setupSocket()
  //   }
  // }
  // setupSocket()
}
