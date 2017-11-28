import styled from 'styled-components'

const Input = styled.input`
  width: 200px;
  height: 30px;
  font-size: 15px;
  @media (max-width: 999px) {
    width: 100%;
    height: 50px;
    font-size: 24px;
  }
`

export default Input
