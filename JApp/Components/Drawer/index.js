import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView, ImageBackground} from 'react-native'

import {
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Badge,
  Thumbnail
} from 'native-base'
import styles from './Styles'
import { Images } from '../../Themes'
import DrawerHeader from './DrawerHeader'
import DrawerFooter from './DrawerFooter'
import AppConfig from '../../Config/AppConfig'

// const drawerCover = Images.drawerCover
// const drawerImage = Images.drawerImage

export default class Drawer extends Component {
  // // Prop type warnings
  static propTypes = {
    currentUser: PropTypes.object,
    popupShow: PropTypes.func.isRequired,
    popupHide: PropTypes.func.isRequired,
    sessionLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  static defaultProps = {
  }
  constructor (props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
  }

  render () {
    return (
      <ImageBackground
        style={styles.container}
        source={Images.bg}
      >
        <View
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentContainer}
          >
            <DrawerHeader
              currentUser={this.props.currentUser}
              navigation={this.props.navigation}
            />
            <View style={styles.contentView}>
              <List
                dataArray={this.props.datas}
                renderRow={data =>
                  <ListItem
                    button
                    noBorder
                    onPress={() => this.props.navigation.navigate(data.route)}
                  >
                    <Left>
                      {data.iconPicture &&
                        <Thumbnail source={data.iconPicture} small square />
                      }
                      {!data.iconPicture && <Icon
                        active
                        name={data.icon}
                        style={{ color: data.fontColor || '#777', fontSize: 26, width: 30 }}
                        type='FontAwesome' />
                      }
                      {/* <StyledText
                        i18nKey={data.name}
                        // textStyle='h11LtGreyS'
                        addedStyle={styles.labelText}
                      /> */}
                      <Text style={styles.text}>
                        {data.name}
                      </Text>
                    </Left>
                    {data.types &&
                      <Right style={{ flex: 1 }}>
                        <Badge
                          style={{
                            borderRadius: 3,
                            height: 25,
                            width: 72,
                            backgroundColor: data.bg
                          }}
                        >
                          <Text
                            style={styles.badgeText}
                          >{`${data.types} Types`}</Text>
                        </Badge>
                      </Right>}
                  </ListItem>}
              />
            </View>
            {AppConfig.isDrawerFooterActive && <DrawerFooter
              navigation={this.props.navigation}
              currentUser={this.props.currentUser}
              popupShow={this.props.popupShow}
              popupHide={this.props.popupHide}
              sessionLogout={this.props.sessionLogout}
            />}
          </ScrollView>
        </View>
      </ImageBackground>
    )
  }
}
