import actionTypes from '../actionTypes'
const { SET_IMAGE_DATAS, SET_IMAGE_LOADING } = actionTypes

const initialState = {
  datas: [],
  loading: false
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_IMAGE_DATAS:
      return { ...state, datas: [...payload] }
    case SET_IMAGE_LOADING:
      return { ...state, loading: payload }
    default:
      return state
  }
}
