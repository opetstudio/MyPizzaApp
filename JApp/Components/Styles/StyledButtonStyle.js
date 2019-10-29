import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10
  },
  primary: {
    backgroundColor: Colors.colorPrimary,
    flex: 1
  },
  primaryInactive: {
    backgroundColor: Colors.bluePrimaryOpacity,
    flex: 1
  },
  secondary: {
    backgroundColor: Colors.darkNavyBlueSecondary,
    borderColor: Colors.colorPrimary,
    borderWidth: 1,
    flex: 1
  },
  secondaryInactive: {
    backgroundColor: Colors.darkNavyBluePrimaryOpacity2,
    borderColor: Colors.bluePrimaryOpacity,
    flex: 1
  }
})
