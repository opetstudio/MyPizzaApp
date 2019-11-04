export const create = api => ({
  signupRequest: (data, opt) => {
    console.log('[forgotPassApi] data=', data)
    const resp = api.post('/user/doLogin', data)
    return resp
  }
})
