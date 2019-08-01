import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    containerIos: {
      height: (Platform.OS === 'ios') ? 64 : 54,
      flexDirection: 'row',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      backgroundColor: '#FFF'
    },
    containerAndroid: {
      height: 64,
      flexDirection: 'row',
      paddingTop: 20,
      backgroundColor: 'transparent'
    },
    navBarItem: {
      ///flex: 1,
      justifyContent: 'center',
      width: 50
    },
    leftTouch: {
      justifyContent: 'center',
      paddingLeft: 10,
    },
    leftAndroid: {
      //flex: 1,
      justifyContent: 'flex-start',
      width: 50
    },
    img: {
      width: 30,
      height: 50
    },
    conversationMid: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: 60
    },
    conversationTitle: {
      color: (Platform.OS === 'ios') ? '#000' : '#FFF',
      fontSize: 16,
    },
    middle: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    middleIos: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    middleText: {
      paddingTop: (Platform.OS === 'ios') ? 5 : 0,
      color: (Platform.OS === 'ios') ? '#000' : '#FFF',
      fontSize: 18
    },
    right: {
      //flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: 50
    },
    rightTouch: {
      paddingRight: 10,
      justifyContent: 'center'
    },
    imgRight: {
      width: 30,
      height: 30
    },
    dinamicStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      elevation: 6
    },
    actionButton: {
      bottom: -20,
      right: -25,
      backgroundColor: 'transparent',
      elevation: 10
    },
    imgExpand: {
      width: 10,
      height: 10,
      alignSelf: 'center'
    }
});
