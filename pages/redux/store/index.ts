import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import storage from 'redux-persist/lib/storage'

import { persistStore, persistReducer } from 'redux-persist'

let rootReducer = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
export let persistors = persistStore(store)

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export default store