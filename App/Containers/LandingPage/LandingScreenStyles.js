import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  banner: {
    height: Metrics.images.large,
    marginLeft: 50,
    marginRight: 50,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
})
