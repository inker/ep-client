import { REHYDRATE } from 'redux-persist'
import { get } from 'lodash'

import errorMessages from '../../errorMessages'

/* CONSTANTS */

export const LOGIN_REQUEST = 'easypay/Auth/LOGIN_REQUEST'
export const SET_AUTH_TOKEN = 'easypay/Auth/SET_AUTH_TOKEN'

export const LOGOUT_REQUEST = 'easypay/Auth/LOGOUT_REQUEST'
export const EXPIRE_AUTH_DATA = 'easypay/Auth/EXPIRE_AUTH_DATA'

export const REQUEST_ERROR = 'easypay/Auth/REQUEST_ERROR'

/* ACTIONS */

function requestError(error) {
  const { type, message } = error
  return {
    type: REQUEST_ERROR,
    payload: {
      type,
      message: message || errorMessages[type] || 'Something went wrong',
    },
  }
}

function loginRequest(login, password, rememberMe) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      login,
      password,
      rememberMe,
    },
  }
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}

function setAuthData(token, accountInfo) {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      token,
      accountInfo,
    },
  }
}

function expireAuthData() {
  return {
    type: EXPIRE_AUTH_DATA,
    payload: {
      token: null,
    },
  }
}

export const actions = {
  requestError,
  loginRequest,
  logoutRequest,
  setAuthData,
  expireAuthData,
}


/* REDUCER */

function onRehydrate(state, payload) {
  const data = get(payload, 'auth.data')
  return data ? {
    ...state,
    data,
    error: null,
  } : state
}

const initialState = {
  data: {
    token: null,
  },
}

export default function (state = initialState, { type, payload = {} }) {
  const { login } = state.data
  switch (type) {
    case REHYDRATE:
      return onRehydrate(state, payload)

    case LOGIN_REQUEST:
      return {
        ...state,
        data: {
          login: payload.login,
        },
        isLoading: true,
      }

    case SET_AUTH_TOKEN:
      return {
        ...state,
        data: {
          login,
          token: payload.token,
        },
        isLoading: false,
      }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case EXPIRE_AUTH_DATA:
      return {
        data: {},
        isLoading: false,
      }

    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }

    default:
      return state
  }
}
