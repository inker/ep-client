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
    auth: call(authorize, identifier, password),
    logout: take(EXPIRE_AUTH_DATA),
  })
  if (winner.logout) {
    console.log(winner.logout)
    yield call(goToMain)
  } else if (winner.auth) {
    console.log(winner.auth)
    const { auth } = winner
    console.log('auth', auth)
    if (auth.token) {
      yield call(getAccountAndSetAuthData, auth.token)
    } else if (auth.two_factor) {
      yield put(setTwoFactorSession(auth.two_factor_session))
      yield put(push('/auth/twofactor'))
    }
  }
}

function* twoFactorFlow({ payload }) {
  const auth = yield select(selectAuth())
  const { token } = yield call(authApi.verify, {
    two_factor_session: auth.twoFactorSession,
    two_factor_secret: payload.secretCode,
  })
  yield call(getAccountAndSetAuthData, token)
}

function* logoutFlow() {
  yield call(goToMain)
}

export default function* authSaga() {
  yield [
    takeLatest(REHYDRATE, verifyTokenFlow),
    takeLatest(LOGIN_REQUEST, loginFlow),
    takeLatest(VERIFY_REQUEST, twoFactorFlow),
    takeLatest(EXPIRE_AUTH_DATA, logoutFlow),
  ]
}
