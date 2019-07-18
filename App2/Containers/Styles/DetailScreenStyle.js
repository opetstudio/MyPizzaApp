import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen
})

export const tabNavigationStyles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: Colors.redPrimary,
    height: 2,
    width: Metrics.screenWidth / 2
  },
  labelStyle:
    Metrics.screenWidth <= 320 ? Fonts.style.h13MedWhiteT.style : Fonts.style.h11MedWhiteT.style,
  style: {
    backgroundColor: Colors.colorPrimaryDark
  },
  container: {
    flex: 1,
    backgroundColor: Colors.colorPrimaryDark
  }
})
