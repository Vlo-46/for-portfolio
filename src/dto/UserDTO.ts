export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    username?: string;
    email?: string;
    password?: string;
}

export interface AuthUserDTO {
    email: string;
    password: string;
}

export interface ChangeUserPasswordDTO {
    oldPassword: string
    newPassword: string
}

export interface ForgotUserPasswordDTO {
    email: string
}