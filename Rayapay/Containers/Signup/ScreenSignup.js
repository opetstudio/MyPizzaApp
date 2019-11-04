import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { LoginSelectors } from '../Login/redux'
// import {TablepaginationSelectors} from '../../Containers/TablePagination/redux'
import { Redirect } from 'react-router-dom'
import ListAllUserComp from '../../Components/Usermanagement/ListAllUserComp'
import {isLoggedIn} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

class TheComponent extends React.PureComponent {
  render () {
    console.log('render')
    if (isLoggedIn(this.props.isLoggedIn) !== true) { return <Redirect to={`${basePath}/login`} /> }
    return (<ListAllUserComp {...this.props}
    />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    userMerchantCode: LoginSelectors.userMerchantCode(state.login),
    // tablepaginationResponseDescription: TablepaginationSelectors.responseDescription(state.tablepagination),
    // tablepaginationResponseCode: TablepaginationSelectors.responseCode(state.tablepagination)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
