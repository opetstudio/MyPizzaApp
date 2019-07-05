import { isEmpty, isUndefined, get, find } from 'lodash'
import { textMessage } from './languageSelector'
import { Platform } from 'react-native'
import {
  ACCESS_RIGHT_TSEL,
  ACCESS_RIGHT_LOGIN_UPCC,
  ACCESS_RIGHT_TSEL_LOGIN_NO_UPCC,
  ACCESS_RIGHT_LOGIN_NO_UPCC,
  ALL_ACCESS
} from '../../Containers/Auth/constants'

import { getCurrentTimestamp } from './dateHelper'

export function getSeasonsText (seasons) {
  if (isEmpty(seasons)) {
    return `${textMessage('content-season')} 01`
  }
  return `${textMessage('content-season')} ${seasons}`
}

export function getEpisodeText (episodes) {
  if (isEmpty(episodes)) {
    return ''
  }
  return `${episodes} ${textMessage('content-episodes')} `
}

export function truncateTextLength (title, maxLength = 15) {
  const titleLength = title.length

  if (titleLength > maxLength) {
    return `${title.substring(0, maxLength)}...`
  }
  return title
}

export function getMatchStatus (startTime, endTime, providerName) {
  const currentTS = getCurrentTimestamp('seconds')

  if (!startTime || !endTime) {
    return 'none'
  }

  if (currentTS >= startTime && currentTS < endTime) {
    return 'live'
  }

  if (providerName !== 'MAXstream') {
    if (currentTS < startTime) {
      return 'upcoming'
    }
    if (currentTS > startTime && currentTS > endTime) {
      return 'replay'
    }
  }

  return 'none'
}

export const getContentProviderName = (content, providers) => {
  if (content && providers && !isUndefined(content.providerId)) {
    const providerName = get(
      find(providers, { tid: content.providerId }),
      'name',
      ''
    )
    return providerName
  } else {
    return null
  }
}

export const isFree = contentAccess => {
  return contentAccess === ALL_ACCESS || !contentAccess
};

const accessCodePreProcess = (userAccess, contentAccess) => {
  const NUM_OF_DIGITS = 6
  const padDigits = binaryStr => {
    return `000000${binaryStr}`.slice(NUM_OF_DIGITS * -1)
  };

  let contentBiStr = (contentAccess >>> 0).toString(2)
  let userBiStr = (userAccess >>> 0).toString(2)

  contentBiStr = padDigits(contentBiStr)
  userBiStr = padDigits(userBiStr)

  return { userBiStr, contentBiStr }
};

export const constructMessage = (contentAccess, lack) => {
  if (!lack || isEmpty(lack)) {
    // Empty means user is entitled
    return null
  }

  let connector = textMessage('entitlement-and')
  let connectedArray = lack.map(item => textMessage(item))

  // Special case for Tsel Network OR Login + UPCC (001010)
  if (contentAccess === ACCESS_RIGHT_TSEL + ACCESS_RIGHT_LOGIN_UPCC) {
    // user is anonymous
    if (lack.length === 3) {
      connectedArray = [
        connectedArray.slice(0, 2).join(textMessage('entitlement-or')),
        connectedArray[2]
      ]
    }

    // user is logged in but no UPCC
    if (lack.length === 2) {
      connector = textMessage('entitlement-or')
    }
  }

  // Special case for Tsel Network OR Login (000110)
  if (
    contentAccess === ACCESS_RIGHT_TSEL + ACCESS_RIGHT_LOGIN_NO_UPCC &&
    lack.length === 2
  ) {
    connector = textMessage('entitlement-or')
  }

  // Special case for Login + UPCC OR Login + Tsel Network (011000)
  if (
    contentAccess ===
    ACCESS_RIGHT_LOGIN_UPCC + ACCESS_RIGHT_TSEL_LOGIN_NO_UPCC
  ) {
    // user is anonymous
    if (lack.length === 4) {
      connectedArray = [
        connectedArray.slice(0, 2).join(connector),
        connectedArray.slice(2).join(connector)
      ]
      connector = textMessage('entitlement-or')
    }
    // user is logged in
    if (lack.length === 2) {
      connector = textMessage('entitlement-or')
    }
  }

  if (connectedArray.length > 2) {
    connectedArray = [
      connectedArray.slice(0, -1).join(', '),
      connectedArray[connectedArray.length - 1]
    ]
  }

  return connectedArray.join(connector)
};

// For details for digit, check https://accedobroadband.jira.com/wiki/spaces/TELKOMSEL/pages/535462285/User+Entitlement
export const checkLackConditions = (userAccess, contentAccess) => {
  // Free content
  if (isFree(contentAccess)) {
    return []
  }

  let lack = []
  const { userBiStr, contentBiStr } = accessCodePreProcess(
    userAccess,
    contentAccess
  )
  const isZero = char => char === '0'
  const checkNetworkAndLogin = (biStr, level) => {
    // user don't have Tsel network
    if (level > 1 && isZero(biStr[4])) {
      lack.push('entitlement-network')
    }
    // user don't login
    if (level > 0 && isZero(biStr[3])) {
      lack.push('entitlement-login')
    }
    // user don't have UPCC
    if (level > 2 && isZero(biStr[2])) {
      lack.push('entitlement-package')
    }
  }

  for (let i = contentBiStr.length - 2; i >= 0; i--) {
    // No need to compare if the content digit is 0
    if (contentBiStr[i] === '0') {
      continue
    }
    // User satisfied with one of the conditions
    if (contentBiStr[i] === userBiStr[i]) {
      return []
    }
    // Rule 5 - Tsel Network is needed
    if (i === 4) {
      lack.push('entitlement-network')
    }
    // Rule 4 Login is needed
    if (i === 3) {
      lack.push('entitlement-login')
    }
    // Rule 3 - Login + UPCC is needed
    if (i === 2) {
      checkNetworkAndLogin(userBiStr, 1)
      lack.push('entitlement-package')
    }
    // Rule 2 - Tsel Network + Login is needed
    if (i === 1) {
      checkNetworkAndLogin(userBiStr, 2)
    }
    // Rule 1 - Tsel Network + Login + UPCC
    if (i === 0) {
      checkNetworkAndLogin(userBiStr, 3)
    }
  }

  // Special case for Tsel Network + Login (000110)
  if (
    contentAccess === ACCESS_RIGHT_TSEL + ACCESS_RIGHT_LOGIN_NO_UPCC &&
    lack.length === 1
  ) {
    lack = []
  }

  // Special case for Login + UPCC or Login + Tsel Network (011000)
  if (
    contentAccess ===
    ACCESS_RIGHT_LOGIN_UPCC + ACCESS_RIGHT_TSEL_LOGIN_NO_UPCC
  ) {
    // user is in Tsel Networki
    if (lack.length === 3) {
      lack = [lack[0]]
    } else if (lack.length === 1) {
      // user is logged in + UPCC
      lack = []
    }
  }

  return lack
};

export const checkEntitled = (userAccess, contentAccess) => {
  return isEmpty(checkLackConditions(userAccess, contentAccess))
};

export const isNetworkOnly = lack => {
  return lack && lack.length === 1 && lack[0] === 'entitlement-network'
};

export const isSubscribed = lack => {
  return lack && find(lack, 'entitlement-package')
};

export const isNetworkRequired = (userAccess, contentAccess) => {
  if (isFree(contentAccess)) {
    return false
  }

  const { userBiStr, contentBiStr } = accessCodePreProcess(
    userAccess,
    contentAccess
  )
  const userEntitled = userBiStr.indexOf('1')
  const entitledByLoginOnly = userEntitled === 2 || userEntitled === 3
  const entitledByTsel = userEntitled === 4 || userEntitled === 1

  switch (contentBiStr.indexOf('1')) {
    case 0: // All access
    case 4: // Tsel only
      return true
    case 1: // Tsel + login
      // check for Tsel + login OR login + upcc
      if (contentBiStr[3] === '1' && entitledByLoginOnly) {
        // user is entitled by logged in
        return false
      }
      return true
    case 2: // login + upcc
    case 3: // login
      // check for Tsel OR login
      if (contentBiStr[4] === '1' && entitledByTsel) {
        // user is entitled by connect with Tsel network only
        return true
      }
      return false
    default:
      return false
  }
}

/* sample json availabe in https://accedobroadband.jira.com/wiki/spaces/TELKOMSEL/pages/456557729/Model+Object */
export const navigateToPlayer = (
  content,
  navigation,
  userAccessCode,
  errorHandling,
  isDeeplink = false
) => {
  try {
    const streamObj = JSON.parse(content.deeplink_url_ios)
    const embedded = streamObj.embedded
    const showType = content.showType
    let param = {}

    if (embedded) {
      param = {
        url: embedded.url,
        content: content,
        isEmbedded: true,
        fixLandscape: !(embedded.orientation === 'portrait'),
        isDeeplink,
        showType,
        userAccessCode
      }
    } else {
      const playerSetting = streamObj[Platform.OS]
      const { url, assetId } = playerSetting
      param = {
        url: url,
        content: content,
        drmAssetID: assetId,
        fixLandscape: true,
        isDeeplink,
        showType,
        userAccessCode
      }
    }

    navigation.navigate('VideoPlayerFullScreen', param)
  } catch (e) {
    console.log(e)
    if (typeof errorHandling === 'function') {
      errorHandling()
    }
  }
}

export const isInAppPlayback = deeplink => {
  try {
    JSON.parse(deeplink)
  } catch (error) {
    return false
  }
  return true
};
