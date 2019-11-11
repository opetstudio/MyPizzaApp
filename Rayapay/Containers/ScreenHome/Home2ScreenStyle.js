import { StyleSheet } from 'react-native'
// import { ApplicationStyles, Metrics, Colors } from '../../Themes/'
import {Colors as colors, Metrics} from '../../Themes'

const width = Metrics.screenWidth
const height = Metrics.screenHeight

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkNavyBluePrimary,
    width,
    height
  },
  noContentMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flex: 1
  }
})

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // marginTop: Metrics.screenHeight / 8,
    // marginBottom: 25
  },
  logo: {
    // flex: 1,
    // position: "absolute",
    // left: Platform.OS === "android" ? 40 : 50,
    // top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 300,
    resizeMode: 'contain'
  },
  text: {
    color: '#D8D8D8',
    bottom: 6,
    marginTop: 5
  }
})
