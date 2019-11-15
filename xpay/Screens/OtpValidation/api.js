// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {generateHmac} from '../../Lib/Utils'

export const create = api => ({
  otpvalidationFormSubmit: (data) => {
    api.setHeader('mac', generateHmac(JSON.stringify(body)))
    const resp = api.post('/plink/login', {})
    return resp
  }
})
