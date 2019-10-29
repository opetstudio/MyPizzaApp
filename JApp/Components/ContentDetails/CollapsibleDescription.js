import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image } from 'react-native'
// import { autobind } from 'core-decorators'
import { upperFirst, get, isEmpty } from 'lodash'

import StyledText from '../StyledText'

import { styles } from './styles'

import {Images} from '../../Themes'

const propTypes = {
  content: PropTypes.shape(),
  locale: PropTypes.string
}

const defaultProps = {
  content: {},
  locale: ''
}

export default class CollapsibleDescription extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { expanded: false }
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  // @autobind
  toggleExpanded () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    const { content, locale } = this.props
    const { expanded } = this.state
    const localeSuffix = upperFirst(locale)
    const description = get(content, `description${localeSuffix}`, '')
    if (!description) {
      return null
    }
    if (isEmpty(description) || description.length < 220) {
      return (
        <View style={styles.description}>
          <View style={{ flex: 10 }}>
            <StyledText textStyle='h11LtGreyS'>{description}</StyledText>
          </View>
        </View>
      )
    }

    if (expanded) {
      return (
        <View style={styles.description}>
          <View style={{ flex: 10 }}>
            <StyledText textStyle='h11LtGreyS'>{description}</StyledText>
          </View>
          <TouchableOpacity
            style={styles.descriptionStyle}
            onPress={() => this.toggleExpanded()}
          >
            <StyledText textStyle='h12MedGreyS' i18nKey='content-less' />
            <Image
              source={Images.chevronUpRed}
              style={styles.chevronDownImage}
            />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.description}>
          <View style={{ flex: 10 }}>
            <StyledText textStyle='h11LtGreyS' lines={3} ellipse='tail'>
              {description}
            </StyledText>
          </View>
          <TouchableOpacity
            style={styles.descriptionStyle}
            onPress={() => this.toggleExpanded()}
          >
            <StyledText textStyle='h12MedGreyS' i18nKey='content-more' />
            <Image
              source={Images.chevronDown}
              style={styles.chevronDownImage}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }
}

CollapsibleDescription.propTypes = propTypes
CollapsibleDescription.defaultProps = defaultProps
