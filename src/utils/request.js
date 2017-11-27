import config from '../../config.json'
import { timelimit } from './promise-timeout'

const { requestTimeout } = config

const method = 'POST'
const headers = {
  'Content-Type': 'application/json',
}

export default (url, json) => {
  const data = {
    method,
    headers,
    body: JSON.stringify(json),
  }
  return timelimit(fetch(url, data), requestTimeout).then((res) => res.json())
}
