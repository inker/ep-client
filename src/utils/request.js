import config from '../../config.json'
import { timelimit } from './promise-timeout'

const { requestTimeout } = config

const method = 'POST'
const headers = {
  'Content-Type': 'application/json',
}

const CONNECTION_ERROR = 'CONNECTION_ERROR'

export default async (url, json) => {
  try {
    const data = {
      method,
      headers,
      body: JSON.stringify(json),
    }
    const reqPromise = fetch(url, data)
    const res = await timelimit(reqPromise, requestTimeout)
    if (!res.ok) {
      return {
        error: CONNECTION_ERROR,
      }
    }
    return res.json()
  } catch (err) {
    console.error(err)
    return {
      error: CONNECTION_ERROR,
    }
  }
}
