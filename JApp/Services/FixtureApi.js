export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getRestapi: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getRenpagi: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getSsdewasa: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  postSessionRegServer: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getcomment: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getListUser: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getMovie: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getMovieSubtitle: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getBook: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getTv: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getTvDetail: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getRadio: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getRadioDetail: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getPowerpoint: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getPowerpointDetail: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getScriptinject: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  },
  getScriptinjectDetail: (data) => {
    const restapiDataById = require('../Fixtures/restapi.json')
    return {
      ok: true,
      data: restapiDataById
    }
  }
}
