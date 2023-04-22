import axios from "@/core/axios"
import { LoginFormDto, LoginResponseDto, RegisterFormDto, RegisterResponseDto, User } from "./dto/auth.dto"
import { destroyCookie } from "nookies"

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
    const {data} = await axios.post('/auth/login', values)
    return data
}
export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
    const {data} = await axios.post('/auth/register', values)
    return data
}
export const logout = () => {
    destroyCookie(null, '_token', { path: "/" })
    destroyCookie(null, '_user', { path: "/" })
}

export const authMe = async (): Promise<User> => {
    const {data} = await axios.get('/users/me') 
    return data   
    
}
