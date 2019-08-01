import { StyleSheet, Dimensions, Platform, } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 0.07,
        flexDirection: 'row',
        paddingVertical: (Platform.OS === 'ios') ? 20 : 20,
        paddingHorizontal: (Platform.OS === 'ios') ? 20 : 20,
        backgroundColor: '#FFF',
       },
    titleText: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fc4251',
        justifyContent: 'center',
    },
    totalCoins: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    styleTotalcoins: {
        fontSize: 30,
        color: '#1b90fb',
    }
});
