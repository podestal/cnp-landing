import AuthClient from './authClient'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

const loginClient = new AuthClient<LoginResponse, LoginRequest>('/jwt/create/')

export const loginService = {
  login: (credentials: LoginRequest) => loginClient.post(credentials),
}
