import apify from '../utils/apify'

const methods = {
  login: {
    endpoint: 'auth/login',
    required: ['data'],
  },
  logout: {
    endpoint: 'auth/logout',
    required: ['data'],
  },
  verifyToken: {
    endpoint: 'auth/verify',
    required: ['auth'],
  },
}

export default apify(methods)
