import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    StatusBar,
    Linking,
    View,
    ImageBackground
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Button,
    Title,
    Body,
    Right,
    Text,
    Icon,
    Form,
    Item,
    Label,
    Input
  } from "native-base";
import I18n from '../../I18n'

import {
    // Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';
class ScreenScanQr extends Component {
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
            <Container style={styles.container}>
                <StatusBar translucent backgroundColor={'#eb1c24'} />
                <Header transparent>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Scan QR Code</Title>
                </Body>
                <Right />
                </Header>
                <Content style={{}}>
                    <View style={{flex: 1}}>
                    <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            style={{flex: 1, width: 100}}

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
                        </View>
                </Content>
            </Container>

        );
    }
}



export default ScreenScanQr;