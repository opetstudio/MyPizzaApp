import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  errorTextStyle: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'red'
  },
  zeroHorizontalPadding: {
    paddingHorizontal: 0
  },
  container: {
    paddingHorizontal: 16,
    flex: 1
  }
})
