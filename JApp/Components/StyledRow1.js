import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/StyledRow1Style'
import {
  ListItem,
  Body,
  Right,
  Text,
  Left,
  Thumbnail,
  Badge
} from 'native-base'
import {isEmpty} from 'lodash'

export default class StyledRow1 extends Component {
  // // Prop type warnings
  static propTypes = {
    avatar: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    firstText: PropTypes.string,
    secondText: PropTypes.string,
    rightText: PropTypes.string,
    itemOnPress: PropTypes.func,
    numberOfLines: PropTypes.number,
    badge1: PropTypes.number
  }

  // Defaults for props
  static defaultProps = {
    firstText: '',
    badge1: 0
  }

  render () {
    const { firstText, secondText, rightText, itemOnPress, avatar, numberOfLines, badge1 } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ListItem avatar={(avatar)} onPress={itemOnPress}>
          {avatar &&
            <Thumbnail medium square source={avatar} />
          }
          <Body>
            <Text>
              {firstText}
            </Text>
            {!isEmpty(secondText) && numberOfLines &&
              <Text numberOfLines={numberOfLines} note>
                {secondText}
              </Text>
            }
            {!isEmpty(secondText) && !numberOfLines &&
              <Text note>
                {secondText}
              </Text>
            }
          </Body>
          <Right>
            {rightText &&
              <Text note>
                {rightText}
              </Text>
            }
            {badge1 > 0 &&
            <Badge primary>
              <Text>{badge1}</Text>
            </Badge>}
          </Right>
        </ListItem>
      </View>
    )
  }
}
