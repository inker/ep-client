import errorMessages from '../../errorMessages'

import {
  EXPIRE_AUTH_DATA,
} from '../Auth/ducks'

export const ADD_PHONE_NUMBER_REQUEST = 'easypay/Phone/ADD_PHONE_NUMBER_REQUEST'
export const ADD_PHONE_NUMBER_REQUEST_SUCCESS = 'easypay/Phone/ADD_PHONE_NUMBER_REQUEST_SUCCESS'

export const REMOVE_PHONE_NUMBER_REQUEST = 'easypay/Phone/REMOVE_PHONE_NUMBER_REQUEST'
export const REMOVE_PHONE_NUMBER_REQUEST_SUCCESS = 'easypay/Phone/REMOVE_PHONE_NUMBER_REQUEST_SUCCESS'

export const CHECK_PHONE_NUMBER_REQUEST = 'easypay/Phone/CHECK_PHONE_NUMBER_REQUEST'
export const CHECK_PHONE_NUMBER_REQUEST_SUCCESS = 'easypay/Phone/CHECK_PHONE_NUMBER_REQUEST_SUCCESS'

export const REQUEST_ERROR = 'easypay/Phone/REQUEST_ERROR'

function requestError(type) {
  return {
    type: REQUEST_ERROR,
    payload: {
      type,
      message: errorMessages[type] || 'Something went wrong',
    },
  }
}

function addPhoneNumberRequest(phoneNumber) {
  return {
    type: ADD_PHONE_NUMBER_REQUEST,
    payload: {
      phoneNumber,
    },
  }
}

function addPhoneNumberRequestSuccess(phoneNumber, added) {
  return {
    type: ADD_PHONE_NUMBER_REQUEST_SUCCESS,
    payload: {
      phoneNumber,
      added,
    },
  }
}

function removePhoneNumberRequest(phoneNumber) {
  return {
    type: REMOVE_PHONE_NUMBER_REQUEST,
    payload: {
      phoneNumber,
    },
  }
}

function removePhoneNumberRequestSuccess(phoneNumber, removed) {
  return {
    type: REMOVE_PHONE_NUMBER_REQUEST_SUCCESS,
    payload: {
      phoneNumber,
      removed,
    },
  }
}

function checkPhoneNumberRequest(phoneNumber) {
  return {
    type: CHECK_PHONE_NUMBER_REQUEST,
    payload: {
      phoneNumber,
    },
  }
}

function checkPhoneNumberRequestSuccess(phoneNumber, exists) {
  return {
    type: CHECK_PHONE_NUMBER_REQUEST_SUCCESS,
    payload: {
      phoneNumber,
      exists,
    },
  }
}

export const actions = {
  requestError,
  addPhoneNumberRequest,
  addPhoneNumberRequestSuccess,
  removePhoneNumberRequest,
  removePhoneNumberRequestSuccess,
  checkPhoneNumberRequest,
  checkPhoneNumberRequestSuccess,
}


/* REDUCER */

const initialState = {
  phoneNumber: null,
}

export default function (state = initialState, { type, payload = {} }) {
  const {
    phoneNumber,
    added,
    removed,
    exists,
  } = payload

  switch (type) {
    case EXPIRE_AUTH_DATA:
      return initialState

    case ADD_PHONE_NUMBER_REQUEST:
      return {
        phoneNumber,
        isLoading: true,
      }

    case ADD_PHONE_NUMBER_REQUEST_SUCCESS:
      return {
        ...state,
        phoneNumber,
        added,
        isLoading: false,
      }

    case REMOVE_PHONE_NUMBER_REQUEST:
      return {
        phoneNumber,
        isLoading: true,
      }

    case REMOVE_PHONE_NUMBER_REQUEST_SUCCESS:
      return {
        ...state,
        phoneNumber,
        removed,
        isLoading: false,
      }

    case CHECK_PHONE_NUMBER_REQUEST: {
      return {
        phoneNumber,
        isLoading: true,
      }
    }

    case CHECK_PHONE_NUMBER_REQUEST_SUCCESS:
      return {
        ...state,
        phoneNumber,
        exists,
        isLoading: false,
      }

    case REQUEST_ERROR:
      return {
        ...state,
        phoneNumber,
        isLoading: false,
        error: payload,
      }

    default:
      return state
  }
}
