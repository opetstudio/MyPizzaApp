import { StyleSheet, Dimensions } from 'react-native';

import { colors } from './color.style';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  leftTouch: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 25,
  },
  left: {
    justifyContent: 'flex-start',
    width: 100,
  },
  img: {
    width: 30,
    height: 50,
    marginLeft: 3,
    marginTop: -5,
    // borderRadius: 20
  },
  imgView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 20,
    backgroundColor: colors.black20,
  },
  imgForward: {
    width: 10,
    height: 15
  },
  icon: {
    width: 90,
    height: 90
  },
  imgPhoto: {
    height: PAGE_HEIGHT / 1.8,
    width: PAGE_WIDTH,
    elevation: 10,
    marginBottom: 10
  },
  imgBox: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    justifyContent: 'center'
  },
  nmBox: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  nmText: {
    fontSize: 26,
    color: colors.white,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 15,
  },
  headerNumber: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    shadowColor: colors.nero,
    shadowOffset: { width: 0, height: -5 }
  },
  numberBox:{
    // flex:1,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#97979740',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20
  },

  numberText: {
    fontSize: 23,
    color: colors.black
  },
  littleIconBox:{
    flex:1,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#97979740',
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20
  },
  iconBox:{
    flex:1,
    //backgroundColor: colors.red,

    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
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
    paddingTop: 20,
    paddingLeft: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CECDD1',
  },
  headerText: {
    color: '#9A9A9F',
    marginBottom: 6,
    fontSize: 12
  }
});
