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

export default class StyledRow2 extends Component {
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
    badge1: PropTypes.number,
    subListData: PropTypes.array,
    renderSubList: PropTypes.func,
    renderRowBadge: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    firstText: '',
    badge1: 0
  }
  constructor (props) {
    super(props)
    this.state = {
      hideSubList: true
    }
  }

  render () {
    const { firstText, secondText, rightText, itemOnPress, avatar, numberOfLines, badge1, subListData, renderSubList, renderRowBadge } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ListItem avatar={(avatar)} onPress={() => renderSubList ? this.setState({ hideSubList: !this.state.hideSubList }) : itemOnPress}>
          {/* {avatar &&
            <Thumbnail medium square source={avatar} />
          } */}
          <Body>
            <Text>
              {firstText}
            </Text>
            {secondText && numberOfLines &&
              <Text numberOfLines={numberOfLines} note>
                {secondText}
              </Text>
            }
            {secondText && !numberOfLines &&
              <Text note>
                {secondText}
              </Text>
            }
          </Body>
          <Right>
            <Text note>
              {rightText}
            </Text>
            {renderRowBadge && renderRowBadge()}
            {!renderRowBadge && badge1 > 0 &&
            <Badge primary>
              <Text>{badge1}</Text>
            </Badge>}
          </Right>
        </ListItem>
        {!this.state.hideSubList && renderSubList(subListData)}
      </View>
    )
  }
}
