import axios from "axios";
import { ErrorResponceType, baseURL } from "../api";

export type LoginResponceType = {
    token: string
    refreshToken: string
}

export const authAPI = {
    login(login: string, password: string) {
        return axios.post<LoginResponceType & ErrorResponceType>(
            baseURL + '/api/site/v1/auth/login', 
            {
                login: login,
                password: password,
            }
        ).then(responce => responce.data)
    }
}