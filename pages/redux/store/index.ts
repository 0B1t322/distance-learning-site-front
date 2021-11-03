import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {authReducer} from "./auth-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export default store