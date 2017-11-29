import { mapValues } from 'lodash'

import { server } from '../../config.json'

import request from './request'

const HOST = `//${server.host}:${server.port}`

/**
 * Converts key->obj to key->request
 */
export default (methods) =>
  mapValues(methods, (val, key) => {
    const { endpoint } = methods[key]
    return (auth, data) => request(`${HOST}/${endpoint}`, {
      auth,
      data,
    })
  })
