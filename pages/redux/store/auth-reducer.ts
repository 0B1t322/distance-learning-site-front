import { BaseThunkType, InferActionsTypes } from "."
import { authAPI } from "../../api/auth"

export type InititalStateType = typeof initialState
let initialState = {
    isAuth: false as boolean,
    isLogin: false as boolean,
    isTeacher: false as boolean,
    isLoginError: false as boolean
}

export type AuthActionType = InferActionsTypes<typeof authActions>


export const authActions = {
    login: (isAuth: boolean) => 
        ({type: 'DS/AUTH/LOGIN', payload: {isAuth}} as const),
    logout: () =>
        ({type: 'DS/AUTH/LOGOUT', payload:{}} as const),
    setIsUserLogin: (isLogin: boolean) =>
        ({type: 'DS/AUTH/IS_USER_LOGIN', payload: {isLogin}} as const),
    setLoginError: (isLoginError: boolean) =>
        ({type: 'DS/AUTH/SET_LOGIN_ERROR', payload: {isLoginError}} as const),
}

export const authReducer = (state = initialState, action: AuthActionType):InititalStateType => {
    switch (action.type) {
        case 'DS/AUTH/LOGIN':
            return {
                ...state,
                isAuth: action.payload.isAuth
            }
        case 'DS/AUTH/LOGOUT':
            return {
                ...state,
                isAuth: false,
            }
        case 'DS/AUTH/IS_USER_LOGIN':
            return {
                ...state,
                isLogin: action.payload.isLogin
            }
        case 'DS/AUTH/SET_LOGIN_ERROR':
            return {
                ...state,
                isLoginError: action.payload.isLoginError
            }

        default:
            return state
    }
}

type ThunkType = BaseThunkType<AuthActionType>

export const login = (login: string, password: string): ThunkType => {
    return async (dispatch) => {
        try {
            let data = await authAPI.login(login, password)
            console.log('login', data)
            if(data.token) {
                localStorage.setItem('accessToken', data.token)
                dispatch(authActions.login(true))
                dispatch(authActions.setIsUserLogin(true))
            }
        } catch (e) {
            console.error('login', e.config)
            console.error('answer')
            dispatch(authActions.setLoginError(true))
        }
    }
}
