import actionTypes from '../actionTypes'
const { SIGN_IN, SIGN_UP, SIGN_OUT, SET_AUTH_ERROR, CLEAR_ERRORS } = actionTypes

export const signInUser = ({ email, password }) => ({
  type: SIGN_IN,
  payload: { email, password }
})

export const registerUser = ({ email, password, name }) => ({
  type: SIGN_UP,
  payload: { name, email, password }
})

export const logOutUser = () => ({
  type: SIGN_OUT
})

export const addErrorMessage = param => ({
  type: SET_AUTH_ERROR,
  payload: [param]
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})
