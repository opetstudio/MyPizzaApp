import React, { Component } from 'react'
import { View, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SessionActions from '../../Redux/SessionRedux'
import StyledText from '../../Components/StyledText'
import I18n from '../../I18n'
// Style
import { loginOptionStyle as styles, socialConnect } from './Styles'
import { Colors, Images } from '../../Themes'

const socialAccounts = [
  {
    key: 'facebook',
    name: 'Facebook',
    icon: Images.facebookWhite
  },
  {
    key: 'twitter',
    name: 'Twitter',
    icon: Images.twitterWhite
  }
]

class LoginOption extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._loginWithSocialAccount = this._loginWithSocialAccount.bind(this)
  }
  componentWillMount () {
  }
  _loginWithSocialAccount (accountKey) {
    // const {
    //   loginWithSocialAccount
    // } = this.props
    switch (accountKey) {
      case 'facebook':
        this.props.loginWithSocialAccount({ accountType: accountKey })
        break
      default:
        alert('Login method belum support.')
    }
  }

  render () {
    const textMessage = I18n.t
    let prevTimeStamp = 0
    const buttonWithIcon = (account, index, onPress) => {
      const onPressHandler = e => {
        const currentTimeStamp = e.nativeEvent.timestamp
        if (currentTimeStamp - prevTimeStamp > 2000 || prevTimeStamp === 0) {
          prevTimeStamp = currentTimeStamp
          return void onPress()
        }
        return null
      }
      return (
        <TouchableHighlight
          style={[
            socialConnect.container,
            { backgroundColor: Colors[account.key] }
          ]}
          onPress={onPressHandler}
          key={`account-${index}`}
        >
          <View style={socialConnect.buttonWrap}>
            <Image source={account.icon} style={socialConnect.icon} />
            <View style={socialConnect.partition} />
            <StyledText
              addedStyle={socialConnect.label}
              textStyle={'h10LtWhiteT'}
            >
              {textMessage(account.name)}
            </StyledText>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.container}>
        <StyledText
          textStyle={'h10LtWhiteT'}
          addedStyle={{ paddingVertical: 15 }}
          i18nKey='login-method-text1'
        />
        {socialAccounts.map((account, index) =>
          buttonWithIcon(account, index, () => this._loginWithSocialAccount(account.key))
        )}
        {/* <Button
          style={{ backgroundColor: Colors.facebook, alignSelf: 'center' }}
          onPress={() => this.facebookLogin()}
        >
          <Text>FB Login</Text>
        </Button> */}
        {/* <LoginButton
          onPress={() => {}}
          publishPermissions={['email']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert('Login failed with error: ' + error.message)
              } else if (result.isCancelled) {
                alert('Login was cancelled')
              } else {
                alert('Login was successful with permissions: ' + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert('User logged out')}
          /> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sessionRequest: (data) => dispatch(SessionActions.sessionRequest(data)),
    sessionSuccess: (data) => dispatch(SessionActions.sessionSuccess(data)),
    loginWithSocialAccount: (data) => dispatch(SessionActions.sessionLoginWithSocmed(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOption)
