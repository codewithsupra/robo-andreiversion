import { configureStore, type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { robotsReducer } from './reducer'
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    robotsReducer: robotsReducer as Reducer<ReturnType<typeof robotsReducer>, UnknownAction>
  },
  middleware: (getDefaultMiddleware) => {
    const base = getDefaultMiddleware();
    return import.meta.env.DEV ? base.concat(logger) : base
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
