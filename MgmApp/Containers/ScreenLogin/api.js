// import AppConfig from '../../Config/AppConfig'
import WebsocketHelper from '../../Lib/helper/websocketHelper'

export const create = api => ({
  loginRequest: (data, opt) => {
    console.log('[LoginApi] loginRequest data=', data)
    console.log('WebsocketHelper.getWebsocketClient()===>', WebsocketHelper.getWebsocketClient())
    // const resp = api.post('/user/doLogin', data)
    const resp = WebsocketHelper.getWebsocketClient().send(JSON.stringify(data))
    return resp
  }
})
