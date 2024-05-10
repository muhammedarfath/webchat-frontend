import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage  from 'redux-persist/lib/storage'


const persistConfig = {
    key:'persist-key',
    storage,
}

const persistedReducer  = persistReducer(persistConfig,authReducer)

const store =  configureStore({
    reducer:{
        auth:persistedReducer,
    }
})

const persistor = persistStore(store)
export default store
export {persistor}