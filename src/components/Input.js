import styled from 'styled-components'

const Input = styled.input`
  width: 200px;
  height: 30px;
  font-size: 15px;
  margin: 2px;

  @media (max-width: 999px) {
    width: 100%;
    height: 50px;
    font-size: 25px;
  }
`

export default Input
