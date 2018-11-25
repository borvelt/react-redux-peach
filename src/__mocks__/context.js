import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from 'redux-peach'
import { createLogger } from 'redux-logger'
import { createContext } from 'react'

const store = createStore(
  rootReducer({}),
  compose(
    applyMiddleware(
      thunkMiddleware,
      createLogger({
        stateTransformer: state => state.__,
      }),
    ),
  ),
)

const StoreContext = createContext(store)

export default StoreContext
