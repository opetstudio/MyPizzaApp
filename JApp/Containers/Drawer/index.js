import { connect } from 'react-redux'

import SessionActions, {SessionSelectors} from '../../Redux/SessionRedux'
import PopupActions from '../../Redux/PopupRedux'
import Drawer from '../../Components/Drawer'

import { Images } from '../../Themes'

const renunganPagiIcon = Images.renunganPagiIcon
const sekolahsabatIcon = Images.sekolahsabatIcon
const movieIcon = Images.movieIcon
const sdabooksIcon = Images.sdabooksIcon
const powerpointIcon = Images.powerpointIcon
const tvIcon = Images.tvIcon
const radioIcon = Images.radioIcon
const womanhandIcon = Images.womanhandIcon
const menufacesIcon = Images.menufaces

const datas = [
  {
    name: 'Home',
    route: 'HomeScreen',
    icon: 'home',
    bg: '#C5F442',
    fontColor: '#00bfff'
  },
  // {
  //   name: 'Renungan Pagi',
  //   route: 'RenunganpagiScreen',
  //   icon: 'heart',
  //   bg: '#C5F442',
  //   fontColor: '#00bfff',
  //   iconPicture: renunganPagiIcon
  // },
  // {
  //   name: 'Sekolah sabat',
  //   route: 'SekolahsabatScreen',
  //   icon: 'phone-portrait',
  //   bg: '#477EEA',
  //       // types: "10",
  //   iconPicture: sekolahsabatIcon
  // },
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
    name: 'Inspired Movies',
    route: 'MovieScreen',
    icon: 'phone-portrait',
    bg: '#477EEA',
        // types: "10",
    iconPicture: movieIcon
  },
  {
    name: 'TV Channel',
    route: 'TVChannelScreen',
    icon: 'phone-portrait',
    bg: '#477EEA',
        // types: "10",
    iconPicture: tvIcon
  },
  {
    name: 'Radio Channel',
    route: 'RadioChannelScreen',
    icon: 'phone-portrait',
    bg: '#477EEA',
        // types: "10",
    iconPicture: radioIcon
  },
  {
    name: 'Sponsors',
    route: 'SponsorScreen',
    icon: 'phone-portrait',
    bg: '#DA4437',
    iconPicture: womanhandIcon
        // types: "4"
  },
  {
    name: 'About App',
    route: 'AboutAppScreen',
    icon: 'phone-portrait',
    bg: '#DA4437',
    iconPicture: menufacesIcon
        // types: "4"
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
