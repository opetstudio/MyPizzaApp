import { Platform } from 'react-native'

export const insertSpace = (string, count = 4) => {
  if (Platform.OS === 'android' && typeof string === 'string') {
    return string.split('').join('\u200A'.repeat(count))
  }
  return string
}
export const isAndroid = () => (Platform.OS === 'android')
