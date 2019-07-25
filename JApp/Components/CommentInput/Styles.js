import { StyleSheet, Platform } from 'react-native'

const inputHeight = 60

export default StyleSheet.create({
  container: {
    flex: 1
  },
  inputWrapper: {
    flexDirection: 'row',
    height: Math.max(45, (inputHeight)),
    marginBottom: 0,
    paddingTop: 5,
    backgroundColor: '#cdcdcd'
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    // height: Math.max(Platform.OS === 'ios' ? 40 : 45, (this.state || {}).inputHeight || 0),
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    marginLeft: 15,
    marginBottom: Platform.OS === 'android' ? 0 : 0,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    // paddingBottom: Platform.OS === 'android' ? 4 : 0,
    paddingBottom: 6,
    backgroundColor: '#cdcdcd'
  },
  rightWrapper: {
    flex: 1,
    marginRight: 15,
    marginBottom: 6,
    justifyContent: 'center'
  }
})
