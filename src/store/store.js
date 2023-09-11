import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
})

// /////
// import { configureStore } from '@reduxjs/toolkit'
// import { rootReducer } from './root-reducer'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // local storage default
// import logger from 'redux-logger'

// // Configuration object for the redux persist; storage (shorthand) on browser's local storage; whitelist the cart and categories, not the user
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'],
//   // whitelist: ['cart', 'categories'],
// }

// // It takes two values: the config object and the reducer we want to save
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// // Enable the logger only in develop mode
// const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
//   Boolean
// )

// // Create redux toolkit store; pass the persisted reducer (based on the root reducer) and the middlewares (default middleware and logger and cancel the serializable check to throw the error from firebase userImpl constructor)
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
// })

// // The persistor is what we pass to our redux PersistGate which wraps the App in index.js
// export const persistor = persistStore(store)
