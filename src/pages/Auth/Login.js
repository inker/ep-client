import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import {
  requestAuthData,
} from '../actions'

class Auth extends PureComponent {
  state = {
    identifier: '',
    password: '',
    isSubmitted: false,
  }

  onInputChange = (e) => {
    const { id, value } = e.target
    console.log(value)
    if (id.includes('password')) {
      this.setState({
        ...this.state,
        password: value,
      })
    } else if (id.includes('identifier')) {
      e.target.type = /\+\d+/.test(value) ? 'tel' : 'email'
      this.setState({
        ...this.state,
        identifier: value,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { state, props } = this
    const { identifier, password } = state
    console.log(this.state)
    this.setState({
      ...state,
      isSubmitted: true,
    })
    props.loginRequest(identifier, password)
  }

  render() {
    const { state } = this
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="text-center m-b-md">
            <h3>PLEASE LOGIN TO APP</h3>
            <small>This is the best app ever!</small>
          </div>
          <div className="hpanel">
            <div className="panel-body">
              <form action="#" id="loginForm">
                <div className="form-group">
                  <label className="control-label" htmlFor="identifier">identifier</label>
                  <input
                    id="identifier-input"
                    value={state.identifier}
                    onChange={this.onInputChange}
                    type="email"
                    placeholder="example@gmail.com"
                    title="Please enter you identifier"
                    required=""
                    name="identifier"
                    className="form-control"
                  />
                  <span className="help-block small">Your unique identifier to app</span>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="password">Password</label>
                  <input
                    id="password-input"
                    value={state.password}
                    onChange={this.onInputChange}
                    type="password"
                    title="Please enter your password"
                    placeholder="******"
                    required=""
                    name="password"
                    className="form-control"
                  />
                  <span className="help-block small">Yur strong password</span>
                </div>
                <div className="checkbox">
                  <div className="icheckbox_square-green checked" style={{ position: 'relative' }}>
                    <input
                      type="checkbox"
                      className="i-checks"
                      checked=""
                      style={{ position: 'absolute', opacity: 0 }}
                    />
                    <ins
                      className="iCheck-helper"
                      style={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        margin: '0px',
                        padding: '0px',
                        background: 'rgb(255, 255, 255)',
                        border: '0px',
                        opacity: '0',
                      }}
                    />
                  </div>
                  Remember login
                  <p className="help-block small">(if this is a private computer)</p>
                </div>
                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Login"
                  onClick={this.onSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (identifier, password) =>
    dispatch(requestAuthData(identifier, password)),
  // changeRoute: (url) => dispatch(push(url)),
  // // verifyToken: (authToken) => dispatch(verifyToken(authToken)),
  // expireAuthData: () => dispatch(expireAuthData()),
  // toggleAccountDialog: (value) => dispatch(toggleAccountDialog(value)),
  // requestAuthData: (email, password, rememberMe) => dispatch(requestAuthData(email, password, rememberMe)),
})

const mapStateToProps = createStructuredSelector({
  // user: selectUser(),
  // rememberMe: selectRememberMe(),
  // isAccountDialogOpen: selectAccountDialogState(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
