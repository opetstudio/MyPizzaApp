const http = require('http')
// const WebSocket = require('ws')
const WebSocket = require('websocket')
const W3cwebsocket = WebSocket.w3cwebsocket
// const wss = new WebSocket.Server({ port: 3000 })
const WebSocketServer = WebSocket.server
const webSocketsServerPort = 3000

// Spinning the http server and the websocket server.
// Spinning the http server and the websocket server.
const server = http.createServer()
server.listen(webSocketsServerPort)
const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
})
const originIsAllowed = (origin) => {
  // put logic here to detect whether the specified origin is allowed.
  return true
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// I'm maintaining all active connections in this object
const clients = {}
// I'm maintaining all active users in this object
const users = {}
// The current editor content is maintained here.
let editorContent = null
// User activity history.
let userActivity = []

const sendMessage = (json) => {
    // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json)
  })
}

let socket = null

let connectToMgm = (cb) => {
  // socket = new W3cwebsocket('wss://10.1.2.130:13472/Webapp10/endpoint')
  socket = new W3cwebsocket('wss://10.1.2.130:13472/Webapp11/endpoint')
  socket.onopen = (e) => {
    console.log('mgmclient open websocket connection success.')
  //   console.log('on open e=', e)
  //   socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}))
    if (cb) cb()
  }
  socket.onerror = (err) => {
    console.log('mgmclient on error err=', err)
  }
  socket.onmessage = (msg) => {
    console.log('mgmclient on message=', msg.data)
    sendMessage(JSON.stringify(msg.data))
  }
}

var sendToMGM = (msg) => {
  console.log('mgmclient send message to mgm. msg=', msg)
  console.log('mgmclient send message to mgm. msg=', socket.connected)
  if (!socket.connected) {
    connectToMgm(function () {
      socket.send(msg)
    })
  } else {
    socket.send(msg)
  }
}
connectToMgm()

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4()
}

const typesDef = {
  USER_EVENT: 'userevent',
  CONTENT_CHANGE: 'contentchange'
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject()
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
    return
  }
  var userID = getUniqueID()
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.')
    // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin)
  console.log((new Date()) + ' Connection accepted.')
  clients[userID] = connection
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
  connection.on('message', function (message) {
    console.log('on message from client. message=', message)
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data)
    //   const json = { type: dataFromClient.type }
    //   if (dataFromClient.type === typesDef.USER_EVENT) {
    //     users[userID] = dataFromClient
    //     userActivity.push(`${dataFromClient.username} joined to edit the document`)
    //     json.data = { users, userActivity }
    //   } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    //     editorContent = dataFromClient.content
    //     json.data = { editorContent, userActivity }
    //   }
    //   sendMessage(JSON.stringify(json))
      sendToMGM(JSON.stringify(dataFromClient))
      sendMessage(JSON.stringify(dataFromClient))
    } else {
      console.log('error. messge typ not utf8')
    }
  })

// user disconnected
  connection.on('close', function (connection) {
    console.log((new Date()) + ' Peer ' + userID + ' disconnected.')
    const json = { type: typesDef.USER_EVENT }
    userActivity.push(`${users[userID].username} left the document`)
    json.data = { users, userActivity }
    delete clients[userID]
    delete users[userID]
    sendMessage(JSON.stringify(json))
  })
})

// const hostname = '127.0.0.1'
// const port = 3000

// wss.on('connection', ws => {
//   console.log('on connection from client')
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//     // socket.send(message)
//     sendToMGM(message)
//   })
// //   ws.send('ho!')
//   var sendToClient = (msg) => {
//     ws.send(msg)
//   }
//   socket.onmessage = (msg) => {
//     console.log('on message', msg)
//     sendToClient(msg)
//   }
// })

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World!\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })
