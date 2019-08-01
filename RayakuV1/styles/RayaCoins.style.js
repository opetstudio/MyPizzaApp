import { StyleSheet, Dimensions, Platform, width } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      desc: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      textDesc:{
        fontSize: 10,
      },
      linkingText: {
        fontSize: 10,
        color: '#1b90fb',
        textDecorationLine: 'underline',
      },
      Achievements:{
        flexDirection: 'row',
        paddingHorizontal: (Platform.OS === 'ios') ? 20 : 20,
      },
      titleAchievement: {
        fontSize: 20,
      },
      lineStyle: {
        flex: 1,
        borderBottomColor: 'black', 
        borderBottomWidth: 0.5, 
        width: width - 20,
        marginBottom: 10,
        marginLeft: 15,
     
     },
});
