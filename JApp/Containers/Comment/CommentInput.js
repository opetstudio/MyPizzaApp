import { connect } from 'react-redux'
import CommentInput from '../../Components/CommentInput'
import CommentAction, {CommentSelectors} from '../../Redux/CommentRedux'
import {SessionSelectors} from '../../Redux/SessionRedux'

const mapStateToProps = (state) => {
  return {
    isPostingInProgress: CommentSelectors.getIsPostingInProgress(state.comment),
    currentTextInputValue: CommentSelectors.getTextInput(state.comment),
    errorMessage: CommentSelectors.getErrorMessage(state.comment),
    currentUser: SessionSelectors.getCurrentUser(state.session)
//   maxModifiedon: CommentSelectors.getMaxModifiedon(state.comment)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentPost: (data) => dispatch(CommentAction.commentPost(data)),
    commentTextinputOnchange: (text) => dispatch(CommentAction.commentTextinputOnchange(text)),
    commentResetInputtext: () => dispatch(CommentAction.commentResetInputtext())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput)
