// a library to wrap and simplify api calls
import AppConfig from '../Config/AppConfig'
import {generateHmac} from '../Lib/Utils'

export const create = api => ({
  sessionLogin: (data) => {
    console.log('sessionLogin data=', data)
    let body = {email: data.userid, password: data.password}
    console.log('body==>', JSON.stringify(body))
    api.setHeader('mac', generateHmac(JSON.stringify(body)))
    const resp = api.post('/plink/login', {email: data.userid, password: data.password})
    return resp
  },
  sessionLogout: (data, opt) => {
    console.log('sessionLogout invoked')
    api.setHeader('mac', '6905fad8847d8548e225e1701ada9f502741e0f6c3fd68697017e5c06b7ff733')
    api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    return api.get('/plink/logout')
  }
})
