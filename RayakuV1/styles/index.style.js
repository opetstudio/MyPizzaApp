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
    buttonInnerContainer: {
        flex: 1,
        // width: viewportWidth,
        // width: sliderWidth,
        justifyContent: 'center',
        alignItems: 'center',
        // height: buttonWrapperHeight,
        // backgroundColor: '#fff',
        // opacity: 0.5,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        // backgroundColor: 'green',
        // backgroundColor: 'rgba(255,255,255, 0.9)',
        flexDirection: 'row',
        height: 100,
        borderRadius: 8,
        // paddingHorizontal: itemHorizontalMargin,
        // paddingBottom: 18 // needed for shadow
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    linearGradient: {
      flex: 1,
      // paddingLeft: 15,
      // paddingRight: 15,
      // borderRadius: 5
    },
    linearGradient2: {
      flex: 1,
      // backgroundColor: 'rgba(255,255,255, 0.9)',
      alignItems: 'center',
      // backgroundColor: 'red',

      // paddingLeft: 15,
      // paddingRight: 15,
      // borderRadius: 5
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    scrollviewContentContainer: {
        paddingBottom: 50
    },
    exampleContainer: {
      alignItems: 'center',
      // backgroundColor: 'blue',
      flex: 3,
        // marginBottom: 30
    },
    slider: {
      // backgroundColor: 'yellow',
      flex: 1,
        // marginTop: 25
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        width: 150,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4
    }
});
