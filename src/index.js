import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import styled from 'styled-components'

import Loader from './components/Loader'

import store from './store'
import Routes from './routes'

const persistor = persistStore(store)

const Root = styled.div`
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
