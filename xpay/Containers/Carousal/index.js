import { connect } from 'react-redux'
import Carousal from '../../Components/Carousal'
// import { changeFocusAction } from '../Drawer/actions'
// import { showPopupAction } from '../Popup/actions'

export default connect(() => ({}), {
  changeFocus: () => {},
  showPopup: () => {}
  // changeFocus: changeFocusAction,
  // showPopup: showPopupAction
})(Carousal)
