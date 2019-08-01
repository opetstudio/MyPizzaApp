import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';


const TermModal = () => (
  <Modal hideClose>
    <View style={{ flex: 1, width: null }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>This is term and condition</Text>
      </View>
      <View
       style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={{
                alignItems: 'center',
                backgroundColor: '#fff',
                width: 300,
                paddingTop: 13,
                paddingBottom: 15,
                borderRadius: 6,
                borderColor: '#FD5B31',
                borderWidth: 1,
                height: 48,
              }}
        >
          <Text style={{color: '#000000'}}>
            DONE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


export default TermModal;
