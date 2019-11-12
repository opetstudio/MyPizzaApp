import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

// const width = Metrics.screenWidth

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.redPrimary2,
    // backgroundColor: Colors.darkGreyTertiary2,
    // backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingTop: 0,
    // width: width,
    alignSelf: 'flex-start'
  },
  leftIcon: {
    marginVertical: 21,
    marginLeft: 16
  },
  rightIcon: {
    marginVertical: 21,
    marginRight: 16
  },
  searchImgSize: {
    width: 32,
    height: 32
  },
  titleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //title: {
    //textAlign: 'center'
  //},
  titleIcon: {
    marginRight: 13,
    paddingVertical: 10,
    paddingHorizontal: 0
  }
})
