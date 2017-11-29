import apify from '../utils/apify'

const methods = {
  addOne: {
    endpoint: 'phones/add',
  },
  removeOne: {
    endpoint: 'phones/remove',
  },
  check: {
    endpoint: 'phones/check',
  },
}

export default apify(methods)
