import apify from '../utils/apify'

const methods = {
  addOne: {
    endpoint: 'phones/add',
    required: ['data'],
  },
  removeOne: {
    endpoint: 'phones/remove',
    required: ['data'],
  },
  check: {
    endpoint: 'phones/check',
    required: ['auth'],
  },
}

export default apify(methods)
