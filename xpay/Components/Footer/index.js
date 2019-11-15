import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Footer,
    FooterTab,
    Text,
    Body,
    Left,
    Right,
    Icon,
    Badge
  } from 'native-base'
import { withNavigation } from 'react-navigation' 
import _ from 'lodash'
import {Image} from 'react-native'
import {isIphoneX} from '../../Lib/helper/platform'
import {Images} from '../../Themes'
import {styles} from './styles'

class FooterComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab1: false,
      tab2: false,
      tab3: false
    }
  }
  componentDidMount () {
    if (this.props.initialTab === 'tab1') this.toggleTab1()
    if (this.props.initialTab === 'tab2') this.toggleTab2()
    if (this.props.initialTab === 'tab3') this.toggleTab3()
  }
  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate ===> prevProps=', prevProps)
    console.log('componentDidUpdate ===> this.props=', this.props)
    if (this.props.isLoggedIn !== null && !_.isEqual(prevProps.isLoggedIn, this.props.isLoggedIn)) {
      if (!this.props.isLoggedIn) this.props.navigation.navigate('unloggedinNavigator')
    }
  }
  toggleTab1 () {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false
    })
    // this.props.onSelectTab('tab1')
  }
  toggleTab2 () {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false
    })
    // this.props.onSelectTab('tab2')
  }
  toggleTab3 () {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true
    })
    // this.props.onSelectTab('tab3')
  }
  render () {
    let showCreateQr = false
    return (
      <Footer>
        <FooterTab>
          {showCreateQr && <Button
            // active={this.state.tab1}
            onPress={() => this.props.navigtion.navigate('ScreenScanQr')}
            // vertical
            // badge
          >
            {/* <Badge>
              <Text>2</Text>
            </Badge> */}
            {/* <Icon active={this.state.tab1} name='apps' /> */}
            <Image source={Images.QR} />
            {/* <Text>Apps</Text> */}
          </Button>}
          <Button
            // active={this.state.tab2}
            onPress={() => this.props.navigation.navigate('ScreenScanQr')}
          >
            {/* <Icon active={this.state.tab2} name='camera' /> */}
            <Image source={Images.scan} />
            {/* <Text>Pay</Text> */}
          </Button>
          <Button
            // active={this.state.tab3}
            onPress={() => this.props.sessionLogout()}
          >
            {/* <Icon active={this.state.tab2} name='camera' /> */}
            <Image source={Images.logout} />
            {/* <Text>Logout</Text> */}
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
export default withNavigation(FooterComponent)
