import config from '../../config.json'
import { timelimit } from './promise-timeout'

const { requestTimeout } = config

const method = 'POST'
const headers = {
  'Content-Type': 'application/json',
}

export default async (url, json) => {
  const data = {
    method,
    headers,
    body: JSON.stringify(json),
  }
  const reqPromise = fetch(url, data)
  const res = await timelimit(reqPromise, requestTimeout)
  return res.json()
}
