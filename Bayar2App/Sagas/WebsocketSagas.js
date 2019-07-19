import { put, call, take, fork, cancelled } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import WebsocketActions from '../Redux/WebsocketRedux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import AppConfig from '../Config/AppConfig'

function socketConnection () {
  return new Promise((resolve, reject) => {
    const socket = new W3CWebSocket(AppConfig.websocketEndpoin.server1)
    // const socket = new WebSocket("ws://localhost:1555");
    socket.onopen = function () {
      resolve(socket)
    }
    socket.onerror = function (evt) {
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
      emitter(event.data)
    }
    socket.onclose = () => {
      emitter(END)
    }
    const unsubscribe = () => {
      socket.onmessage = null
    }
    return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function * pong (socket) {
  console.log('in 5 seconds, send pong')
  // yield apply(socket, socket.send, ['pong']) // call `emit` as a method with `socket` as context
}

function * listenForSocketMessages () {
  let socket
  let socketChannel

  try {
    socket = yield call(createWebSocketConnection)
    socketChannel = yield call(createSocketChannel, socket)
    // tell the application that we have a connection
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
}
