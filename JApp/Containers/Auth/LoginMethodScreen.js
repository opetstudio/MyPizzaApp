import React, { Component } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import {
  Container,
  Content,
  Card,
  Icon,
  CardItem,
  Left,
  Body,
  Text
} from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import SessionActions, {SessionSelectors} from '../../Redux/SessionRedux'
import HeaderMenu from '../../Components/HeaderMenu'
import StyledView from '../../Components/StyledView'
import LoginOption from './LoginOption'
import AlertMessage from '../../Components/AlertMessage'
// Styles
import styles from './Styles'
import {Colors} from '../../Themes'

class LoginMethodScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    sessionLogout: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoginCompleted: this.props.isLoginCompleted,
      currentUser: this.props.currentUser,
      isError: false,
      errorMessage: '',
      loginOnProgress: false
    }
    this.renderLoginOption = this.renderLoginOption.bind(this)
    this.renderSuccessLogin = this.renderSuccessLogin.bind(this)
    __DEV__ && console.log('======>constructo')

    // reset parameter
    this.props.sessionLogout()
  }

  componentWillMount () {
    __DEV__ && console.log('======>componentWillMount')
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isLoginCompleted) {
      this.state.loginOnProgress = true
    }
    this.setState({
      isLoginCompleted: nextProps.isLoginCompleted,
      currentUser: nextProps.currentUser,
      isError: nextProps.isError,
      errorMessage: nextProps.errorMessage
    })
  }

  onSuccessLogin () {
    const { navigation } = this.props
    const { redirectScreen } = navigation.state.params
    navigation.goBack()
  }
  renderSuccessLogin () {
    return (
      <Card
        style={{ flex: 0, height: 300 }}
      >
        <CardItem>
          <Left>
            <Icon
              active
              name={'check-circle'}
              style={{ color: '#777', fontSize: 26, width: 30 }}
              type='FontAwesome' />
            <Body>
              <Text>Login Success</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
  }
  renderLoginOption () {
    console.log('isLoginCompleted===>', this.state.isLoginCompleted)
    return (
      <View style={{flex: 1}}>
        {
          !this.state.isLoginCompleted &&
          (<View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size='large' color={Colors.colorPrimary} />
            <Text style={{ color: Colors.whitePrimary, fontSize: 24 }}>Please wait</Text></View>)
        }
        { this.state.isLoginCompleted && this.state.loginOnProgress && this.state.isError &&
          <AlertMessage
            title={this.state.errorMessage}
            // style={{backgroundColor: 'yellow'}}
            styleText={{color: 'red'}}
          />
        }
        { this.state.isLoginCompleted &&
          <LoginOption />
        }
      </View>
    )
  }
  render () {
    return (
      <StyledView isLoading={false} style={styles.zeroHorizontalPadding}>
        <HeaderMenu
          hasBack noTitle noBackground
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          {!this.state.currentUser && this.renderLoginOption()}
          {this.state.currentUser && this.renderSuccessLogin()}
        </View>
      </StyledView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isError: SessionSelectors.isError(state.session),
    errorMessage: SessionSelectors.getErrorMessage(state.session),
    isLoginCompleted: SessionSelectors.getIsLoginCompleted(state.session),
    currentUser: SessionSelectors.getCurrentUser(state.session)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sessionLogout: () => dispatch(SessionActions.sessionLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMethodScreen)
