import React from 'react'
import styled from 'styled-components'

import Input from './Input'

const PREFIX = `label-${Math.random().toString(36).slice(2)}`

const Root = styled.div`
  display: inline;

  @media (max-width: 999px) {
    width: 100%;
  }
`

const HiddenLabel = styled.label`
  display: none;
`

const InputWithHiddenLabel = ({
  label,
  children,
  ...props,
}) => {
  const id = `${PREFIX}-${label}`
  return (
    <Root>
      <HiddenLabel htmlFor={id}>
        {label}
      </HiddenLabel>
      <Input
        id={id}
        title={label}
        {...props}
      />
    </Root>
  )
}

export default InputWithHiddenLabel
