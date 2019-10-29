import { StyleSheet } from 'react-native'
import {Metrics, Colors} from '../../Themes'

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
    backgroundColor: Colors.darkNavyBluePrimary,
    borderColor: Colors.bluePrimary
  },
  replayItem: {
    backgroundColor: Colors.darkNavyBluePrimary,
    borderColor: Colors.greenPrimary
  },
  justendedItem: {
    backgroundColor: Colors.darkNavyBluePrimary,
    borderColor: Colors.greenLive
  },
  freeItem: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 0
  },
  liveItem: {
    backgroundColor: Colors.greenLive
  }
})
