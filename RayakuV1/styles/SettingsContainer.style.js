import { StyleSheet, Platform, Dimensions } from 'react-native';

import { colors } from './color.style'

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender,
    flexDirection: 'column',
  },
  photoBox: {
    //backgroundColor: colors.red,
    //shadowColor: colors.red,
    shadowOffset: { width: 0, height: 5 }
  },
  img: {
    width: 30,
    height: 50
  },
  imgForward: {
    width: 10,
    height: 15
  },
  imgPhoto: {
    height: PAGE_HEIGHT/2 ,
    width: PAGE_WIDTH
  },
  headerProfile: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 90,
    shadowColor: colors.nero,
    shadowOffset: { width: 0, height: -5 }
  },
  imgBox: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    justifyContent: 'center'
  },
  imgProfile: {
    overflow: 'hidden',
    borderRadius: 16,
    height: 55,
    width: 55
  },
  nameBox: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'red',
    borderBottomWidth: 0.5,
    borderBottomColor: '#97979740',
    marginTop: 14
  },
  nameTitle: {
    color: 'black',
    fontSize: 14
  },
  profileBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    //backgroundColor: 'red',
    borderBottomWidth: 0.5,
    borderBottomColor: '#97979740',
    marginTop: 14,
    marginRight: 12,
  },
  profileBoxText: {
    color: '#AAAAA9',
    fontSize: 12
  },
  subViewLeft: {
    flex: 1,
    justifyContent: 'center'
  },
  subViewRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  subListTwo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    flexDirection: 'row'
  },
  header: {
    marginTop: 20,
    paddingLeft: 12,
    backgroundColor: '#EFEFF4',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CECDD1',
  },
  headerText: {
    color: '#9A9A9F',
    marginBottom: 6,
    fontSize: 12
  },
  version: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF'
  },
  versionText: {
    textAlign: 'center',
    fontWeight: '100'
  }
});
