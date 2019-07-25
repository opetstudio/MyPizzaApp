import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  addedStyle: {
    color: 'blue'
  },
  addedTextStyle: {
    color: 'blue'
  },
  container: {
    paddingBottom: Metrics.baseMargin
  },
  centered: {
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    fontSize: 16,
    color: Colors.blackSecondaryOpacity,
    marginBottom: 10
  },
  placeholder: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    fontSize: 16,
    color: Colors.blackSecondaryOpacity
  },
  label: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.blackSecondaryOpacity
  }
})
