import { REHYDRATE } from 'redux-persist'
import { get } from 'lodash'

export const LOGIN_REQUEST = 'easypay/Auth/LOGIN_REQUEST'

export const VERIFY_AUTH_TOKEN = 'easypay/Auth/VERIFY_AUTH_TOKEN'
export const SET_AUTH_DATA = 'easypay/Auth/SET_AUTH_DATA'
export const EXPIRE_AUTH_DATA = 'easypay/Auth/EXPIRE_AUTH_DATA'
export const VERIFY_REQUEST = 'easypay/Auth/VERIFY_REQUEST'
export const REQUEST_ERROR = 'easypay/Auth/REQUEST_ERROR'

export function requestError(type, message, cause, backtrace) {
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

export function requestAuthData(identifier, password, rememberMe) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      identifier,
      password,
      rememberMe,
    },
  }
}

export function verifyRequest(secretCode) {
  return {
    type: VERIFY_REQUEST,
    payload: {
      secretCode,
    },
  }
}

export function setAuthData(token, accountInfo) {
  return {
    type: SET_AUTH_DATA,
    payload: {
      token,
      accountInfo,
    },
  }
}

export function expireAuthData() {
  return {
    type: EXPIRE_AUTH_DATA,
    payload: {
      token: null,
    },
  }
}

export function verifyAuthToken(value) {
  return {
    type: VERIFY_AUTH_TOKEN,
    payload: {
      value,
    },
  }
}


/* REDUCER */

function onRehydrate(state, payload) {
  const auth = get(payload, 'auth.auth')
  return auth ? {
    ...state,
    auth,
    // specialKey: processSpecial(incoming.specialKey),
  } : state
}

const initialState = {
  auth: {
    token: null,
  },
}

export default function (state = initialState, { type, payload = {} }) {
  const { identifier, token } = state.auth
  switch (type) {
    case REHYDRATE:
      return onRehydrate(state, payload)

    case SET_AUTH_DATA:
      return {
        ...state,
        auth: {
          // email: payload.accountInfo.email,
          token: payload.token,
        },
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        auth: {
          identifier,
          ...payload,
        },
        isLoading: true,
        registerSuccess: false,
        passwordResetSuccess: false,
        passwordUpdateSuccess: false,
        addPaymentCardSuccess: false,
      }

    case VERIFY_REQUEST: {
      return {
        ...state,
        auth: {
          twoFactorSession: state.auth.twoFactorSession,
          secretCode: payload.secretCode,
        },
        isLoading: true,
      }
    }

    default:
      return state
  }
}
