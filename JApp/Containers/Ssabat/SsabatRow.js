import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {
  ListItem,
  Body,
  Right,
  Text,
  Left,
  Thumbnail,
  Badge
} from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
// import CommentInput from '../../Components/CommentInput'
import {CommentSelectors} from '../../Redux/CommentRedux'
// import {SessionSelectors} from '../../Redux/SessionRedux'
import StyledRow2 from '../../Components/StyledRow2'
import BadgePerRow from './BadgePerRow'
import BadgePerSubRow from './BadgePerSubRow'

const row = ({ item, onPress, totalComment, listPelajaran }) => {
  const date = moment(new Date(item['tanggal'])).format('DD-MM/YY')
//   const avatar = item[this.props.avatar]
  return (
    <StyledRow2
      firstText={item['title']}
      // secondText={item['contentComment']}
      rightText={date}
      // itemOnPress={() => onPress(item)}
      // badge1={totalComment}
      subListData={listPelajaran}
      renderRowBadge={() => {
        return <BadgePerRow listPelajaran={listPelajaran} />
      }}
      renderSubList={(subListData) => {
        return (<View style={{ flex: 1, backgroundColor: '#cdcdcd' }}>
          {
          subListData.map(subItem => (<ListItem key={subItem['_id']} onPress={onPress} >
            <Body>
              <Text>
                {subItem['title']}
              </Text>
            </Body>
            <Right>
              <Text note>
                {moment(new Date(subItem['tanggal'])).format('DD-MM/YY')}
              </Text>
              {<BadgePerSubRow contentId={subItem['_id']} />}
            </Right>
          </ListItem>))
        }
        </View>)
      }}
    //   avatar={avatar}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  // const { listPelajaran } = ownProps
  return {
    // totalComment: CommentSelectors.getTotalCommentByListContentId(state.comment, listPelajaran.map(row => row._id))
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
