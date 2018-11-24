import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from 'react-redux-peach'
import { createLogger } from 'redux-logger'
import { createContext } from 'react'

const context = jest.genMockFromModule('context')

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

context.store = createContext(store)

export default context
