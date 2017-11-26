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

export function setTwoFactorSession(twoFactorSession) {
  return {
    type: TWO_FACTOR_SESSION,
    payload: {
      twoFactorSession,
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

export function registerRequest(password, twoFactor) {
  return {
    type: REGISTER_REQUEST,
    payload: {
      password,
      twoFactor,
    },
  }
}

export function registerSuccess(value, error) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      value,
    },
    error,
  }
}
