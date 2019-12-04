import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import createSagaMiddleWare from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'

const sagaMiddleware = createSagaMiddleWare()
const middlewares = [sagaMiddleware]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

export default store
