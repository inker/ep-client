import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import { actions } from './ducks'

class Login extends PureComponent {
  state = {
    identifier: '',
    password: '',
    isSubmitted: false,
  }

  onInputChange = (e) => {
    const { value } = e.target
    console.log(value)
    this.setState({
      ...this.state,
      identifier: value,
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
    const { identifier, password } = state
    this.setState({
      ...state,
      isSubmitted: true,
    })
    props.actions.loginRequest(identifier, password)
  }

  render() {
    const { state } = this
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

const mapStateToProps = createStructuredSelector({
  // user: selectUser(),
  // rememberMe: selectRememberMe(),
  // isAccountDialogOpen: selectAccountDialogState(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
