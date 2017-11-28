const RE = /^\w+$/

export default (login) =>
  typeof login === 'string' && RE.test(login)
