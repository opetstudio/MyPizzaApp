import Moment from 'moment'
import { isEmpty } from 'lodash'
import { textMessage } from './languageSelector'
// import { defaultTime } from '../../config'

export function getDate (ISODate) {
  const date = Moment(ISODate)
  if (date.isValid()) {
    return date.format('DD/MM/YYYY')
  } else {
    return 'n/a'
  }
}

export function getCurrentTimestamp (units) {
  if (units === 'seconds') {
    return new Date().getTime() / 1000
  }
  return new Date().getTime()
}

export function getLongDate (unixTimeStamp) {
  return Moment.unix(unixTimeStamp).format('dddd, DD MMMM YYYY')
}

export function getTime (unixTimeStamp) {
  return Moment.unix(unixTimeStamp).format('HH:mm')
}

export function getCurrentEpochTime () {
  return Moment().unix()
}

export function convertLocalTimeZone (unixTimeStamp) {
  return Moment.unix(unixTimeStamp).format('DD MMM YYYY, HH:mm')
}

export function checkIsCurrentTimeBetween (momentStart, momentEnd) {
  return Moment().isBetween(momentStart, momentEnd)
}

// export function getTimeWithinRange (timestamp) {
//   if (getCurrentTimestamp() - timestamp > defaultTime) {
//     return true
//   }
//   return false
// }

// export function checkTimeout (timestamp, maxTime = defaultTime) {
//   if (getCurrentTimestamp() - timestamp > maxTime) {
//     return true
//   }
//   return false
// }

export function inMinutes (minutes) {
  if (isEmpty(minutes)) {
    return ''
  }
  const result = parseInt(parseInt(minutes) / 60)
  if (isNaN(result) || result === 0) {
    return ''
  }
  return `${result} ${textMessage('content-minutes')}`
}
