import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import CommentInput from '../../Components/CommentInput'
import CommentAction, {CommentSelectors} from '../../Redux/CommentRedux'
import {SessionSelectors} from '../../Redux/SessionRedux'
import StyledRow1 from '../../Components/StyledRow1'

const row = ({ item }) => {
  const date = moment(new Date(item['createdon'])).format('DD-MM/YY')
//   const avatar = item[this.props.avatar]
  const avatar = { uri: item['createdby'].photoURL + '?type=small' }
  return (
    <StyledRow1
      firstText={item['createdby']['displayName']}
      secondText={item['contentComment']}
      rightText={date}
      itemOnPress={() => {}}
      avatar={avatar}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    // isPostingInProgress: CommentSelectors.getIsPostingInProgress(state.comment),
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
