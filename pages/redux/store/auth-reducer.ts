import { BaseThunkType, InferActionsTypes } from "."
import { authAPI } from "../../api/auth"

import jwt_decoder from 'jwt-decode'

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
    setIsTeacher: (isTeacher: boolean) =>
        ({type: 'DS/AUTH/SET_IS_TEACHER', payload: {isTeacher}} as const)
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
                isLogin: false,
                isTeacher: false,
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
        case 'DS/AUTH/SET_IS_TEACHER':
            return {
                ...state,
                isTeacher: action.payload.isTeacher
            }

        default:
            return state
    }
}

type ThunkType = BaseThunkType<AuthActionType>

type TokenFields = {
    role: string    
}

export const login = (login: string, password: string): ThunkType => {
    return async (dispatch) => {
        try {
            let data = await authAPI.login(login, password)
            console.log('login', data)
            if(data.token) {
                localStorage.setItem('accessToken', data.token)
                dispatch(authActions.login(true))
                dispatch(authActions.setIsUserLogin(true))
                const headers = jwt_decoder<TokenFields>(data.token)
                if (headers.role == 'teacher') {
                    dispatch(authActions.setIsTeacher(true))
                } else {
                    dispatch(authActions.setIsTeacher(false))
                }
            }
        } catch (e) {
            console.error('login', e.config)
            console.error('answer')
            dispatch(authActions.setLoginError(true))
        }
    }
}
