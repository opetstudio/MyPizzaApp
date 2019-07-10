import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors } from '../../Themes'

const deviceHeight = Metrics.screenHeight
const deviceWidth = Metrics.screenWidth

const width = deviceWidth

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
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative'
  },
  drawerImage: {
    position: 'absolute',
    left: Platform.OS === 'android' ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === 'android' ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover',
    backgroundColor: 'red'
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? -3 : undefined
  },
  scrollView: {
    flex: 1
  },
  scrollViewContentContainer: {
    flexGrow: 1
  },
  contentView: {
    flex: 1,
    flexDirection: 'column'
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
    paddingVertical: 1
  },
  drawerFooter2: {
    flex: 0,
    bottom: 0,
    flexDirection: 'column',
    paddingVertical: 5,
  },
  drawHeader: {
    flex: 0,
    top: 0,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 20
  }
})

export const drawerFooterStyle = StyleSheet.create({
  container: {
    flex: 0,
    bottom: 0,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'red'
  },
  footer: {
    flex: 0,
    bottom: 0,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.greySecondary
    // backgroundColor: 'red'

  },
  footerButton1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: width / 2.5
  },
  footerButton2: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    width: width / 4
  },
  footerLogout: {
    marginTop: 5,
    alignItems: 'center'
  },
  supportTextLogin: {
    marginLeft: 15
  },
  supportTextNotLogin: {
    marginLeft: 40
  },
  borderLanguage: {
    borderColor: Colors.greySecondary,
    borderLeftWidth: 1,
    height: 50,
    marginLeft: 5,
    marginTop: -10
  },
  borderLanguageNotLogin: {
    borderColor: Colors.greySecondary,
    borderLeftWidth: 1,
    height: 50,
    marginTop: -10,
    marginLeft: 10
  },
  logout: {
    borderColor: Colors.greySecondary,
    borderLeftWidth: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: width / 3.85,
    alignItems: 'center',
    alignContent: 'center'
  }
})

export const drawerHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  drawerCoverWrapper: {
    // flex: 1,
    // height: deviceHeight / 3.5,
    width: null,
    // marginBottom: 10,
    // backgroundColor: 'blue'
  },
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative'
  },
  drawerImageWrapper: {
    position: 'absolute',
    top: 60,
    left: Platform.OS === 'android' ? deviceWidth / 12 : deviceWidth / 11,
    width: 210,
    // height: 150,
    // resizeMode: 'cover',
    // backgroundColor: 'red',
    flexDirection: 'row',
    // marginTop: -25,
    justifyContent: 'flex-start'
  },
  drawerImage: {
    position: 'absolute',
    left: Platform.OS === 'android' ? deviceWidth / 10 : deviceWidth / 9,
    top: 60,
    width: 210,
    height: 75,
    resizeMode: 'cover'
    // backgroundColor: 'red'
  },
  profileImageView: {
    // borderRadius: 50,
    // marginLeft: 14,
    // marginTop: 35,
    // borderWidth: 5,
    // borderColor: '#ffffff',
    overflow: 'hidden'
  },
  profileImage: {
    width: 63,
    height: 63
  },
  profileText1: {
    backgroundColor: 'transparent',
    fontSize: 12,
    marginLeft: 5,
    color: Colors.greySecondary
  }
})
