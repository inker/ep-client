import apify from '../utils/apify'

const methods = {
  login: {
    endpoint: 'auth/login',
  },
  logout: {
    endpoint: 'auth/logout',
  },
  verifyToken: {
    endpoint: 'auth/verify',
  },
}

export default apify(methods)
