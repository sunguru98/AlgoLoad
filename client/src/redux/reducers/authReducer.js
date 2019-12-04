import actionTypes from '../actionTypes'
const { SET_USER, SET_ACCESS_TOKEN, CLEAR_USER } = actionTypes

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  loading: false
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER:
      localStorage.setItem('user', JSON.stringify(payload))
      return { ...state, user: payload }
    case SET_ACCESS_TOKEN:
      localStorage.setItem('accessToken', payload)
      return { ...state, accessToken: payload }
    case CLEAR_USER:
      localStorage.removeItem('user')
      localStorage.removeItem('acessToken')
      return { user: null, accessToken: null, loading: false }
    default:
      return state
  }
}
