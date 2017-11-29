import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import styled from 'styled-components'

import Loader from './components/Loader'

import store, { persistor } from './store'
import Routes from './routes'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
`

ReactDom.render(
  <Root>
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<Loader />}
      >
        <Routes />
      </PersistGate>
    </Provider>
  </Root>,
  document.getElementById('app'),
)
