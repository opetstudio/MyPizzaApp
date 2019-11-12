import { StyleSheet } from 'react-native'
import { Metrics, Colors as colors } from '../../Themes'

const width = Metrics.screenWidth

export const styles = StyleSheet.create({
  badgeStyle: {
    borderRadius: 4,
    borderWidth: 1,
    height: 16,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 11,
    maxWidth: width <= 360 ? 75 : 120
  },
  badgeIcon: {
    width: 16,
    height: 16
  },
  upcomingItem: {
    backgroundColor: colors.darkNavyBluePrimary,
    borderColor: colors.bluePrimary
  },
  replayItem: {
    backgroundColor: colors.darkNavyBluePrimary,
    borderColor: colors.greenLive
  },
  justendedItem: {
    backgroundColor: colors.darkNavyBluePrimary,
    borderColor: colors.greenLive
  },
  freeItem: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 0
  },
  liveItem: {
    backgroundColor: colors.greenLive
  }
})
