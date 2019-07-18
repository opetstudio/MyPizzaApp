// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const getRestapi = ({ newerModifiedon }) => api.get('getRestapi', { newerModifiedon })
  const getComment = ({ newerModifiedon }) => api.get('getComment', { newerModifiedon })
  const postSessionRegServer = ({ currentUser }) => api.post('postSessionRegServer', { currentUser })
  const getRenpagi = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    __DEV__ && console.log('baseUrl=', api.getBaseURL())
    return api.get(apiName || 'getRenpagi', { newerModifiedon })
  }
  const getMovie = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    __DEV__ && console.log('baseUrl=', api.getBaseURL())
    return api.get(apiName || 'getMovie', { newerModifiedon })
  }
  const getTv = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || 'getTv', { newerModifiedon })
  }
  const getTvDetail = ({ id, lang }) => api.get('getTvDetail', { id, lang })
  const getBook = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    __DEV__ && console.log('baseUrl=', api.getBaseURL())
    return api.get(apiName || 'getBook', { newerModifiedon })
  }
  const getMovieSubtitle = ({ id, lang }) => {
    // if (baseUrl) api.setBaseURL(baseUrl)
    // __DEV__ && console.log('baseUrl=', api.getBaseURL())
    return api.get('getMovieSubtitle', { id, lang })
  }
  const getSsdewasa = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || 'getSsdewasa', { newerModifiedon })
  }
  const postComment = (data) => api.post('postComment', data)
  const postUser = (data) => api.post('postUser', data)
  const getListUser = (data) => api.get('getListUser', data)
  const getRadio = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || 'getRadio', { newerModifiedon })
  }
  const getRadioDetail = ({ id, lang }) => api.get('getRadioDetail', { id, lang })
  const getPowerpoint = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || 'getPowerpoint', { newerModifiedon })
  }
  const getPowerpointDetail = ({ id, lang }) => api.get('getPowerpointDetail', { id, lang })
  const getScriptinject = ({ apiName, baseUrl, newerModifiedon }) => {
    if (baseUrl) api.setBaseURL(baseUrl)
    return api.get(apiName || 'getScriptinject', { newerModifiedon })
  }
  const getScriptinjectDetail = ({ id, lang }) => api.get('getScriptinjectDetail', { id, lang })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getRestapi,
    getRenpagi,
    getSsdewasa,
    postSessionRegServer,
    getcomment: getComment,
    postComment,
    postUser,
    getListUser,
    getMovie,
    getMovieSubtitle,
    getBook,
    getTv,
    getTvDetail,
    getRadio,
    getRadioDetail,
    getPowerpoint,
    getPowerpointDetail,
    getScriptinject,
    getScriptinjectDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}
