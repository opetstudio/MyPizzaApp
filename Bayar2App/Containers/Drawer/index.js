import { connect } from 'react-redux'

import SessionActions, {SessionSelectors} from '../../Redux/SessionRedux'
import PopupActions from '../../Redux/PopupRedux'
import Drawer from '../../Components/Drawer'

import { Images } from '../../Themes'

const isiSaldoIcon = Images.logoIsiSaldo
const riwayatIcon = Images.logoRiwayat
const pengaturanIcon = Images.logoSetting
const mengundangIcon = Images.logoMail
const pusatBantuanIcon = Images.logoHelp
const globeIcon = Images.globe

const datas = [
  {
    name: 'Isi Saldo',
    route: '',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: isiSaldoIcon
  },
  {
    name: 'Riwayat',
    route: '',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: riwayatIcon
  },
  {
    name: 'Pengaturan',
    route: 'PowerpointScreen',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: pengaturanIcon
  },
  {
    name: 'Mengundang',
    route: 'MovieScreen',
    icon: 'heart',
    bg: '#477EEA',
    fontColor: '#00bfff',
        // types: "10",
    iconPicture: mengundangIcon
  },
  {
    name: 'Pusat Bantuan',
    route: 'PowerpointScreen',
    icon: 'heart',
    bg: '#C5F442',
    fontColor: '#00bfff',
    iconPicture: pusatBantuanIcon
  }
]

const mapStateToProps = (state) => {
  return {
    datas,
    currentUser: SessionSelectors.getCurrentUser(state.session),
    sessionToken: SessionSelectors.sessionToken(state.session)
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
