import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import styled from 'styled-components'

import { createStructuredSelector } from 'reselect'

import Form from '../../components/Form'
import ErrorMessage from '../../components/ErrorMessage'
import Input from '../../components/Input'
import InputWithHiddenLabel from '../../components/InputWithHiddenLabel'

import { actions } from './ducks'
import { selectAuth } from './selectors'

const FormParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  self-align: center;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;

  @media (max-width: 999px) {
    width: 100%;
    font-size: 25px;
  }
`

class Login extends PureComponent {
  state = {
    login: '',
    password: '',
    isSubmitted: false,
  }

  onInputChange = (e) => {
    const { value } = e.target
    this.setState({
      ...this.state,
      login: value,
    })
  }

  onPasswordChange = (e) => {
    const { value } = e.target
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
    const { props, state } = this
    const errorMessage = get(props, 'auth.error.message')
    return (
      <FormParent>
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
        <Form onSubmit={this.onSubmit}>
          <InputWithHiddenLabel
            label="login"
            type="text"
            placeholder="Login"
            autoFocus
            onChange={this.onInputChange}
          />
          <InputWithHiddenLabel
            label="password"
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}            
          />
          <Input
            type="submit"
            value="Go"
          />
        </Form>
      </FormParent>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

const mapStateToProps = createStructuredSelector({
  auth: selectAuth(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
