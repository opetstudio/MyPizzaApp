import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View,
    ImageBackground
} from 'react-native';
import Header from '../Header'
import StyledText from '../StyledText'
import I18n from '../../I18n'
import MaterialButtonViolet1 from '../symbols/ScreenCard/MaterialButtonViolet1'

import {
    // Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
        this.props.navigation.replace('ScreenTransactiondetail')

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    render() {
        const textMessage = I18n.t
        const { scan, ScanResult, result } = this.state
        const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.'
        return (
            <View style={styles.root}>
              <Header
                hasBack
                // isHomePage
                // hasHamburger
                // hasSearch
                navigation={this.props.navigation}
                // noBackground
                title='screen-title-addcard'
              />
              <ImageBackground source={require('../../Images/bg/bgrayapay1.png')} style={{flex: 1}}>
                {/* <Fragment> */}
                    {/* <StatusBar barStyle="dark-content" /> */}
                    <Text style={styles.textTitle}>{textMessage('screen-scanqr-top')}</Text>
                    {/* {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>

                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                            </TouchableOpacity>

                        </View>
                    } */}

                    {/* {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result !</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    } */}


                    {/* {scan && */}
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}

                            // topContent={
                            //     <Text style={styles.centerText}>
                            //       Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
                            //       on your computer and scan the QR code to test.
                            //     </Text>
                            // }
                            // bottomContent={
                            //     <View>
                            //         <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                            //             <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                            //         </TouchableOpacity>

                            //         <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                            //             <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                            //         </TouchableOpacity>
                            //     </View>

                            // }
                        />
                    {/* } */}
                {/* </Fragment> */}
                  {/* {ScanResult &&
                    <MaterialButtonViolet1 style={styles.ButtonVioletOk} />
                    } */}
                </ImageBackground>
            </View>

        );
    }
}



export default Scan;