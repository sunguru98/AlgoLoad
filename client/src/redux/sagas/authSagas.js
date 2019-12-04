import { all, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'
import actionTypes from '../actionTypes'
const { SIGN_IN, SIGN_OUT, SIGN_UP } = actionTypes

function* onSignin() {
  yield takeLatest(SIGN_IN, function*({ payload: { email, password } }) {
    try {
    } catch (err) {
      yield console.log(err)
      return
    }
  })
}

function* onSignup() {
  yield takeLatest(SIGN_UP, function*({ payload: { name, email, password } }) {
    try {
    } catch (err) {
      yield console.log(err)
      return
    }
  })
}

function* onSignout() {
  yield takeLatest(SIGN_OUT, function*() {
    try {
    } catch (err) {
      yield console.log(err)
      return
    }
  })
}

export default function*() {
  yield all([call(onSignin), call(onSignout), call(onSignup)])
}
