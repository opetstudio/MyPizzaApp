/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
//import all the components we will need
import { Images } from '../../Themes'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {

      billPaymentMenu : [
      {
        name: 'PLN',
        logo: plnIcon
      },
      {
        name: 'Token PLN',
        logo: tokenPlnIcon
      },
      {
        name: 'BPJS',
        logo: bpjsIcon
      },
      {
        name: 'Pascabayar',
        logo: pascabayarIcon
      },
      {
        name: 'Prabayar',
        logo: prabayarIcon
      },
      {
        name: 'PAM',
        logo: pamIcon
      },
      {
        name: 'Internet',
        logo: internetIcon
      },
      {
        name: 'TV Kabel',
        logo: tvKabelIcon
      },
      {
        name: 'Telepon',
        logo: teleponIcon
      },
      {
        name: 'Asuransi',
        logo: asuransiIcon
      },
      {
        name: 'Tiket',
        logo: tiketIcon
      },
      {
        name: 'Cicilan',
        logo: cicilanIcon
      },
      {
        name: 'Kartu Kredit',
        logo: kartuKreditIcon
      }
    ]

    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View>
          <View>
              <Text style={styles.username}>Catur</Text>
          </View>
          <View>
              <Text style={styles.saldo}>Rp. 1.000.000</Text>
          </View>
          <View>
              <Text style={styles.title}>Bill Payment</Text>
          </View>
        </View>
        <FlatList
          data={this.state.billPaymentMenu}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'space-between' }}>
              <View style={styles.cardBody}>
                <Image resizeMode = 'contain' style={{height: '40%', width: '40%'}} source={item.logo} />
                <Text style={{fontSize: 13}}>{item.name}</Text>
              </View>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#F7F7F7'
  },

  saldo: {
    fontFamily: 'Lato',
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#B4B4B4'
  },

  username: {
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginHorizontal: 10,
    marginBottom: 2,
    fontSize: 20
  },

  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 16
  },

  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
});


const plnIcon = Images.logoPln
const tokenPlnIcon = Images.logoTokenPln
const bpjsIcon = Images.logoBpjs
const pascabayarIcon = Images.logoPascaBayar
const prabayarIcon = Images.logoPraBayar
const pamIcon = Images.logoPam
const internetIcon = Images.logoInternet
const tvKabelIcon = Images.logoTvKabel
const teleponIcon = Images.logoTelepon
const asuransiIcon = Images.logoAsuransi
const tiketIcon = Images.logoTiket
const cicilanIcon = Images.logoCicilan
const kartuKreditIcon = Images.logoCc

console.log("paaaaaaaaay "+this.billPaymentMenu)
