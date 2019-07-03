// Simple React Native specific changes

import '../I18n/I18n'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  authHeader: '',
  websocketEndpoin: {
    server1: 'ws://10.0.2.2:3000'
  }
}
