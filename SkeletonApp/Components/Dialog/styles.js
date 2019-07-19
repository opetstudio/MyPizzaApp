import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

const colors = Colors

export default StyleSheet.create({
  header: {
    color: colors.banner
  },
  message: {
    color: colors.greyPrimary,
    paddingVertical: 16
  },
  imageBody: {
    color: colors.facebook,
    paddingTop: 27
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 32
  },
  largeButton: {
    width: 120
  },
  smallButton: {
    width: 100
  },
  buttonAddedStyle: {
    paddingVertical: 5,
    backgroundColor: 'transparent'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignSelf: 'stretch'
  },
  centerButton: {
    justifyContent: 'center'
  },
  spaceBetweenButton: {
    justifyContent: 'space-between'
  },
  highlightedButtonStyle: {
    paddingVertical: 6,
    justifyContent: 'center'
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 27
  }
})

export const modalStyle = {
  modalBody: {
    backgroundColor: colors.colorPrimaryDark,
    alignItems: 'flex-start',
    padding: 16
  },
  modalContainer: {
    backgroundColor: colors.blackOpacity
  }
}
