import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './reducer/appSlice'
import authReducer from './reducer/authSlice'
import { api as authApi } from './services/authService'
import { api as deviceApi } from './services/deviceService'


const persistConfig = {
  key: 'root',
  storage,
}

const reducer =   combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [deviceApi.reducerPath]: deviceApi.reducer,
  auth: authReducer,
  app: appReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },}).concat(authApi.middleware).concat(deviceApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default () => {
  let persistor = persistStore(store)
  return { store, persistor }
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
