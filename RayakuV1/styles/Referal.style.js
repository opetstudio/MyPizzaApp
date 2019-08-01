import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const buttonWrapperHeight = viewportHeight * 0.3;

export const widthComponent = (percent) => viewportWidth * percent;
export const heightComponent = (percent) => viewportHeight * percent;
// export const squareSize = (percent) => viewportWidth * percent;

export const PAGE_WIDTH = Dimensions.get('window').width;
export const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    allContainer: {
        flex: 2,
        marginLeft: 15,
        marginRight: 15,
        //backgroundColor: 'red'
      },
      background: {
        width: PAGE_WIDTH,
        resizeMode: 'contain',
        opacity: 0.7,
        position: 'absolute'
    },
      leftButton:{
        justifyContent: 'center',
        paddingLeft: 15,
        paddingTop: 25,
      },
      circleBackground:{
        width: 40,
        height: 40,
        borderRadius: 40,
        marginTop: 20,
        backgroundColor: '#00000020',
      },
      imgLeftButton: {
        width: 30,
        height: 50,
        marginLeft: 3,
        marginTop: -5,
      },
      bodyContent:{
        flex: 2,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
      },
      earnCoinsTitle: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#25292e',
        marginBottom: 5,
        opacity: 0.8
      },
      textBodyContent:{
        backgroundColor: 'transparent', 
        fontSize: 14, 
        color: '#a9acad',
      },
      inputNumber:{
        fontSize: 20,
        color: '#25292e',
        textAlign: 'center',
        borderBottomColor: '#25292e',
        borderBottomWidth: 1,
      },
      buttonArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      earnCoinsButton:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5,
        borderColor: '#fdd24e',
        borderWidth: 2,
        // backgroundColor: '#fff',
        marginTop: 25,
      },
      earnCoinsText: {
        color: '#fdd24e',
        fontSize: 15,
      },
      skipButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      skipButtonText: {
        color: '#fdd24e',
        fontWeight: '700'
      },
});
