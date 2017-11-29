import { take, call, put, race, select, takeLatest } from 'redux-saga/effects'
import { get } from 'lodash'

import { REHYDRATE } from 'redux-persist'

import history from '../../history'
import authApi from '../../api/auth'

import validateLogin from '../../utils/validateLogin'
import validatePassword from '../../utils/validatePassword'
import { selectPathname } from '../../utils/selectors'

import {
  actions,

  LOGIN_REQUEST,
  EXPIRE_AUTH_DATA,
  LOGOUT_REQUEST,
} from './ducks'

import {
  selectAuth,
} from './selectors'

function* getAccountAndSetAuthData(token) {
  yield put(actions.setAuthData(token, null))
  history.push('/phones')
}

function* authorize(login, password) {
  return yield call(authApi.login, {
    login,
    password,
  })
}

function goToIndexPage() {
  history.push('/')
}

function goToLoginPage() {
  history.push('/login')
}

// ========== FLOWS ==========

// verify token on start
function* verifyTokenFlow({ payload }) {
  const authData = get(payload, 'data', {})
  if (!authData.token) {
    return yield put(actions.expireAuthData())
  }
  const { error } = yield call(authApi.verifyToken, authData)
  if (error) {
    return yield put(actions.expireAuthData())
  }
  const pathname = yield select(selectPathname())
  if (pathname === '/login') {
    goToIndexPage()
  }
}

// when the user sends login request
function* loginFlow({ payload }) {
  const { login, password } = payload

  if (!validateLogin(login)) {
    return yield put(actions.requestError({
      type: 'INVALID_LOGIN',
    }))
  }

  if (!validatePassword(password)) {
    return yield put(actions.requestError({
      type: 'EMPTY_PASSWORD',
    }))
  }

  const winner = yield race({
    login: call(authorize, login, password),
    logout: take(LOGOUT_REQUEST),
  })

  if (winner.login) {
    const { error, data } = winner.login
    if (error) {
      return yield put(actions.requestError(error))
    }
    if (data.token) {
      yield call(getAccountAndSetAuthData, data.token)
    }
  }
}

// when the user sends logout request
function* logoutFlow() {
  const auth = yield select(selectAuth())
  const { error } = yield call(authApi.logout, auth.data)
  if (error) {
    return yield put(actions.requestError(error))
  }
  yield put(actions.expireAuthData())
}

export default function* authSaga() {
  yield [
    takeLatest(REHYDRATE, verifyTokenFlow),
    takeLatest(LOGIN_REQUEST, loginFlow),
    takeLatest(LOGOUT_REQUEST, logoutFlow),
    takeLatest(EXPIRE_AUTH_DATA, goToLoginPage),
  ]
}
