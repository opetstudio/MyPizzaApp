import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const buttonWrapperHeight = viewportHeight * 0.3;

export const widthComponent = (percent) => viewportWidth * percent;
export const heightComponent = (percent) => viewportHeight * percent;
// export const squareSize = (percent) => viewportWidth * percent;

export const PAGE_WIDTH = Dimensions.get('window').width;
export const PAGE_HEIGHT = Dimensions.get('window').height;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    white: '#FFFFFF',
    background1: '#B721FF',
    background2: '#21D4FD',
    background3: '#FFF'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    background: {
        width: PAGE_WIDTH,
        resizeMode: 'contain',
        opacity: 0.7,
        position: 'absolute'
    },
    containerBody: {
        flex: 2,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    styleRayaku: {
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 30,
        paddingTop: 30
    },
    logoRayaku: {
        width: 50,
        height:50,
        resizeMode: 'contain'
    },
    signUpStyle: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',
        marginBottom: 5,
        opacity: 0.8
    },
    descriptionStyle: {
        backgroundColor: 'transparent',
        fontSize: 14,
        color: '#FFFFFF60'
    },
    downContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    downContainerRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    downDescription: {
        fontSize: 12,
        color: '#F2F2F2',
        backgroundColor: 'transparent' 
    },
    buttonTextAlign: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2,
        // backgroundColor: '#fff',
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        backgroundColor: 'transparent'
    }
});
