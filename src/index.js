import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import store from './store'
import Routes from './routes'

const persistor = persistStore(store)

ReactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
)
