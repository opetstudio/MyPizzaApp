import { StyleSheet } from 'react-native'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundDark,
    // backgroundColor: Colors.darkNavyBluePrimary,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingHorizontal: 16
  }
})

export const overlayStyle = {
  container: {
    backgroundColor: Colors.darkNavyBluePrimary,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 5
  }
}
