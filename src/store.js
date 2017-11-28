import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
// import { browserHistory } from 'react-router-dom'
// import { routerMiddleware, routerReducer } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import localForage from 'localforage'

import globalReducer from './reducer'

import authReducer from './pages/Auth/ducks'
import authSagas from './pages/Auth/sagas'

import phonesReducer from './pages/Phones/ducks'
import phonesSagas from './pages/Phones/sagas'

import history from './history'

const sagaMiddleware = createSagaMiddleware()
const routerMW = routerMiddleware(history)

const combinedReducers = combineReducers({
  router: routerReducer,
  global: globalReducer,
  auth: authReducer,
  phones: phonesReducer,
  // other reducers
})

const persistReducerConfig = {
  key: 'someKey',
  storage: localForage,
}

const reducer = persistReducer(persistReducerConfig, combinedReducers)

const initialState = {}

const middleware = [
  // routerMiddleware(browserHistory),
  routerMW,
  sagaMiddleware,
]

const enhancers = [
  applyMiddleware(...middleware),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
]

const store = createStore(reducer, initialState, compose(...enhancers))

sagaMiddleware.run(authSagas)
sagaMiddleware.run(phonesSagas)
// other sagas

export default store
