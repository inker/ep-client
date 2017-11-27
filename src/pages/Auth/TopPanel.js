import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createStructuredSelector } from 'reselect'

import Bold from '../../components/Bold'

import { actions } from './ducks'
import { selectAuth } from './selectors'

class TopPanel extends PureComponent {
  onLogOut = (e) => {
    this.props.actions.logoutRequest()
  }

  render() {
    const authData = this.props.auth.data
    if (!authData.token) {
      return (
        <Link to="/login">
          Login
        </Link>
      )
    }
    return (
      <div>
        Logged in as <Bold>
          {authData.login}
        </Bold>
        . <a onClick={this.onLogOut}>
          Log out
        </a>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

const mapStateToProps = createStructuredSelector({
  auth: selectAuth(),
  // user: selectUser(),
  // rememberMe: selectRememberMe(),
  // isAccountDialogOpen: selectAccountDialogState(),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)
