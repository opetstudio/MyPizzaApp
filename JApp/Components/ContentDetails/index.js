import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube, {YouTubeStandaloneAndroid} from 'react-native-youtube'
import {
   View,
   ScrollView,
   Image,
   WebView,
   Platform
} from 'react-native'
import {
    Button,
    Text
} from 'native-base'
import { get, isEmpty, filter, isNull, isUndefined } from 'lodash'
import {path} from 'ramda'
import AppConfig from '../../Config/AppConfig'

import HeaderMenu from '../HeaderMenu'
import {generateImageURL} from '../../Utils/helper/imageUrlGenerator'
import StyledTouchableOpacity from '../StyledTouchableOpacity'
import ImageWithDefault from '../ImageWithDefault'
import MovieDetails from './MovieDetails'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { styles } from './styles'
import { Images, Colors } from '../../Themes'

const labelScreen = 'Content Details'

class ContentDetails extends Component {
  static propTypes = {
    photoURL: PropTypes.string,
    wcmsBaseUrl: PropTypes.string,
    displayName: PropTypes.string,
    navigation: PropTypes.object,
    showComments: PropTypes.func
    // content: PropTypes.object,
    // contentType: PropTypes.string
  }
  static defaultProps = {
  }
  constructor (props) {
    super(props)
    const params = path(['state', 'params'], this.props.navigation) || {}
    this.state = {
      content: params.content || {},
      contentType: params.contentType || ''
    }
    this.renderBanner = this.renderBanner.bind(this)
    this.navigateToFullScreenPlayer = this.navigateToFullScreenPlayer.bind(this)
    this.renderContentDetails = this.renderContentDetails.bind(this)
    this.showComments = this.showComments.bind(this)
    // this.carouselSectionWrapper = this.carouselSectionWrapper.bind(this)
    // const {movieId} = this.props.navigation.state.params
    if (this.state.contentType === 'mv') {
    //   this.props.requestSubtitle({id: this.state.content._id, lang: 'id'})
    }
  }
  navigateToFullScreenPlayer () {
    const content = this.state.content
    __DEV__ && console.log('navigateToFullScreenPlayer content', content)
    try {
      if (
        this.state.contentType === 'mv' ||
        this.state.contentType === 'tv' ||
        this.state.contentType === 'powerpoint' ||
        this.state.contentType === 'radio'
      ) {
        const par = {contentType: this.state.contentType, movieId: content._id, url: content.url, subtitle: content.subtitle, content: content, drmAssetID: ''}
        if (content.provider === 'youtube') {
          YouTubeStandaloneAndroid.playVideo({
            apiKey: AppConfig.youtubeApiKey,
            videoId: content.url,
            autoplay: true,
            lightboxMode: false
            // startTime: 124.5
            // onError: (e) => cek('onError', e),
            // onReady: (e) => cek('onReady', e),
            // onChangeState: (e) => cek('onChangeState', e),
            // onChangeQuality: (e) => cek('onChangeQuality', e),
            // onChangeFullscreen: (e) => cek('onChangeFullscreen', e),
            // onProgress: (e) => cek('onProgress', e)
          })
            .then(() => __DEV__ && console.log('Android Standalone Player Finished'))
            .catch(errorMessage => __DEV__ && console.log('error open youtube ' + errorMessage))
        } else {
          if (this.state.contentType === 'mv') this.props.navigation.navigate('VideoPlayerFullScreen', par)
          if (this.state.contentType === 'tv') this.props.navigation.navigate('TvPlayerFullScreen', par)
          if (this.state.contentType === 'radio') this.props.navigation.navigate('RadioPlayerFullScreen', par)
          if (this.state.contentType === 'powerpoint') this.props.navigation.navigate('PowerpointPlayerFullScreen', par)
        }
      } if (this.state.contentType === 'book') {
        const par = {contentType: this.state.contentType, id: content._id, movieId: content._id, url: content.url, subtitle: content.subtitle, content: content, drmAssetID: ''}
        this.props.navigation.navigate('PDFViewerFullScreen', par)
      }
    } catch (e) {

    }
  }
  renderBanner (showPlayButton) {
    const { content } = this.state
    __DEV__ && console.log('renderBanner content:', content)
    const url = {
      banner: {
        'mdpi': content.cover,
        'hdpi': content.cover,
        'xhdpi': content.cover,
        'xxhdpi': content.cover
      }
    }
    // const url = (content && content.cover) || ''
    const imageUrl =
      generateImageURL(url, this.props.wcmsBaseUrl, 'banner').url || null
    // __DEV__ && console.log('===>>>>imageUrl', imageUrl)
    // const imageUrlType =
    //   generateImageURL(url, this.props.wcmsBaseUrl, 'banner').type || null

    // const isCopyRightVisible =
    //   imageUrlType === 'banner'
    //     ? !isNull(content.copyright_landscape) &&
    //       !isUndefined(content.copyright_landscape)
    //     : !isNull(content.copyright_portrait) &&
    //       !isUndefined(content.copyright_portrait)
    return (
      <ImageWithDefault
        style={[styles.bannerImage, styles.banner]}
        imageUrl={imageUrl}
        defaultImage={Images.defaultImageBanner}
            >
        {showPlayButton && (
        <StyledTouchableOpacity
          onPress={this.navigateToFullScreenPlayer}
          isMultipleTapAllowed
                >
          <Image
            source={Images.play}
            style={styles.playButton}
                  />
        </StyledTouchableOpacity>
              )}
        {/* {isCopyRightVisible && (
        <CopyRight
          text={
            imageUrlType === 'banner'
            ? content.copyright_landscape
            : content.copyright_portrait
            }
          orientation={imageUrlType === 'banner' ? 'landscape' : 'portrait'}
            />
        )} */}
      </ImageWithDefault>
    )
  }
  renderContentDetails () {
    const htmlContent = this.state.content.isi_html
    const title = this.state.content.title
    const isiNonHtml = this.state.content.isi_non_html
    const html = `<div>ssdd${htmlContent}</div>`
    const content = {
      title,
      language: 'id',
      subtitleLanguage: 'id',
      rating: 'D',
      year: '2018',
      descriptionEn: 'asdf',
      descriptionId: isiNonHtml,
      runTime: 10
    }
    return (
      <MovieDetails
        content={content}
        providerName='providr'
        isMetaDataSnippet
        locale='id'
        />
    )
    // return (
    //   <WebView
    //     // style={{ flex: 1 }}
    //     source={{ html }}
    //     scalesPageToFit={Platform.OS === 'android'}
    //     scrollEnabled={false}
    //     bounces={false}
    //       />
    // )
  }
  showComments (contentId, contentType) {
    if (this.props.currentUser) this.props.navigation.navigate('DetailArticleCommentScreen', { contentId, contentType })
    else {
      this.props.popupShow({
        title: 'Login',
        body: {template: 'Please login or sign up to continue.'},
        actions: [
          { name: 'Cancel', handler: this.props.popupHide },
          { name: 'Confirm',
            handler: () => {
              this.props.navigation.navigate('LoginMethodScreen', { contentId })
            }
          }
        ],
        imageSource: null,
        imageBody: null
      })
    }
  }
  render () {
    const showPlayerButton = true
    const isEntitled = true
    const screenTitle = () => {
      if (this.state.contentType === 'mv') return 'Movie Detail'
      else if (this.state.contentType === 'tv') return 'Tv Detail'
      else if (this.state.contentType === 'radio') return 'Radio Detail'
      else if (this.state.contentType === 'powerpoint') return 'Powerpoint Detail'
      else return 'Book Detail'
    }
    return (
      <View style={styles.contentDetailsContainer}>
        <HeaderMenu
          hasBack
          title={screenTitle()}
        //   contentId={content.id}
        //   isLiked={likedStatus}
        //   onPressLike={disableLike ? null : this.handleLikeContent}
          navigation={this.props.navigation}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
            >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0 }}>
              {this.renderBanner(showPlayerButton)}
            </View>
            <View style={{ flex: 0, marginBottom: 50 }}>
              {this.renderContentDetails(isEntitled)}
            </View>
            <View style={{alignSelf: 'center', backgroundColor: 'transparent', position: 'absolute', bottom: 5}}>
              <Button
                onPress={() => this.showComments(this.state.content._id, this.state.contentType)}
                style={{ backgroundColor: Colors.colorSecondary10 }}
                >
                <Text>Comments</Text>
              </Button>
            </View>
            {/* <View style={styles.carouselSectionWrapper}>
              {this.renderSimilarContent()}
            </View> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ContentDetails
