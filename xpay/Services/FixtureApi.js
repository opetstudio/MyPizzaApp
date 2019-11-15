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
  sessionLogin: (data) => {
    return {
      ok: true,
      data: require('../Fixtures/sessionLogin.json')
    }
  },
  sessionLogout: (data) => {
    return {
      ok: true,
      data: require('../Fixtures/sessionLogout.json')
    }
  },
  otpvalidationFormSubmit: (data) => {
    return {
      ok: true,
      data: {
        responseCode: '00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS'
      }
    }
  },
  addcardFormSubmit: (data) => {
    return {
      ok: true,
      data: {
        responseCode: '00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS'
      }
    }
  }
}
