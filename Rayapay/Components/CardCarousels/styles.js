import { StyleSheet } from 'react-native'
import { Metrics, Colors as colors } from '../../Themes'

const width = Metrics.screenWidth
const height = Metrics.screenHeight

export const styles = StyleSheet.create({
  noContentMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flex: 1
  },
  carousel: {
    flexDirection: 'row'
  },
  carouselContainer: {
    paddingHorizontal: 15
  },
  carousalHeader: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow'
  },
  carousalTitle: {
    flexDirection: 'row'
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.redPrimary
  },
  icon: {
    width: 9,
    height: 9,
    marginLeft: 3,
    opacity: 0.5,
    marginTop: 3
  },
  moreText: {
    marginRight: 3,
    marginTop: 3
  },

  moreButtonView: {
    flexDirection: 'row',
    marginTop: -12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselWrap: {
    borderBottomWidth: 1,
    borderColor: colors.darkNavyBlueTertiary,
    paddingBottom: 5,
    backgroundColor: 'blue'
  },
  infoContainer: {
    marginTop: -2,
    marginLeft: 2,
    paddingLeft: 2,
    paddingRight: 4
  },
  infoIcon: {
    width: 20,
    height: 20
  }
})
