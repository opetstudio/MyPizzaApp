import { StyleSheet, Platform, Dimensions } from 'react-native';

import { colors } from './color.style';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: 'yellow',

    backgroundColor: colors.lavender,
    flexDirection: 'column'
  },
  photoBox: {
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 5 }
  },
  imgProfile: {
    height: Platform.OS === 'ios' ? PAGE_HEIGHT/2 : 300,
    width: PAGE_WIDTH
  },
  editBox: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 70,
  },
  nameBox: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#97979740',
    marginTop: 14
  },
  nameTitle: {
    color: 'black',
    fontSize: 18
  },
  profileBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor: '#97979740',
    marginTop: 14,
    marginRight: 12,
  },
  profileBoxText: {
    color: '#AAAAA9',
    fontSize: 12
  },
  subList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  subViewRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
});
