import styled from 'styled-components'

const Button = styled.button`
  width: 200px;
  height: 30px;
  font-size: 15px;
  margin: 2px;
  @media (max-width: 999px) {
    width: 100%;
    height: 100px;
    font-size: 25px;
  }
`

export default Button
