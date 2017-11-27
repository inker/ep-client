/**
 * instead of new Promise((resolve, reject) => { ... }),
 * use promiseWithTimeout((resolve, reject) => { ... }, timeout, errorMsg)
 */
export const promiseWithTimeout = (cb, timeout, errorMsg) => new Promise((resolve, reject) => {
  cb(resolve, reject)
  setTimeout(() => reject(new Error(errorMsg || `timeout ${timeout}`)), timeout)
})

/**
 * adds timelimit to a given promise
 */
export const timelimit = (promise, timeout, errorMsg) =>
  promiseWithTimeout((resolve, reject) => promise.then(resolve).catch(reject), timeout, errorMsg)
