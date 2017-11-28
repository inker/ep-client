import isMobilePhone from 'validator/lib/isMobilePhone'

export default (phoneNumber) =>
  isMobilePhone(phoneNumber, 'any')
