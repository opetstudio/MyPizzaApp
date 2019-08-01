import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {
  /*global propTypes*/
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        // const { illustration, parallax, parallaxProps, even } = this.props;
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;
        return (
          <Image
             source={illustration}
            //  source={{ uri: illustration }}
             style={styles.image}
             resizeMode="stretch"
          />
        );

        // return parallax ? (
        //     <ParallaxImage
        //       source={{ uri: illustration }}
        //       containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        //       style={[styles.image, { position: 'relative' }]}
        //       parallaxFactor={0.35}
        //       showSpinner={true}
        //       spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        //       {...parallaxProps}
        //     />
        // ) : (
        //     <Image
        //       source={{ uri: illustration }}
        //       style={styles.image}
        //     />
        // );
    }

    render() {
        const { data: { title, subtitle, subtitle2 }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                {/* { title.toUpperCase() } */}
                { title }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {
                // alert(`You've clicked '${title}'`);
              }}
            >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    {/* <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} /> */}
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                    <Text
                      style={styles.subtitle2}
                      numberOfLines={2}
                    >
                        { subtitle2 }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
