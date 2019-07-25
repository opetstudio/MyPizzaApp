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

export default class FooterComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab1: false,
      tab2: false
    }
  }
  componentDidMount () {
    if (this.props.initialTab === 'tab1') this.toggleTab1()
    if (this.props.initialTab === 'tab2') this.toggleTab2()
  }
  toggleTab1 () {
    this.setState({
      tab1: true,
      tab2: false
    })
    this.props.onSelectTab('tab1')
  }
  toggleTab2 () {
    this.setState({
      tab1: false,
      tab2: true
    })
    this.props.onSelectTab('tab2')
  }
  render () {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.state.tab1}
            onPress={() => this.toggleTab1()}
            vertical
            badge
          >
            <Badge>
              <Text>2</Text>
            </Badge>
            <Icon active={this.state.tab1} name='apps' />
            <Text>Apps</Text>
          </Button>
          <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
            <Icon active={this.state.tab2} name='camera' />
            <Text>Camera</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
