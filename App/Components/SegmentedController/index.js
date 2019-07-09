import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from './styles'
import Button from '../Button'

const propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      i18nKey: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired
    })
  ),
  selectedId: PropTypes.string.isRequired,
  upperCase: PropTypes.bool,
  selectedStyle: PropTypes.object,
  style: PropTypes.object
}

class SegmentedController extends Component {
  state = {
    selectedId: this.props.selectedId
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({ selectedId: nextProps.selectedId })
    }
  }

  renderTabs = () => {
    // ensure to use arrow function to auto bind 'this'
    const { tabs, selectedStyle, style, upperCase } = this.props
    const { selectedId } = this.state
    return (
      <View style={styles.tabBarContainer}>
        {tabs.map(tab => {
          const { id, i18nKey } = tab
          const normalStyle = [styles.tabButtonContainer, style]
          const fullSelectedStyle = normalStyle.concat([
            styles.tabSelectedButtonContainer,
            selectedStyle
          ])
          return (
            <View
              key={id}
              style={id === selectedId ? fullSelectedStyle : normalStyle}
            >
              <Button
                onPress={() => this.setState({ selectedId: id })}
                i18nKey={i18nKey}
                upperCase={upperCase}
                type='tab'
              />
            </View>
          )
        })}
      </View>
    )
  };

  renderContent = () => {
    const { tabs } = this.props
    const { selectedId } = this.state
    return (
      <View>
        {tabs.map(tab => {
          const { id, content } = tab
          return (
            <View
              key={id}
              style={{ display: id === selectedId ? null : 'none' }}
            >
              {content}
            </View>
          )
        })}
      </View>
    )
  };

  render () {
    return (
      <View>
        {this.renderTabs()}
        {this.renderContent()}
      </View>
    )
  }
}

SegmentedController.propTypes = propTypes

export default SegmentedController
