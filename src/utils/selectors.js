import { get } from 'lodash'

export const selectPathname = () => (state) => get(state, 'router.location.pathname')
