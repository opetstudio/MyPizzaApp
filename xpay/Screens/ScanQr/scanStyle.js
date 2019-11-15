import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import {Metrics} from '../../Themes'
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    root: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
      },
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#99003d'
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'black'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonScan: {
        width: 42,

    },
    descText: {
        padding: 16,
        textAlign: 'justify',
        fontSize: 16
    },


    highlight: {
        fontWeight: '700',
    },

    centerText: {
        // flex: 1,
        fontSize: 18,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: '#ff0066',
        marginTop: 32,

        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    ButtonVioletOk: {
        width: 350,
        height: 59,
        backgroundColor: '#eb1c24',
        borderRadius: 5,
        alignSelf: 'center',
        top: '70.05%',
        position: 'absolute'
      },
      container: {
        backgroundColor: '#eb1c24'
    },
    backgroundImg: {
        flex: 1,
        width: Metrics.screenWidth
    },
    icon2: {
        color: 'rgba(255,255,255,1)',
        fontSize: 35,
    },
    images: {
        color: 'rgba(0,0,0,1)',
        width: '100%',
        marginTop: 40
      },
      text2: {
        color: 'rgba(255,255,255,1)',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 30
      }
}
export default styles;