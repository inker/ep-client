import apify from '../../util/apify'

const methods = {
  login: {
    endpoint: 'auth',
    required: ['data'],
  },
  verify: {
    endpoint: 'auth.two.factor',
    required: ['auth'],
  },
  join: {
    endpoint: 'auth.reg.confirm',
    required: ['data'],
  },
}

export default apify(methods, 'http')
