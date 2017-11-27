import { take, call, put, race, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { get } from 'lodash'

import { REHYDRATE } from 'redux-persist'
import authApi from '../../api/auth'

import {
  LOGIN_REQUEST,
  EXPIRE_AUTH_DATA,
  VERIFY_REQUEST,

  setAuthData,
} from './ducks'

import {
  selectAuth,
} from './selectors'

export function* getAccountAndSetAuthData(token) {
  console.log('getting and setting:', token)
  // const { response } = yield call(authApi.login, {
  //   auth_token: token,
  // })
  yield put(setAuthData(token, null))
  yield put(push('/dashboard'))
}

function* authorize(login, password) {
  return yield call(authApi.login, {
    login,
    password,
  })
}

function* goToMain() {
  yield put(push('/'))
}

// ========== FLOWS ==========

function* verifyTokenFlow({ payload }) {
  console.log('verifying token', payload)
  // if (NO_TOKEN_CONFIRM_URI_REGEX.test(location.pathname)) {
  //   continue // eslint-disable-line no-continue
  // }
  const token = get(payload, 'auth.auth.token')
  if (token) {
    // yield race({
    //   account: call(getAccountAndSetAuthData, token),
    //   logout: take(EXPIRE_AUTH_DATA),
    // })
  } else if (!location.pathname.includes('/auth')) {
    yield call(goToMain)
  }
}

function* loginFlow({ payload }) {
  const { identifier, password } = payload
  const winner = yield race({
    login: call(authorize, identifier, password),
    logout: take(EXPIRE_AUTH_DATA),
  })
  if (winner.logout) {
    console.log(winner.logout)
    yield call(goToMain)
  } else if (winner.auth) {
    console.log(winner.login)
    const { data } = winner.auth
    console.log('auth', data)
    if (data.token) {
      yield call(getAccountAndSetAuthData, data.token)
    }
  }
}

function* logoutFlow() {
  yield call(goToMain)
}

export default function* authSaga() {
  yield [
    takeLatest(REHYDRATE, verifyTokenFlow),
    takeLatest(LOGIN_REQUEST, loginFlow),
    takeLatest(EXPIRE_AUTH_DATA, logoutFlow),
  ]
}
