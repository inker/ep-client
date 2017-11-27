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
import { routerMiddleware } from 'react-router-redux'
import localForage from 'localforage'

import globalReducer from './reducer'

import authReducer from './pages/Auth/ducks'
import authSagas from './pages/Auth/sagas'

import history from './history'

const sagaMiddleware = createSagaMiddleware()
const routerMW = routerMiddleware(history)

const persistReducerConfig = {
  key: 'auth',
  storage: localForage,
}

const reducer = combineReducers({
  global: globalReducer,
  auth: persistReducer(persistReducerConfig, authReducer),
  // other reducers
})

const initialState = {}

const middleware = [
  // routerMiddleware(browserHistory),
  routerMW,
  sagaMiddleware,
]

const enhancers = [
  applyMiddleware(...middleware),
  // autoRehydrate(),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
]

const store = createStore(reducer, initialState, compose(...enhancers))

sagaMiddleware.run(authSagas)
// other sagas

export default store
