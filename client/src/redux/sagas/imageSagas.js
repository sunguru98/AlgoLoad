import actionTypes from '../actionTypes'
import Axios from 'axios'
import { put, takeLatest, all, call, delay } from 'redux-saga/effects'
import history from '../createHistory'

const { UPLOAD_IMAGE, SET_USER, SET_IMAGE_LOADING } = actionTypes

function* onImageUpload() {
  yield takeLatest(UPLOAD_IMAGE, function*({ payload }) {
    try {
      yield put({ type: SET_IMAGE_LOADING, payload: true })

      const {
        data: { user }
      } = yield Axios.post('/api/image', payload)

      yield put({ type: SET_USER, payload: user })
      yield alert('Upload Successful')
      yield history.push('/dashboard')
    } catch (err) {
      yield alert(err)
      return
    } finally {
      yield put({ type: SET_IMAGE_LOADING, payload: false })
      return
    }
  })
}

export default function*() {
  yield all([call(onImageUpload)])
}
