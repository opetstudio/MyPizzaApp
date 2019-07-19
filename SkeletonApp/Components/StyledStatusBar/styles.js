import { StyleSheet, StatusBar } from 'react-native'
import { isIos, isIphoneX } from '../../Lib/helper/platform'

const STATUSBAR_HEIGHT = isIos
  ? isIphoneX
    ? 44
    : 20
  : StatusBar.currentHeight

export const styles = StyleSheet.create({
  statusBar: { height: STATUSBAR_HEIGHT }
})

export default styles
