import actionTypes from '../actionTypes'
const {
  SET_USER,
  SET_ACCESS_TOKEN,
  CLEAR_USER,
  CLEAR_ERRORS,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING
} = actionTypes

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  loading: false,
  errors: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER:
      localStorage.setItem('user', JSON.stringify(payload))
      return { ...state, user: payload }

    case SET_AUTH_ERROR:
      return { ...state, errors: [...payload] }

    case SET_ACCESS_TOKEN:
      localStorage.setItem('accessToken', payload)
      return { ...state, accessToken: payload }

    case SET_AUTH_LOADING:
      return { ...state, loading: payload }

    case CLEAR_USER:
      localStorage.removeItem('user')
      localStorage.removeItem('acessToken')
      return {
        user: null,
        accessToken: null,
        loading: false,
        errors: null
      }

    case CLEAR_ERRORS:
      return { ...state, errors: null }
    default:
      return state
  }
}
