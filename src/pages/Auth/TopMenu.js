import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'

import Bold from '../../components/Bold'
import PseudoLink from '../../components/PseudoLink'

import { actions } from './ducks'
import { selectAuth } from './selectors'

const Root = styled.div`
  margin: 10px 0 10px 0;
  font-size: 15px;

  @media (max-width: 999px) {
    font-size: 25px;
  }  
`

class TopMenu extends PureComponent {
  onLogOut = (e) => {
    this.props.actions.logoutRequest()
  }

  render() {
    const authData = this.props.auth.data
    return (
      <Root>
        {authData.token
          ?
          <div>
            Logged in as <Bold>
              {authData.login}
            </Bold>
            . <PseudoLink onClick={this.onLogOut}>
              Sign out
            </PseudoLink>
          </div>
          :
          <Link to="/login">
            Sign in
      </Link>
        }
      </Root>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)
