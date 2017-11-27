import { server } from '../../config.json'

import request from './request'

const url = `//${server.host}:${server.port}`

export default (methods) => {
  const obj = {}
  for (const key of Object.keys(methods)) {
    const { endpoint } = methods[key]
    obj[key] = (auth, data) => request(`${url}/${endpoint}/${key}`, {
      auth,
      data,
    })
  }
  console.log(obj)
  return obj
}
