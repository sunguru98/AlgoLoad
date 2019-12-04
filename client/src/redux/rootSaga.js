import authSagas from './sagas/authSagas'
import { all, call } from 'redux-saga/effects'

export default function*() {
  yield all([call(authSagas)])
}
