import { IUsers } from "src/@core/models"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type OffAuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export type OnAuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: IUsers | null
  setUser: (value: IUsers | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallBack?: (ErrorResponseCode: number) => void) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  token: string | undefined //ideia para não precisar ficar fazendo consulta no localStorage
}
