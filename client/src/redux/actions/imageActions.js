import actionTypes from '../actionTypes'
const { UPLOAD_IMAGE } = actionTypes

export const uploadImage = formData => ({
  type: UPLOAD_IMAGE,
  payload: formData
})