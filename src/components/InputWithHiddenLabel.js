import React from 'react'
import styled from 'styled-components'

const PREFIX = `label-${Math.random().toString(36).slice(2)}`

const Root = styled.div`
  display: inline;
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
      <input
        id={id}
        title={label}
        {...props}
      />
    </Root>
  )
}

export default InputWithHiddenLabel
