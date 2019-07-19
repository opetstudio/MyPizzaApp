import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
// import {
//   Button
// } from 'native-base'
// import { connect } from 'react-redux'
import StyledText from '../StyledText'
// import LanguageProvider from '../LanguageProvider'
// import NavigatorHelpr from '../../Utils/helper/navigator'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// import SessionActions, {SessionSelectors} from '../../Redux/SessionRedux'
// import PopupActions from '../../Redux/PopupRedux'

// Styles
import {drawerFooterStyle as styles} from './Styles'

class DrawerFooter extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    popupShow: PropTypes.func.isRequired,
    popupHide: PropTypes.func.isRequired,
    sessionLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

    // Defaults for props
  static defaultProps = {
  }
    // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  render () {
    const isLoggedIn = this.props.currentUser !== null
    const footerStyle = isLoggedIn
    ? styles.footerButton2
    : styles.footerButton1
    const supportText = isLoggedIn
      ? styles.supportTextLogin
      : styles.supportTextNotLogin
    const borderLanguageStyle = isLoggedIn
      ? styles.borderLanguage
      : styles.borderLanguageNotLogin
    __DEV__ && console.log('[DrawerFooter] isLoggedIn', isLoggedIn)
    const logoutSection = isLoggedIn ? (
      <TouchableOpacity style={styles.logout} onPress={() => {
        this.props.popupShow({
          title: 'Logout',
          body: {template: 'This will log you out from the application. Are you sure?'},
          actions: [
            { name: 'Cancel', handler: this.props.popupHide },
            { name: 'Confirm',
              handler: () => {
                this.props.sessionLogout()
              }
            }
          ],
          imageSource: null,
          imageBody: null
        })
      }}>
        <StyledText
          addedStyle={styles.footerLogout}
          textStyle='h11LtGreyS'
          i18nKey='drawer-logout'
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('LoginMethodScreen')}>
        <StyledText
          addedStyle={styles.footerLogout}
          textStyle='h11LtGreyS'
          i18nKey='drawer-login'
        />
      </TouchableOpacity>
    )
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={footerStyle} onPress={() => this.props.navigation.navigate('SupportScreen')}>
          <StyledText
            i18nKey='drawer-support'
            textStyle='h11LtGreyS'
            addedStyle={supportText}
          />
          <View style={borderLanguageStyle} />
        </TouchableOpacity>
        {/* <LanguageProvider
          isLoggedIn={isLoggedIn}
          chosenLocale={chosenLocale}
          languages={languages}
          onChangeLocale={onChangeLocale}
        /> */}
        {logoutSection}
        {/* <Button full>
          <Text>Logout</Text>
        </Button> */}
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     currentUser: SessionSelectors.getCurrentUser(state.session)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
//     popupHide: (popupMessage) => dispatch(PopupActions.popupHide()),
//     sessionLogout: () => dispatch(SessionActions.sessionLogout())
//   }
// }

export default DrawerFooter
// export default connect(mapStateToProps, mapDispatchToProps)(DrawerFooter)
