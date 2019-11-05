import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import { isEmpty, isNull } from 'lodash'

const propTypes = {
  children: PropTypes.node,
  defaultImage: PropTypes.number,
  imageStyle: PropTypes.PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  imageUrl: PropTypes.string,
  style: PropTypes.PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ])
}

class ImageWithDefault extends Component {
  state = {
    error: false,
    errorCount: 0,
    maxErrorCount: 3
  };

  render () {
    const { error } = this.state
    const { imageUrl, defaultImage, style, imageStyle, children } = this.props
    const imageError = error || isEmpty(imageUrl) || isNull(imageUrl)

    if (imageError && !children) {
      return (
        <ImageBackground
          style={style}
          imageStyle={imageStyle}
          source={defaultImage}
        />
      )
    }
    if (children) {
      return (
        <ImageBackground
          style={style}
          imageStyle={imageStyle}
          source={imageError ? defaultImage : { uri: imageUrl }}
          resizeMode='contain'
          resizeMethod='resize'
          onError={() => {
            const { errorCount, maxErrorCount } = this.state

            if (imageUrl && errorCount < maxErrorCount) {
              this.setState({ errorCount: errorCount + 1 })
            } else {
              this.setState({ error: true })
            }
          }}
        >
          {children}
        </ImageBackground>
      )
    }
    return (
      <ImageBackground
        style={style}
        imageStyle={imageStyle}
        source={{ uri: imageUrl }}
        resizeMode='contain'
        resizeMethod='resize'
        onError={() => {
          const { errorCount, maxErrorCount } = this.state

          if (imageUrl && errorCount < maxErrorCount) {
            this.setState({ errorCount: errorCount + 1 })
          } else {
            this.setState({ error: true })
          }
        }}
      />
    )
  }
}

ImageWithDefault.propTypes = propTypes

export default ImageWithDefault
