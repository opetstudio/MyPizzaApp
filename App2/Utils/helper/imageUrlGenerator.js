import { includes, isEmpty, isUndefined, isNull } from 'lodash'
import { dpiDetector } from './dpiDetector'

/**
 *  This helper uses to generate/extract different types of URL for images
 *  images is an object that accepts following keys:
 *  banner
 *  landscape
 *  portarit
 *  search
 */

const checkIfImageExists = (images, type) => {
  __DEV__ && console.log('ceklagi checkIfImageExists images', images)
  __DEV__ && console.log('ceklagi checkIfImageExists type', type)
  if (
    !(
      isUndefined(images[type]) ||
      isNull(images[type]) ||
      isEmpty(images[type])
    )
  ) {
    return !(
      isUndefined(images[type][dpiDetector()]) ||
      isNull(images[type][dpiDetector()]) ||
      isEmpty(images[type][dpiDetector()])
    )
  }
  return false
}
export function generateImageURL (
  images = {},
  wcmsUrl = '',
  displayType = 'carousel',
  orientation = 'portrait'
) {
  __DEV__ && console.log('generateImageURL images:', images)
  if (isNull(images)) {
    return { url: null }
  }
  let type = images && Object.keys(images)
  if (displayType === 'carousel') {
    if (orientation === 'landscape') {
      type = 'landscapecarousel'
    } else if (includes(type, 'carousel')) {
      type = 'carousel'
    } else if (includes(type, 'landscape')) {
      type = 'landscape'
    } else {
      type = 'portrait'
    }
  } else if (displayType === 'images') {
    const imageUrl = (images && images[dpiDetector()]) || ''
    if (isEmpty(imageUrl)) {
      return { url: null }
    } else {
      const regEx = imageUrl.search(/http/g)
      const url = regEx === 0 ? imageUrl : `${wcmsUrl}${imageUrl}`
      return { url }
    }
  } else if (displayType === 'search') {
    type = 'search'
  } else {
    type = checkIfImageExists(images, 'banner') ? 'banner' : 'carousel'
  }
  __DEV__ && console.log('ceeeeekkkkk type=', type)
  const imageUrl = (images[type] && images[type][dpiDetector()]) || null
  if (isNull(imageUrl)) {
    return { url: null, type }
  }
  const regEx = imageUrl.search(/http/g)
  const url = regEx === 0 ? imageUrl : `${wcmsUrl}${imageUrl}`
  return { url, type }
}
