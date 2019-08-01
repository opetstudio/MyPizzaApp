import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.7;
const buttonWrapperHeight = viewportHeight * 0.3;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;

export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        // width: sliderWidth,
        height: '100%',
        // height: slideHeight,
        // backgroundColor: 'red',
        // paddingHorizontal: itemHorizontalMargin,
        // paddingBottom: 18 // needed for shadow
    },
    buttonInnerContainer: {
        width: itemWidth,
        // width: sliderWidth,
        height: buttonWrapperHeight,
        //backgroundColor: 'red',
        // paddingHorizontal: itemHorizontalMargin,
        // paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        // flex: 1,
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
        // marginTop: 90
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        // backgroundColor: colors.black
    },
    image: {
      height: 86,
      width: 88,
      resizeMode: 'center'

        // ...StyleSheet.absoluteFillObject,
        // resizeMode: 'cover',
        // borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        // backgroundColor: 'white'
    },
    radiusMaskEven: {
        // backgroundColor: colors.black
    },
    textContainer: {
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20,
        width: viewportWidth,
        height: '35%',
        // paddingTop: 20 - entryBorderRadius,
        // paddingBottom: 20,
        // paddingHorizontal: 16,
        // backgroundColor: 'white',
        // borderBottomLeftRadius: entryBorderRadius,
        // borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        // backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 20,
        // fontWeight: 'bold',
        // letterSpacing: 0.5
    },
    titleEven: {
        // color: 'white'
        color: colors.black
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 14,
        // justifyContent: 'center',
        textAlign: 'center',
        // fontStyle: 'italic'
    },
    subtitle2: {
        // marginTop: 6,
        color: colors.gray,
        fontSize: 14,
        textAlign: 'center',
        // fontStyle: 'italic'
    },
    subtitleEven: {
        // color: 'rgba(255, 255, 255, 0.7)'
        color: colors.gray,
    }
});
