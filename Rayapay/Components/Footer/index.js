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
import _ from 'lodash'
import {Image} from 'react-native'
import {Images} from '../../Themes'

export default class FooterComponent extends Component {
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
    this.props.onSelectTab('tab1')
  }
  toggleTab2 () {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false
    })
    this.props.onSelectTab('tab2')
  }
  toggleTab3 () {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true
    })
    this.props.onSelectTab('tab3')
  }
  render () {
    return (
      <Footer style={{backgroundColor: '#434343', height: 25}}>
        <FooterTab tabActiveBgColor='yellow'>
          <Button
            active={this.state.tab1}
            onPress={() => this.toggleTab1()}
            vertical
            style={{backgroundColor: this.state.tab1 ? 'blue' : '#434343'}}
            // badge
          >
            {/* <Badge>
              <Text>2</Text>
            </Badge> */}
            {/* <Icon active={this.state.tab1} name='apps' /> */}
            <Image source={Images.QR} />
            {/* <Text>Apps</Text> */}
          </Button>
          <Button
            active={this.state.tab2}
            onPress={() => this.toggleTab2()}
            style={{backgroundColor: this.state.tab2 ? 'blue' : '#434343'}}
          >
            {/* <Icon active={this.state.tab2} name='camera' /> */}
            <Image source={Images.scan} />
            {/* <Text>Pay</Text> */}
          </Button>
          <Button
            active={this.state.tab3}
            onPress={() => this.props.sessionLogout()}
            style={{backgroundColor: this.state.tab3 ? 'blue' : '#434343'}}
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
