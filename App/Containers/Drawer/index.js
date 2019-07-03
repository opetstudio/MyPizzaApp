import { connect } from 'react-redux'

import SessionActions, {SessionSelectors} from '../../Redux/SessionRedux'
import PopupActions from '../../Redux/PopupRedux'
import Drawer from '../../Components/Drawer'

import { Images } from '../../Themes'

const movieIcon = Images.movieIcon
const sdabooksIcon = Images.sdabooksIcon
const powerpointIcon = Images.powerpointIcon

const datas = [
  {
    name: 'Home',
    route: 'HomeScreen',
    icon: 'home',
    bg: '#C5F442',
    fontColor: '#00bfff'
  },
  {
    name: 'Books',
    route: 'BookScreen',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: sdabooksIcon
  },
  {
    name: 'Power Point',
    route: 'PowerpointScreen',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: powerpointIcon
  },
  {
    name: 'Movies',
    route: 'MovieScreen',
    icon: 'phone-portrait',
    bg: '#477EEA',
        // types: "10",
    iconPicture: movieIcon
  }
]

const mapStateToProps = (state) => {
  return {
    datas,
    currentUser: SessionSelectors.getCurrentUser(state.session)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
    popupHide: (popupMessage) => dispatch(PopupActions.popupHide()),
    sessionLogout: () => dispatch(SessionActions.sessionLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
