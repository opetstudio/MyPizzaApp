import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// import CommentInput from '../../Components/CommentInput'
import {CommentSelectors} from '../../Redux/CommentRedux'
// import {SessionSelectors} from '../../Redux/SessionRedux'
import StyledRow1 from '../../Components/StyledRow1'

const row = ({ item, onPress, totalComment }) => {
  __DEV__ && console.log('TvRow.render')
  // const date = moment(new Date(item['tanggal'])).format('DD-MM/YY')
  const avatar = {uri: item.avatar}
  return (
    <StyledRow1
      firstText={item['title']}
      // secondText={item['contentComment']}
      // rightText={date}
      itemOnPress={() => onPress(item)}
      badge1={totalComment}
      avatar={avatar}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps
  return {
    totalComment: CommentSelectors.getTotalCommentByContentId(state.comment, item._id)
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
