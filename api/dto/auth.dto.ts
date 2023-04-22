export interface LoginFormDto {
    email: string;
    password: string
}

export interface LoginResponseDto {
    token : string;
}

export type RegisterFormDto = LoginResponseDto & {fullName: string}
export type RegisterResponseDto = LoginResponseDto

export interface User {
    id: string
    email: string;
    fullname: string;
}