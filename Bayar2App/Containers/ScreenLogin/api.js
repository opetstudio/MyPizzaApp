// import AppConfig from '../../Config/AppConfig'

export const create = api => ({
  loginRequest: (data, opt) => {
    console.log('[LoginApi] loginRequest data=', data)
    const resp = api.post('/user/doLogin', data)
    return resp
  }
})
