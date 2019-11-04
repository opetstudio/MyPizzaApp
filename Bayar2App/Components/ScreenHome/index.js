import React from 'react'
import {View, StyleSheet, ScrollView, Image, Text, FlatList, Dimensions } from 'react-native'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Images, Metrics } from '../../Themes'
import { Container } from 'native-base'

import HeaderMenu from '../../Components/HeaderMenu'
import FooterMenu from '../../Components/FooterMenu'

import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class ScreenHome extends React.PureComponent {
  static propTypes = {
    sessionToken: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    sessionLogout: PropTypes.func.isRequired
  }
  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate ===> prevProps=', prevProps)
    if (this.props.sessionToken !== null && !_.isEqual(prevProps.sessionToken, this.props.sessionToken) && this.props.sessionToken === '') {
      this.props.navigation.navigate('unloggedinNavigator')
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',

      billPaymentMenu : [
      {
        name: 'PLN',
        logo: plnIcon,
        token: '12345678'
      },
      {
        name: 'TV Kabel',
        logo: tvKabelIcon,
        token: '12345678'
      },
      {
        name: 'Asuransi',
        logo: asuransiIcon,
        token: '12345678'
      },
      {
        name: 'Kartu Kredit',
        logo: kartuKreditIcon,
        token: '12345678'
      }
    ]

    }
    this._onSelectTab = this._onSelectTab.bind(this)
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 15, marginVertical: 5 }}>
      <View style={styles.cardBody}>
        <Image resizeMode = 'contain' style={{height: '50%', width: '50%'}} source={item.logo} />
        <View style={styles.descr}>
          <Text style={{fontSize: 13}}>{item.name}</Text>
          <Text style={{fontSize: 12}}>{item.token}</Text>
        </View>
      </View>
    </View>
  )
  _onSelectTab (activeTab) {
    this.setState({activeTab: activeTab})
  }
  render () {
    return (
      <Container>
        <Header
          hasHamburger
          navigation={this.props.navigation}
          hasSearch
          isHomePage
        />
        <View>
          <View>
              <Text style={styles.username}>Catur</Text>
          </View>
          <View>
              <Text style={styles.saldo}>Rp. 1.000.000</Text>
          </View>
          <View>
              <Text style={styles.title}>Quick Pay</Text>
          </View>
        </View>
        {this.state.activeTab === 'tab1' &&
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.billPaymentMenu}
            renderItem={this.renderItem}
          />
        }
        {this.state.activeTab === 'tab2' &&
          <View><Text>Yang active adalah tab2</Text></View>
        }
        {/* <FooterMenu /> */}
        <Footer onSelectTab={this._onSelectTab} initialTab={'tab1'} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  banner: {
    height: Metrics.images.large,
    marginLeft: 50,
    marginRight: 50,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  saldo: {
    fontFamily: 'Lato',
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#B4B4B4'
  },
  username: {
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginHorizontal: 15,
    marginBottom: 2,
    marginTop: 5,
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginHorizontal: 15,
    marginBottom: 5,
    fontSize: 16
  },
  cardBody: {
    flex: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: '#0f0',
    flexDirection: 'row',
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
  descr: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const plnIcon = Images.logoPln
const tvKabelIcon = Images.logoTvKabel
const asuransiIcon = Images.logoAsuransi
const kartuKreditIcon = Images.logoCc

export default ScreenHome
