import { connect } from 'react-redux'
import ScreenHome from '../../Components/ScreenHome'
import SessionAction, {SessionSelectors} from '../../Redux/SessionRedux'

const datastructure = require('../../Data/datastructure.json')

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: SessionSelectors.isLoggedIn(state.session),
    featuredData: datastructure.featuredData,
    wcmsUrl: '',
    locale: '',
    providers: [
      {
        tid: 'resourceId1',
        name: 'providername'
      }
    ],
    categoriesConfig: [{
      tid: 'resourceId1',
      i18nKey: 'xxxxx',
      images: {
        mdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
        hdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
        xhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg',
        xxhdpi: 'https://www.telkomsel.com/sites/default/files/thumbnails/15/Mob-Cloudmax-480x270.jpg'
      },
      orientation: 'portrait' // portrait landscape
    }],
    genresConfigList: [],
    carousalData: datastructure.carousalData,
    onClickMoreCategory: () => {},
    onClickMoreGenre: () => {},
    showPopup: () => {},
    onClickItem: (id) => alert(id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sessionLogout: (data) => dispatch(SessionAction.sessionLogout(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenHome)
