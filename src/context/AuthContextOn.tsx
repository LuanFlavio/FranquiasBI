// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { OnAuthValuesType, LoginParams, RegisterParams, ErrCallbackType } from './types'
import { IUsers } from 'src/@core/models'

// ** Service Imports
import axios, { AxiosError } from 'axios'
import { LoginService } from 'src/services/api/user/LoginService'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider: OnAuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  token: undefined
}

const OnAuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProviderOn = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<IUsers | null>(defaultProvider.user)
  const [token, setToken] = useState<string | undefined>(defaultProvider.token)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  // inicialização da parte de login do sistema
  // o login de quando o cara sair e fechar a guia do navegador
  // deve ser feito dentro desse effect
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true)
      const storedToken = LoginService.getToken()
      if (storedToken) {
        setLoading(true)

        LoginService.verifySessionExists().then(async response => {
          if (response instanceof Error) {
            await LoginService.clearToken()
            await LoginService.clearUser()
            router.replace('/login')
            setLoading(false)

            return console.error(response)
          }

          LoginService.getUser().then(async response => {
            if (response instanceof Error) {
              setLoading(false)
              await LoginService.clearToken()
              await LoginService.clearUser()

              router.replace('/login')

              return console.error(response)
            }
            setUser(response)
            setLoading(false)
            router.replace(router)
          })
        })

      } else {
        // tira o spinner
        setLoading(false)
        router.replace('/login')
      }
    }
    initAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // handler para fazer o login
  const handleLogin = (params: LoginParams, errorCallBack?: (ErrorResponseCode: number) => void) => {
    LoginService.login(params.email, params.password).then(res => {
      setLoading(true)

      if (res instanceof AxiosError) {
        setLoading(false)
        if (errorCallBack) errorCallBack(res.response!.status)

        return res
      }

      //Evita erros caso API esteja offline
      if (res instanceof Error){
        setLoading(false)
        if (errorCallBack) errorCallBack(500)

        return res
      }

      LoginService.setToken(res.token)
      setToken(res.token)

      // VOLTAR AQUI E CORRIGIR QUANDO A API ESTIVER RETORNANDO O USUÁRIO NO LOGIN
      LoginService.setUser(res.data)
      setUser(res.data)
      setLoading(false)

      router.replace('/home').finally(() => {
        setLoading(false)
      })
    })
  }

  const handleLogout = async () => {
    LoginService.logoutSession()
    setUser(null)
    setIsInitialized(false)
    await LoginService.clearUser()
    await LoginService.clearToken()
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    token
  }

  return <OnAuthContext.Provider value={values}>{children}</OnAuthContext.Provider>
}

export { OnAuthContext, AuthProviderOn }
