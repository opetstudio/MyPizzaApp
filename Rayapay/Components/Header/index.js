import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
// import { Container, Header, Button, Content, ActionSheet, Text, Body, Left, Right, Title, Icon, Thumbnail } from 'native-base'
import styles from './styles'
import NavigatorHelper from '../../Lib/helper/navigator'
import { Images } from '../../Themes'
import I18n from '../../I18n'
import StyledText from '../StyledText'

import StyledTouchableOpacity from '../StyledTouchableOpacity'

export default class HeaderMenu extends Component {
  // // Prop type warnings
  static propTypes = {
    hasBack: PropTypes.bool,
    hasBackIonicon: PropTypes.bool,
    hasClose: PropTypes.bool,
    hasCloseLeft: PropTypes.bool,
    hasHamburger: PropTypes.bool,
    hasHome: PropTypes.bool,
    hasSearch: PropTypes.bool,
    isHomePage: PropTypes.bool,
    navigation: PropTypes.object,
    noBackground: PropTypes.bool,
    noTitle: PropTypes.bool,
    title: PropTypes.string
  }
  //
  // // Defaults for props
  static defaultProps = {
    noTitle: false
  }

  render () {
    const textMessage = I18n.t
    const {
      isHomePage,
      hasHamburger,
      hasBack,
      hasBackIonicon,
      hasHome,
      hasSearch,
      hasClose,
      hasCloseLeft,
      navigation,
      noBackground,
      noTitle,
      title
    } = this.props
    const goToHome = () => {
      navigation.navigate('Browse')
    }
    const toggleDrawer = () => {
      // console.log('toggleDrawer navigation', navigation)
      navigation.openDrawer()
      // navigation.navigate('DrawerOpen')
    }
    const goBack = () => navigation.goBack()
    const goToSearch = () => navigation.navigate('Search')
    const goToClose = () => navigation.navigate('Menu')

    const HeaderIcon = ({
      iconImg,
      imageSource,
      onPress,
      isMultipleTapAllowed,
      isRightIcon,
      imageStyle
    }) => {
      return (
        <StyledTouchableOpacity
          onPress={onPress}
          isMultipleTapAllowed={isMultipleTapAllowed}
        >
          <View style={isRightIcon ? styles.rightIcon : styles.leftIcon}>
            {iconImg && iconImg}
            {!iconImg && <Image source={imageSource} style={imageStyle} />}
          </View>
        </StyledTouchableOpacity>
      )
    }

    const titleSection = (
      <View style={styles.titleContainer}>
        {isHomePage && (
          <Image
            style={styles.title}
            source={Images.logo2}
          />
        )}
        {!noTitle && (
          <StyledText textStyle='h21MedWhiteT2NLS' upperCase>
            {title ? textMessage(title) : 'PizzaApp'}
          </StyledText>
        )}
      </View>
    )
    return (
      <View
        style={[
          styles.header,
          noBackground && { backgroundColor: 'transparent' }
        ]}
      >
        {hasCloseLeft && (
          <HeaderIcon
            imageSource={Images.headerBar}
            onPress={goToClose}
          />
        )}
        {hasHamburger &&
          NavigatorHelper.isMenuNavigationAllowed(navigation.state.routeName) && (
          <HeaderIcon
            imageSource={Images.hamburgerMenu}
            onPress={toggleDrawer}
            isMultipleTapAllowed
          />
        )}
        {/* {hasHamburger && (
          <Left>
            <Button
              transparent
              onPress={toggleDrawer}
            >
              {Platform.OS === 'ios' || Platform.OS === 'android' ? <Thumbnail source={Images.menufaces} small /> : <Icon name='ios-menu' />}
            </Button>
          </Left>
        )} */}
        {/* {hasBack && (
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' style={{ color: '#FFF' }} />
            </Button>
          </Left>
        )} */}
        {hasBack && (
          <HeaderIcon
            imageSource={Images.backWhite}
            onPress={goBack}
          />
        )}
        {hasBackIonicon && (
          <HeaderIcon
            iconImg={(<Icon name='md-arrow-back' style={{}} size={25} />)}
            onPress={goBack}
          />
        )}
        {hasHome && (
          <HeaderIcon
            imageSource={Images.headerHome}
            onPress={goToHome}
          />
        )}
        {titleSection}

        {hasSearch && (
          <HeaderIcon
            imageSource={Images.searchWhite}
            imageStyle={styles.searchImgSize}
            onPress={goToSearch}
            isRightIcon
          />
        )}
        {hasClose && (
          <HeaderIcon
            imageSource={Images.headerBar}
            onPress={goToClose}
            isRightIcon
          />
        )}
        {!hasClose && !hasSearch && <View style={styles.rightIcon} />}
      </View>
    )
  }
}
