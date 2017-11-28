import { take, call, put, race, select, takeLatest } from 'redux-saga/effects'
import { get } from 'lodash'

import { REHYDRATE } from 'redux-persist'

import history from '../../history'
import authApi from '../../api/auth'

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

function* goToMain() {
  yield history.push('/')
}

// ========== FLOWS ==========

function verifyTokenFlow({ payload }) {
  console.log('verifying token', payload)
  const token = get(payload, 'auth.data.token')
  if (!token) {
    history.push('/login')
  }
}

function* loginFlow({ payload }) {
  const { login, password } = payload
  const winner = yield race({
    login: call(authorize, login, password),
    logout: take(LOGOUT_REQUEST),
  })
  if (winner.logout) {
    console.log(winner.logout)
    yield call(goToMain)
  } else if (winner.login) {
    console.log(winner.login)
    const { error, data } = winner.login
    console.log('auth', data)
    if (error) {
      yield put(actions.requestError(error))
      return
    }
    if (data.token) {
      yield call(getAccountAndSetAuthData, data.token)
    }
  }
}

function* logoutFlow() {
  const auth = yield select(selectAuth())
  const { error, data } = yield call(authApi.logout, auth.data)
  if (error) {
    yield put(actions.requestError(error))
    return
  }
  yield put(actions.expireAuthData())
}

export default function* authSaga() {
  yield [
    takeLatest(REHYDRATE, verifyTokenFlow),
    takeLatest(LOGIN_REQUEST, loginFlow),
    takeLatest(LOGOUT_REQUEST, logoutFlow),
  ]
}
