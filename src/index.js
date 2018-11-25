import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import shallowEqual from './shallow-equal'
import { Store, Action, State, rootReducer } from 'redux-peach'
import { mapStringToObject, removeExtraDots } from 'object-maker'

const StoreContext = createContext(null)

export const Provider = StoreContext.Provider

export function useMapper(mapperExpression, name = '') {
  const { getState } = useContext(StoreContext)
  return useCallback(
    () => {
      if (mapperExpression instanceof Action) {
        return mapStringToObject(
          removeExtraDots([mapperExpression.getScope(), name].join('.')),
          getState(),
        )
      }
      if (mapperExpression instanceof Function) {
        return mapperExpression(getState())
      }
      if (typeof mapperExpression === typeof '') {
        return mapStringToObject(mapperExpression, getState())
      }
    },
    [mapperExpression],
  )
}

export function useStateMapper(mapperExpression, name) {
  const { subscribe } = useContext(StoreContext)
  const mapper = useMapper(mapperExpression, name)
  const [mappedState, mappedStateUpdater] = useState(mapper())
  useEffect(() =>
    subscribe(() => {
      if (!shallowEqual(mappedState, mapper())) {
        mappedStateUpdater(mapper())
      }
    }),
  )
  return mappedState
}

export function useAction(action) {
  const store = useContext(StoreContext)
  return useMemo(
    () => {
      action.hookToStore(store)
      return action.make()
    },
    [action],
  )
}

export function useDispatch(action) {
  const { dispatch } = useContext(StoreContext)
  useInitialState(action.getInitialState())
  const _action = useAction(action)
  return useMemo(() => (...args) => dispatch(_action(...args)), [action])
}

export function useFindAction(actionName) {
  const store = useContext(StoreContext)
  return Action.find(actionName, store)
}

export function useInitialState(initialState) {
  const store = useContext(StoreContext)
  useMemo(() => State.set(initialState, store), [initialState])
  return initialState
}

export { Store, Action, rootReducer }

export default StoreContext
