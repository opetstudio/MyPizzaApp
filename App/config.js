import Config from 'react-native-config'

export default {
  analytics: {
    /*
     * https://github.com/idehub/react-native-google-analytics-bridge
     * <- Google Analytics Library being used
     * Basic class to provide google analytics support.
     */
    dryRun: false,
    trackerId: Config.TRACKERID,
    // In GA Dashboard custom Dimension is called
    // 'UserID' and its index there is '1'
    // so from code we send 'UserID', which relates to
    // custom dimension at index 1 in GA dashboard (i.e. UserID)
    userIdDimension: Config.USERID_DIMENSION
  },
  adjust: {
    appToken: Config.ADJUST_APP_TOKEN
  },
  auth0: {
    clientId: Config.AUTH0_CLIENT_ID,
    host: Config.AUTH0_HOST
  },
  api: {
    // api host is the local IP address of your laptop
    // will change one we have reverse proxy setup done for nodejs server
    host: Config.API_URL
  },
  timeout: {
    query: Config.QUERY_TIMEOUT
  },
  mobileAppConfig: {
    sharedKey: Config.SHARED_KEY_WITH_SERVER
  },
  envName: Config.NODE_ENV || 'development'
}

export const localesInApp = [
  {
    name: 'Bahasa',
    i18nKey: 'langauge-bahasa',
    locale: 'id'
  },
  {
    name: 'English',
    i18nKey: 'langauge-english',
    locale: 'en'
  }
]

export const trendingTimer = 5000 // 5 secs

export const navigateToPreferencesTimer = 15000 // 15 secs

export const defaultLocale = 'id'

export const filterStartYear = 1930

export const maxBackgroundTime = 3600000 // 1 hour

export const defaultTime = 900000 // 15 mins

export const appStoreLink = 'https://itunes.apple.com/id/app/id1355624643'

export const playStoreLink =
  'https://play.google.com/store/apps/details?id=com.maxstream'
