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
import { selectPhones } from './selectors'

const FormParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  self-align: center;
  width: 300px;
  height: 300px;
  border: 1px solid gray;
  @media (max-width: 999px) {
    width: 100%;
    font-size: 24px;
  }
`

class Phones extends PureComponent {
  state = {
    phoneNumber: '',
  }

  onInputChange = (e) => {
    const { value } = e.target
    console.log(value)
    this.setState({
      ...this.state,
      phoneNumber: value,
    })
  }

  onAdd = (e) => {
    e.preventDefault()
    const { state, props } = this
    const { phoneNumber } = state
    this.setState({
      isSubmitted: true,
    })
    props.actions.addPhoneNumberRequest(phoneNumber)
  }

  onRemove = (e) => {
    e.preventDefault()
    const { state, props } = this
    const { phoneNumber } = state
    this.setState({
      isSubmitted: true,
    })
    props.actions.removePhoneNumberRequest(phoneNumber)
  }

  onCheck = (e) => {
    e.preventDefault()
    const { state, props } = this
    const { phoneNumber } = state
    this.setState({
      isSubmitted: true,
    })
    props.actions.checkPhoneNumberRequest(phoneNumber)
  }

  render() {
    const { props, state } = this
    const { phones } = props
    const error = get(props, 'phones.error')
    const type = error && error.type
    return (
      <FormParent>
        {phones.added && `Phone number ${phones.phoneNumber} added`}
        {phones.removed && `Phone number ${phones.phoneNumber} removed`}
        {phones.exists !== undefined &&
          `Phone number ${phones.phoneNumber} ${phones.exists ? 'exists' : 'does not exist'}`
        }
        <ErrorMessage>
          {type === 'NOT_FOUND' ? 'Phone number was not found' : error && error.message}
        </ErrorMessage>
        <Form onSubmit={this.onSubmit}>
          <InputWithHiddenLabel
            label="Number"
            type="text"
            placeholder="Phone number"
            autoFocus
            onChange={this.onInputChange}
          />
          <button onClick={this.onAdd}>
            Add
          </button>
          <button onClick={this.onRemove}>
            Remove
          </button>
          <button onClick={this.onCheck}>
            Check
          </button>
        </Form>
      </FormParent>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

const mapStateToProps = createStructuredSelector({
  phones: selectPhones(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Phones)
