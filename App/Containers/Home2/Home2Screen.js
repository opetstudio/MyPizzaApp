import React, { Component } from 'react'
import { ImageBackground, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { filter, concat, map, find, isEmpty } from 'lodash'
import {
  Container
} from 'native-base'
// import { LoginButton } from 'react-native-fbsdk'
import HeaderMenu from '../../Components/HeaderMenu'
import {SessionSelectors} from '../../Redux/SessionRedux'
import AppActions from '../../Redux/AppRedux'

// firebase
// import firebase from 'react-native-firebase'
// import {registerAppListener} from '../Listeners'
// import firebaseClient from '../FirebaseClient'

// Styles
import styles from './Home2ScreenStyle'
import { Images } from '../../Themes'
import AppConfig from '../../Config/AppConfig'
import FooterComponent from '../../Components/Footer'
import TrendingNow from '../../Components/TrendingNow'
import SegmentedController from '../../Components/SegmentedController'
import VideoCarousels from './VideoCarousels'

const launchscreenBg = Images.launchscreenBg

const propTypes = {
  featuredData: PropTypes.array,
  wcmsUrl: PropTypes.string,
  locale: PropTypes.string,
  providers: PropTypes.array,
  categoriesConfig: PropTypes.array,
  genresConfigList: PropTypes.array,
  carousalData: PropTypes.array,
  onClickMoreCategory: PropTypes.func.isRequired,
  onClickMoreGenre: PropTypes.func.isRequired,
  showPopup: PropTypes.func
  // onClickItem: PropTypes.func.isRequired
}
const defaultProps = {
  featuredData: [],
  wcmsUrl: '',
  providers: [],
  categoriesConfig: [],
  genresConfigList: [],
  carousalData: []
}

class Home2Screen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    // this.navigateToContentDetailScreen = this.navigateToContentDetailScreen.bind(this)
  }
  componentWillMount () {
    this.props.setStatusBarIsHidden(false)
  }
  // navigateToContentDetailScreen (id) {
  //   this.props.onClickItem(id)
  // }
  componentDidMount () {}
  render () {
    const {
      featuredData,
      wcmsUrl,
      locale,
      providers,
      categoriesConfig,
      genresConfigList,
      carousalData,
      onClickMoreCategory,
      onClickMoreGenre,
      showPopup
    } = this.props

    const combinedConfig = concat(categoriesConfig, genresConfigList)

    const inAppData = filter(carousalData, c => {
      return c.tab === 'in-app'
    })

    const marketPlaceData = filter(carousalData, c => {
      return c.tab === 'marketplace'
    })

    const liveEventsData = filter(carousalData, c => {
      return c.tab === 'live'
    })

    const marketPlaceContent = (
      <View>
        <VideoCarousels
          config={combinedConfig}
          data={marketPlaceData}
          locale={locale}
          onClickMoreCategory={onClickMoreCategory}
          onClickMoreGenre={onClickMoreGenre}
          onItemPress={this.navigateToContentDetailScreen}
          wcmsUrl={wcmsUrl}
          providers={providers}
        />
      </View>
    )

    const liveEventsContent = (
      <View>
        <VideoCarousels
          isLiveEvents
          liveError={isEmpty(liveEventsData)}
          config={combinedConfig}
          data={liveEventsData}
          locale={locale}
          onClickMoreCategory={onClickMoreCategory}
          onClickMoreGenre={onClickMoreGenre}
          onItemPress={this.navigateToContentDetailScreen}
          wcmsUrl={wcmsUrl}
          providers={providers}
        />
      </View>
    )

    const inAppContent = (
      <VideoCarousels
        config={categoriesConfig}
        data={inAppData}
        locale={locale}
        onClickMoreCategory={onClickMoreCategory}
        onClickMoreGenre={onClickMoreGenre}
        onItemPress={this.navigateToContentDetailScreen}
        wcmsUrl={wcmsUrl}
        providers={providers}
        showPopup={showPopup}
      />
    )

    return (
      <Container>
        <HeaderMenu
          isHomePage
          hasHamburger
          hasSearch
          navigation={this.props.navigation}
          title={AppConfig.appName}
        />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <ScrollView style={{ flex: 1 }}>
            <TrendingNow
              items={featuredData}
              // onItemPress={this.navigateToContentDetailScreen}
              onItemPress={(id) => alert(`gambar ${id}`)}
              rootURL={wcmsUrl}
              locale={locale}
              providers={providers}
            />
            <SegmentedController
              tabs={[
                {
                  i18nKey: 'home-page-tab-three-title',
                  id: 'tab-live-events',
                  content: liveEventsContent
                },
                {
                  i18nKey: 'home-page-tab-one-title',
                  id: 'tab-in-app',
                  content: inAppContent
                },
                {
                  i18nKey: 'home-page-tab-two-title',
                  id: 'tab-marketplace',
                  content: marketPlaceContent
                }
              ]}
              upperCase
              selectedId={'tab-live-events'}
            />
          </ScrollView>
        </ImageBackground>
        <FooterComponent />
      </Container>
    )
  }
}

Home2Screen.propTypes = propTypes
Home2Screen.defaultProps = defaultProps

const mapStateToProps = (state) => {
  return {
    currentUser: SessionSelectors.getCurrentUser(state.session),
    featuredData: [
      {
        id: 1,
        images: {
          banner: {
            mdpi: 'https://www.telkomsel.com/sites/default/files/box_media/right/desktop/widget-desk-paket-MaxAG-800x450_0.jpg',
            hdpi: 'https://www.telkomsel.com/sites/default/files/box_media/right/desktop/widget-desk-paket-MaxAG-800x450_0.jpg',
            xhdpi: 'https://www.telkomsel.com/sites/default/files/box_media/right/desktop/widget-desk-paket-MaxAG-800x450_0.jpg',
            xxhdpi: 'https://www.telkomsel.com/sites/default/files/box_media/right/desktop/widget-desk-paket-MaxAG-800x450_0.jpg'
          }
        }
      },
      {
        id: 2,
        images: {
          banner: {
            mdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/pesta_kuota_agt480_1.jpg',
            hdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/pesta_kuota_agt480_1.jpg',
            xhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/pesta_kuota_agt480_1.jpg',
            xxhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/pesta_kuota_agt480_1.jpg'
          }
        }
      },
      {
        id: 3,
        images: {
          banner: {
            mdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
            hdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
            xhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
            xxhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg'
          }
        }
      }
    ],
    wcmsUrl: '',
    locale: '',
    providers: '',
    categoriesConfig: [],
    genresConfigList: [],
    carousalData: [],
    onClickMoreCategory: () => {},
    onClickMoreGenre: () => {},
    showPopup: () => {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatusBarIsHidden: (data) => dispatch(AppActions.appStatusbar(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home2Screen)
