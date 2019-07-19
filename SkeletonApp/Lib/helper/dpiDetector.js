import { PixelRatio } from 'react-native'

/**
 *  This helper class uses pixel ratio to create
 *  mapping dpi to ldpi or mdpi etc.
 *
 */

export function dpiDetector () {
  const dpi = Math.round(PixelRatio.get())

  if (dpi === 1) {
    return 'mdpi'
  }
  if (dpi === 1.5) {
    return 'hdpi'
  }

  if (dpi === 2) {
    return 'xhdpi'
  }

  if (dpi === 3) {
    return 'xxhdpi'
  }

  if (dpi === 4) {
    return 'xxhdpi'
  }
  return 'mdpi'
}
