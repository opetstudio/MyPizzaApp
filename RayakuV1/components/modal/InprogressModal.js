import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';

const InprogressModal = () => (
  <Modal hideClose>
    <View flex={1} style={{
      justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, height: 200, backgroundColor: 'red'
    }}>
      <Text>InprogressModal Modal</Text>
      <Text>Slides up from the bottom, and covers the entire screen with no transparency</Text>
      <Button title="Close" onPress={Actions.pop} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({

});


export default InprogressModal;
