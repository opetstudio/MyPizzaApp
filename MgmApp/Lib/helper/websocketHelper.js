
let websocketClient = null
let endpoint = ''

function setWebsocketClient (connection) {
  websocketClient = connection
}
function getWebsocketClient () {
  return websocketClient
}
function setEndpoint (url) {
  endpoint = url
}
function getEndpoint () {
  return endpoint
}

export default {
  setWebsocketClient,
  getWebsocketClient,
  setEndpoint,
  getEndpoint
}
