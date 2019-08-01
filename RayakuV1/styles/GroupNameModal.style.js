import { StyleSheet, Platform, Dimensions } from 'react-native';

import { colors } from './color.style';
import stylesNavbar from '../styles/NavBar.style';

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
  img: {
    width: 30,
    height: 50,
    marginLeft: 3,
    marginTop: -5,
  },
  imgView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 20,
    backgroundColor: colors.black20,
  },
  imgPhoto: {
    height: PAGE_HEIGHT / 1.8 ,
    width: PAGE_WIDTH,
    elevation: 10,
    marginBottom: 10
    //position: 'absolute'
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
  nameModal: {
    flex: 1,
    //  height: PAGE_HEIGHT,
    //  width: PAGE_WIDTH,
    backgroundColor: colors.white
    // backgroundColor: 'red',
    // marginBottom: 258
  },
  buttonRow: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    borderColor: colors.darkGray,
    borderWidth: 0.8,
    height: 50,
    width: PAGE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOK: {
  },
  modalHeaderText: {
    color: colors.white
  },
  modalNavbarAndroid: {
    paddingLeft: 15,
    backgroundColor: colors.default
  },
  modalNavbarIos: {
   
  }
});
