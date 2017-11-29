import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  height: 500px;

  @media (max-width: 999px) {
    width: 100%;
    font-size: 2em;
  }
`

export default Page
