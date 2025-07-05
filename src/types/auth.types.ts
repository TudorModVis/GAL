export interface IAuthForm {
    username: string;
    password: string
}

export interface IAdmin {
    _id: string;
    username: string;
}

export interface IAuthResponse {
    admin: IAdmin;
    accessToken: string;
}