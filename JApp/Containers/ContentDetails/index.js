// import React from 'react'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import ContentDetails from '../../Components/ContentDetails'
import AppActions from '../../Redux/AppRedux'
import MovieActions, {MovieSelectors} from '../../Redux/MovieRedux'
import {SessionSelectors} from '../../Redux/SessionRedux'
import PopupActions from '../../Redux/PopupRedux'
// import { setStatusBarHiddenAction } from './actions'
// import { selectLocale } from '../../containers/LanguageProvider/selectors'
// import { selectMyPackagesList } from '../MyProfile/selectors'
// import { selectProfile } from '../Auth/selectors'

// const mapStateToProps = (state) => {
//   // locale: selectLocale(),
//   // myPackagesList: selectMyPackagesList(),
//   // userProfile: selectProfile()
// }

// const mapDispatchToProps = {
//   // setStatusBarHidden: setStatusBarHiddenAction
// }

const mapStateToProps = (state, ownProps) => {
  // const {content} = ownProps.navigation.state.params
  return {
    // content,
    isFetchingSubtitle: MovieSelectors.getFetchingsubtitle(state.movie),
    subtitle: MovieSelectors.getSubtitle(state.movie),
    currentUser: SessionSelectors.getCurrentUser(state.session)
    // allDataArr: SsdewasaSelectors.getAllLessons(state.ssdewasa),
    // fetching: SsdewasaSelectors.getFetching(state.ssdewasa),
    // maxModifiedon: SsdewasaSelectors.getMaxModifiedon(state.ssdewasa)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatusBarHidden: (data) => dispatch(AppActions.appStatusbar(data)),
    requestSubtitle: (data) => dispatch(MovieActions.movieRequestsubtitle(data)),
    popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
    popupHide: (popupMessage) => dispatch(PopupActions.popupHide())
    // popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
    // ssdewasaRequest: (query) => dispatch(SsdewasaActions.ssdewasaRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ContentDetails
)
