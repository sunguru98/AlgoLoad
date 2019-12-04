import actionTypes from '../actionTypes'
const { SIGN_IN, SIGN_UP, SIGN_OUT } = actionTypes

export const signInUser = ({ email, password }) => ({
  type: SIGN_IN,
  payload: { email, password }
})

export const registerUser = ({ email, password, name }) => ({
  type: SIGN_UP,
  payload: { name, email, password }
})

export const signOutUser = () => ({
  type: SIGN_OUT
})
