import { call, put, select, takeLatest } from 'redux-saga/effects'

import phonesApi from '../../api/phones'

import validatePhoneNumber from '../../utils/validatePhoneNumber'

import {
  actions,
  ADD_PHONE_NUMBER_REQUEST,
  REMOVE_PHONE_NUMBER_REQUEST,
  CHECK_PHONE_NUMBER_REQUEST,
} from './ducks'

import {
  selectAuth,
} from '../Auth/selectors'

// ========== FLOWS ==========

function* addPhoneNumber({ payload }) {
  const auth = yield select(selectAuth())
  const { phoneNumber } = payload
  if (!validatePhoneNumber(phoneNumber)) {
    return yield put(actions.requestError('INVALID_PHONE_NUMBER'))
  }

  const { error, data } = yield call(phonesApi.addOne, auth.data, {
    phoneNumber,
  })
  if (error) {
    return yield put(actions.requestError(error))
  }
  yield put(actions.addPhoneNumberRequestSuccess(data.phoneNumber, true))
}

function* removePhoneNumber({ payload }) {
  const auth = yield select(selectAuth())
  const { phoneNumber } = payload
  if (!validatePhoneNumber(phoneNumber)) {
    return yield put(actions.requestError('INVALID_PHONE_NUMBER'))
  }

  const { error, data } = yield call(phonesApi.removeOne, auth.data, {
    phoneNumber,
  })
  if (error) {
    return yield put(actions.requestError(error))
  }
  if (!data.phoneNumber) {
    return yield put(actions.requestError('NOT_FOUND'))
  }
  yield put(actions.removePhoneNumberRequestSuccess(data.phoneNumber, true))
}

function* checkPhoneNumber({ payload }) {
  const auth = yield select(selectAuth())
  const { phoneNumber } = payload
  if (!validatePhoneNumber(phoneNumber)) {
    return yield put(actions.requestError('INVALID_PHONE_NUMBER'))
  }

  const { error, data } = yield call(phonesApi.check, auth.data, {
    phoneNumber,
  })
  if (error) {
    return yield put(actions.requestError(error))
  }
  yield put(actions.checkPhoneNumberRequestSuccess(phoneNumber, data.exists))
}

export default function* phonesSaga() {
  yield [
    takeLatest(ADD_PHONE_NUMBER_REQUEST, addPhoneNumber),
    takeLatest(REMOVE_PHONE_NUMBER_REQUEST, removePhoneNumber),
    takeLatest(CHECK_PHONE_NUMBER_REQUEST, checkPhoneNumber),
  ]
}
