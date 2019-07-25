// import React from 'react'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import VideoPlayerFullScreen from '../../Components/VideoPlayerFullScreen'
import AppActions from '../../Redux/AppRedux'
import TvActions, {TvSelectors} from '../../Redux/TvRedux'
import {ScriptinjectSelectors} from '../../Redux/ScriptinjectRedux'
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
  const {movieId} = ownProps.navigation.state.params
  return {
    // isFetchingSubtitle: TvSelectors.getFetchingsubtitle(state.movie),
    // subtitle: MovieSelectors.getSubtitle(state.movie),
    movieResource: TvSelectors.getTvSource(state.tv, movieId),
    contentDetailById: TvSelectors.getDetailById(state.tv, movieId),
    funcGetScriptinjectByProvider: ScriptinjectSelectors.funcGetByProvider(state.scriptinject)
    // allDataArr: SsdewasaSelectors.getAllLessons(state.ssdewasa),
    // fetching: SsdewasaSelectors.getFetching(state.ssdewasa),
    // maxModifiedon: SsdewasaSelectors.getMaxModifiedon(state.ssdewasa)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatusBarHidden: (data) => dispatch(AppActions.appStatusbar(data)),
    setsource: (data) => dispatch(TvActions.tvSettvsource(data)),
    resetsource: (data) => dispatch(TvActions.tvResettvsource(data)),
    requestDetail: (data) => dispatch(TvActions.tvRequestdetail(data))
    // popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage)),
    // ssdewasaRequest: (query) => dispatch(SsdewasaActions.ssdewasaRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoPlayerFullScreen
)
