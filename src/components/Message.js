import styled from 'styled-components'

const Message = styled.span`
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  text-align: center;
  min-height: 35px;
  margin: 4px 2px 4px 2px;
  color: ${props => props.color};
`

export default Message
