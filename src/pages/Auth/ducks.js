import { REHYDRATE } from 'redux-persist'
import { get } from 'lodash'

export const LOGIN_REQUEST = 'easypay/Auth/LOGIN_REQUEST'
export const SET_AUTH_TOKEN = 'easypay/Auth/SET_AUTH_TOKEN'

export const VERIFY_AUTH_TOKEN = 'easypay/Auth/VERIFY_AUTH_TOKEN'

export const EXPIRE_AUTH_DATA = 'easypay/Auth/EXPIRE_AUTH_DATA'
export const VERIFY_REQUEST = 'easypay/Auth/VERIFY_REQUEST'
export const REQUEST_ERROR = 'easypay/Auth/REQUEST_ERROR'

function requestError(type, message, cause, backtrace) {
  return {
    type: REQUEST_ERROR,
    payload: {
      type,
      message,
      cause,
      backtrace,
    },
  }
}

function loginRequest(identifier, password, rememberMe) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      identifier,
      password,
      rememberMe,
    },
  }
}

function verifyRequest(secretCode) {
  return {
    type: VERIFY_REQUEST,
    payload: {
      secretCode,
    },
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

function verifyAuthToken(value) {
  return {
    type: VERIFY_AUTH_TOKEN,
    payload: {
      value,
    },
  }
}

export const actions = {
  requestError,
  loginRequest,
  verifyRequest,
  setAuthData,
  expireAuthData,
  verifyAuthToken,
}


/* REDUCER */

function onRehydrate(state, payload) {
  const data = get(payload, 'auth.data')
  return data ? {
    ...state,
    data,
    // specialKey: processSpecial(incoming.specialKey),
  } : state
}

const initialState = {
  data: {
    token: null,
  },
}

export default function (state = initialState, { type, payload = {} }) {
  const { identifier, token } = state.data
  switch (type) {
    case REHYDRATE:
      return onRehydrate(state, payload)

    case LOGIN_REQUEST:
      return {
        ...state,
        data: {
          ...payload,
        },
        isLoading: true,
      }

    case SET_AUTH_TOKEN:
      return {
        ...state,
        data: {
          token: payload.token,
        },
        isLoading: false,
      }

    default:
      return state
  }
}
