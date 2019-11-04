import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors } from '../../Themes'

const deviceHeight = Metrics.screenHeight
const deviceWidth = Metrics.screenWidth

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.whiteTertiary
    // backgroundColor: Colors.colorPrimary1
  },
  drawerCoverWrapper: {
    flex: 1,
    height: deviceHeight / 3.5,
    width: null,
    marginBottom: 10
  },
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative"
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover",
    backgroundColor: 'red'
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  scrollView: {
    flex: 1
  },
  scrollViewContentContainer: {
    paddingTop: 16,
    paddingBottom: 8,
    flexGrow: 1
  },
  contentView: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'blue'
  },
  labelText: {
    fontSize: 10,
    color: Colors.bluePrimary,
    borderColor: Colors.bluePrimary,
    borderWidth: 1,
    height: 16,
    marginLeft: 5,
    paddingHorizontal: 9,
    paddingVertical: 1,
  },
})
