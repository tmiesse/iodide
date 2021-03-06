/* global IODIDE_BUILD_MODE IODIDE_REDUX_LOG_MODE */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createValidatedReducer from '../reducers/create-validated-reducer'
import reducer from './reducers/reducer'
import { stateSchema, newNotebook } from './eval-frame-state-prototypes'

let enhancer
let finalReducer

if (IODIDE_BUILD_MODE === 'production') {
  finalReducer = reducer
  enhancer = applyMiddleware(thunk)
} else if (IODIDE_BUILD_MODE === 'test' || IODIDE_REDUX_LOG_MODE === 'SILENT') {
  finalReducer = createValidatedReducer(reducer, stateSchema)
  enhancer = applyMiddleware(thunk)
} else {
  finalReducer = createValidatedReducer(reducer, stateSchema)
  enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger({
      predicate: (getState, action) => action.type !== 'UPDATE_INPUT_CONTENT',
      colors: { title: () => '#27ae60' },
    })),
  )
}

const initialState = newNotebook()

const store = createStore(finalReducer, initialState, enhancer)

const { dispatch } = store

export { store, dispatch }
