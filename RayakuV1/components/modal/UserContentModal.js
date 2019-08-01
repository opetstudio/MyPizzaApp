import React from 'react';
import { View, Text, Alert } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

import styles from '../../styles/ModalUserContent.style';

const url_terms = 'https://www.rayaku.id/terms.html';


class UserContentModal extends React.Component {
    constructor() {
        super();
        this.state = {};
      }

    componentWillMount() {
        console.log('[UserContentModal] is Visible', this.props.isVisible);
        this.setState({
            isVisible: this.props.isVisible
          });
    }
    _setModalVisible(visible) {
        console.log('[UserContentModal] is _setModalVisible true -', visible);
        this.setState({ isVisible: visible });
        console.log('[UserContentModal] is _setModalVisible false -', this.state.isVisible);
      }

    render() {
        console.log('[UserContentModal] render', this.state.isVisible);
        return (
            <View style={{marginTop: 22}}>
            <Modal
                // isVisible={this.state.visibleModal === true}
                // backdropColor={"rgba(0, 0, 0, 0.59)"}
                // backdropOpacity={1}
                // animationIn="zoomInDown"
                // animationOut="zoomOutDown"
                // animationInTiming={700}
                // animationOutTiming={700}
                // backdropTransitionInTiming={700}
                // backdropTransitionOutTiming={700}
                // onBackdropPress={() => this.setState({ isVisible: null })}
                animationType="slide"
                transparent={false}
                visible={this.state.isVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    // this._setModalVisible(!this.state.isVisible);
                }}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.headCoin}>User Content</Text>
                    <View style={styles.uniCoin}>
                        <Text style={styles.descCoin}>User Content Here</Text>
                    </View>
                    <LinearGradient
                        colors={['#FD5B31', '#E82F14']}
                        locations={[0, 1]}
                        style={ styles.agreeBtn}
                    >
                        <Button
                        onPress={() => { this._setModalVisible(!this.state.isVisible); }}
                        style={{
                            color: '#FFF',
                            backgroundColor: 'transparent',
                        }}
                        >
                        AGREE
                        </Button>
                    </LinearGradient>
                </View>
            </Modal>
            </View>
        );
    }
}
export default UserContentModal;
