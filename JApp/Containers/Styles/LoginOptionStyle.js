import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

const colors = Colors

export default StyleSheet.create({
  container: {
    flex: 1
    // marginTop: Metrics.navBarHeight,
    // backgroundColor: Colors.fire
  }
})

const tabMeasurement = 40
export const socialConnect = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 3
  },
  buttonWrap: {
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    height: tabMeasurement,
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    left: 0,
    height: tabMeasurement,
    width: tabMeasurement
  },
  partition: {
    position: 'absolute',
    left: tabMeasurement,
    width: 1,
    backgroundColor: colors.darkNavyBluePrimaryOpacity2,
    height: tabMeasurement
  },
  label: {
    alignSelf: 'center'
  },
  signupNowBtn: {
    marginTop: 3,
    paddingVertical: 10,
    paddingRight: 5
  }
})
