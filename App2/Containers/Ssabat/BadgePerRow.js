import React from 'react'
import { connect } from 'react-redux'
import {
    Badge, Text
} from 'native-base'

import {CommentSelectors} from '../../Redux/CommentRedux'

const row = ({ totalComment }) => {
  if (totalComment && totalComment > 0) {
    return (<Badge primary>
      <Text>{totalComment}</Text>
    </Badge>)
  }
  return null
}

const mapStateToProps = (state, ownProps) => {
  const { listPelajaran } = ownProps
  return {
    // totalBadge: CommentSelectors.getTotalCommentByContentId(state.comment, contentId)
    totalComment: CommentSelectors.getTotalCommentByListContentId(state.comment, listPelajaran.map(row => row._id))
        // currentTextInputValue: CommentSelectors.getTextInput(state.comment),
        // errorMessage: CommentSelectors.getErrorMessage(state.comment),
        // currentUser: SessionSelectors.getCurrentUser(state.session)
    //   maxModifiedon: CommentSelectors.getMaxModifiedon(state.comment)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        // commentPost: (data) => dispatch(CommentAction.commentPost(data)),
        // commentTextinputOnchange: (text) => dispatch(CommentAction.commentTextinputOnchange(text)),
        // commentResetInputtext: () => dispatch(CommentAction.commentResetInputtext())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(row)
