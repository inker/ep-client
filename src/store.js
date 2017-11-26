import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import globalReducer from './reducer'

import authReducer from './containers/Auth/reducer'
import authSagas from './containers/Auth/sagas'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  auth: authReducer,
  // other reducers
})

const initialState = {}

const middleware = [
  routerMiddleware(browserHistory),
  sagaMiddleware,
]

const enhancers = [
  applyMiddleware(...middleware),
  autoRehydrate(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
]

const store = createStore(reducer, initialState, compose(...enhancers))

sagaMiddleware.run(authSagas)
// other sagas

export default store
