import authSagas from './sagas/authSagas'
import imageSagas from './sagas/imageSagas'
import { all, call } from 'redux-saga/effects'

export default function*() {
  yield all([call(authSagas), call(imageSagas)])
}
