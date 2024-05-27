import { AxiosError } from 'axios'
import { API } from '../axios-config'
import { Environment } from 'src/configs/environment'
import { IUsers } from 'src/@core/models'

const loginRoute = '/Login'

const getToken = (): string | null => {
  return window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
}

const setToken = async (token: string | undefined): Promise<void | Error> => {
  try {
    window.localStorage.setItem(Environment.STORAGE_TOKEN_KEY_NAME, token === undefined ? '' : token)
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao definir o token')
  }
}

const clearToken = async () => {
  try {
    window.localStorage.removeItem(Environment.STORAGE_TOKEN_KEY_NAME)
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao limpar o token')
  }
}

const clearUser = async () => {
  try {
    window.localStorage.removeItem('userData')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao limpar informações do usuário')
  }
}

const getUser = async () => {
  try {
    return (window.localStorage.getItem('userData')) === null
      ? null
      : (JSON.parse(window.localStorage.getItem('userData')!) as IUsers)
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao obter informações do usuário')
  }
}

const setUser = async (user: IUsers) => {
  try {
    window.localStorage.setItem('userData', JSON.stringify(user))
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao definir o usuário')
  }
}

export interface loginResponse {
  data: any,
  token: any
}


const verifySessionExists = async (): Promise<any | Error> => {
  try {
    const { status } = await API.get<any>(loginRoute + '/sessionExists', {
      headers: { 'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)! }
    })

    if (status === 200) {
      return true
    }

    return new Error('Falha ao verificar se a sessão existe')
  } catch (error) {
    console.error(error)

    return new Error('Falha ao verificar se a sessão existe')
  }
}


const login = async (email: string, password: string): Promise<loginResponse | AxiosError > => {
  try {
    const { data, headers } = await API.post(loginRoute, { email, password })

    if (data) {
      return { data, token: headers['api-vsbi-token'] }
    }

    return new AxiosError('Falha ao efetuar o login')
  } catch (error : any) {

    return error
  }
}

const logoutSession = async (): Promise<any | AxiosError > => {
  try {
    const { status } = await API.post(loginRoute + '/logoutSession', null, {
      headers: { 'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)! }
    })

    if (status === 200) {
      return true
    }

    return new AxiosError('Falha ao efetuar o logout')
  } catch (error : any) {

    return error
  }
}

export const LoginService = {
  getToken,
  setToken,
  clearToken,
  clearUser,
  getUser,
  setUser,
  verifySessionExists,
  login,
  logoutSession
}
