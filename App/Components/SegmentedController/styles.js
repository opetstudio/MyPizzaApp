import {Colors as colors} from '../../Themes'

export const styles = {
  tabBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20
  },
  tabButtonContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    backgroundColor: colors.darkGreyPrimary,
    height: 48,
    justifyContent: 'center',
    marginLeft: -1
  },
  tabSelectedButtonContainer: {
    borderBottomColor: colors.redPrimary
  }
}
