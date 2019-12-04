import { all, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'
import actionTypes from '../actionTypes'
import history from '../createHistory'

const {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SET_AUTH_ERROR,
  SET_USER,
  CLEAR_USER,
  SET_ACCESS_TOKEN,
  SET_AUTH_LOADING
} = actionTypes

function* onSignin() {
  yield takeLatest(SIGN_IN, function*({ payload: { email, password } }) {
    try {
      yield put({ type: SET_AUTH_LOADING, payload: true })
      const {
        data: { user, accessToken }
      } = yield Axios.post('/api/user/signin', { email, password })
      Axios.defaults.headers.common['Authorization'] = accessToken
      yield put({ type: SET_USER, payload: user })
      yield put({ type: SET_ACCESS_TOKEN, payload: accessToken })
      yield history.push('/dashboard')
    } catch (err) {
      if (err.response.data.statusCode === 401) {
        yield alert('Incorrect Credentials')
        return
      }
      const errorMessages = err.response.data.message
      yield put({ type: SET_AUTH_ERROR, payload: errorMessages })
    } finally {
      yield put({ type: SET_AUTH_LOADING, payload: false })
      return
    }
  })
}

function* onSignup() {
  yield takeLatest(SIGN_UP, function*({ payload: { name, email, password } }) {
    try {
      yield put({ type: SET_AUTH_LOADING, payload: true })
      const {
        data: { user, accessToken }
      } = yield Axios.post('/api/user/register', { name, email, password })
      Axios.defaults.headers.common['Authorization'] = accessToken
      yield put({ type: SET_USER, payload: user })
      yield put({ type: SET_ACCESS_TOKEN, payload: accessToken })
      yield history.push('/dashboard')
    } catch (err) {
      const errorMessages = err.response.data.message
      yield put({ type: SET_AUTH_ERROR, payload: errorMessages })
    } finally {
      yield put({ type: SET_AUTH_LOADING, payload: false })
      return
    }
  })
}

function* onSignout() {
  yield takeLatest(SIGN_OUT, function*() {
    try {
      yield put({ type: CLEAR_USER })
      yield history.push('/')
      yield Axios.delete('/api/user/logout')
      return
    } catch (err) {
      yield console.log(err)
      return
    }
  })
}

export default function*() {
  yield all([call(onSignin), call(onSignout), call(onSignup)])
}
