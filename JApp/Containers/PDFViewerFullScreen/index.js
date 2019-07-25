// import React from 'react'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import PDFViewerFullScreen from '../../Components/PDFViewerFullScreen'
import AppActions from '../../Redux/AppRedux'
import BookActions, {BookSelectors} from '../../Redux/BookRedux'
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
  const {id} = ownProps.navigation.state.params
  return {
    // isFetchingSubtitle: MovieSelectors.getFetchingsubtitle(state.movie),
    // subtitle: MovieSelectors.getSubtitle(state.movie),
    // movieResource: MovieSelectors.getMovieSource(state.movie, movieId),
    contentDetailById: BookSelectors.getDetailById(state.book, id),
    currentPage: BookSelectors.getCurrentPageById(state.book, id),
    currentPath: BookSelectors.getCurrentPathById(state.book, id)
    // allDataArr: SsdewasaSelectors.getAllLessons(state.ssdewasa),
    // fetching: SsdewasaSelectors.getFetching(state.ssdewasa),
    // maxModifiedon: SsdewasaSelectors.getMaxModifiedon(state.ssdewasa)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatusBarHidden: (data) => dispatch(AppActions.appStatusbar(data)),
    bookSetCurrentPage: (bookId, page) => dispatch(BookActions.bookSetCurrentPage(bookId, page)),
    bookSetCurrentPath: (bookId, page) => dispatch(BookActions.bookSetCurrentPath(bookId, page)),
    // movieResetmoviesource: (data) => dispatch(MovieActions.movieResetmoviesource(data)),
    // requestSubtitle: (data) => dispatch(MovieActions.movieRequestsubtitle(data))
    popupHide: () => dispatch(PopupActions.popupHide()),
    popupShow: (popupMessage) => dispatch(PopupActions.popupShow(popupMessage))
    // ssdewasaRequest: (query) => dispatch(SsdewasaActions.ssdewasaRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PDFViewerFullScreen
)
