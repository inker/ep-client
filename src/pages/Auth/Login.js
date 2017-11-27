import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import Form from '../../components/Form'

import { actions } from './ducks'
import { selectAuth } from './selectors'

class Login extends PureComponent {
  state = {
    login: '',
    password: '',
    isSubmitted: false,
  }

  onInputChange = (e) => {
    const { value } = e.target
    console.log(value)
    this.setState({
      ...this.state,
      login: value,
    })
  }

  onPasswordChange = (e) => {
    const { value } = e.target
    console.log(value)
    this.setState({
      ...this.state,
      password: value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { state, props } = this
    const { login, password } = state
    this.setState({
      isSubmitted: true,
    })
    props.actions.loginRequest(login, password)
  }

  render() {
    const { state } = this
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Login"
            onChange={this.onInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}            
          />
          <input
            type="submit"
            value="Go"
          />
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
