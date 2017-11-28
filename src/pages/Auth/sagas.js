import { take, call, put, race, select, takeLatest } from 'redux-saga/effects'
import { get } from 'lodash'

import { REHYDRATE } from 'redux-persist'

import history from '../../history'
import authApi from '../../api/auth'

import validateLogin from '../../utils/validateLogin'
import validatePassword from '../../utils/validatePassword'

import {
  LOGIN_REQUEST,
  EXPIRE_AUTH_DATA,
  VERIFY_REQUEST,

  actions,
  LOGOUT_REQUEST,
} from './ducks'

import {
  selectAuth,
} from './selectors'

export function* getAccountAndSetAuthData(token) {
  console.log('getting and setting:', token)
  // const { response } = yield call(authApi.login, {
  //   auth_token: token,
  // })
  yield put(actions.setAuthData(token, null))
  history.push('/phone')
}

function* authorize(login, password) {
  return yield call(authApi.login, {
    login,
    password,
  })
}

function* goToLoginPage() {
  yield history.push('/login')
}

// ========== FLOWS ==========

function* verifyTokenFlow({ payload }) {
  console.log('verifying token', payload)
  const authData = get(payload, 'auth.data')
  if (!authData.token) {
    yield put(actions.expireAuthData())
  }
  const { error } = yield call(authApi.verifyToken, authData)
  if (error) {
    yield put(actions.expireAuthData())
  }
}

function* loginFlow({ payload }) {
  const { login, password } = payload
  if (!validateLogin(login)) {
    return yield put(actions.requestError('INVALID_LOGIN'))
  }
  if (!validatePassword(password)) {
    return yield put(actions.requestError('EMPTY_PASSWORD'))
  }
  const winner = yield race({
    login: call(authorize, login, password),
    logout: take(LOGOUT_REQUEST),
  })
  if (winner.logout) {
    console.log(winner.logout)
    yield call(goToLoginPage)
  } else if (winner.login) {
    console.log(winner.login)
    const { error, data } = winner.login
    console.log('auth', data)
    if (error) {
      return yield put(actions.requestError(error))
    }
    if (data.token) {
      yield call(getAccountAndSetAuthData, data.token)
    }
  }
}

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
