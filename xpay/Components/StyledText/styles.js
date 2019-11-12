import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

const colors = Colors

export default StyleSheet.create({
  container: {
    flex: 1
  },
  textUnderline: {
    borderColor: colors.fire,
    borderBottomWidth: 1.3,
    width: 21.3,
    paddingVertical: 5
  },
  transparentText: {
    backgroundColor: 'transparent'
  },
  title: {
    textAlign: 'center'
  }
})
