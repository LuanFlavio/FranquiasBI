import { AxiosError } from "axios"
import { LoginService } from "src/services/api/user/LoginService"

/**
 * - General API error handling.
 * - Tratamento de erros gerais da API.
 * @param error Error returned by API.
 * @returns Handled API error.
 */

export const errorInterceptor = async (error: AxiosError) => {


  if(error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'))
  }

  if(error.response?.status === 401) {
    LoginService.clearUser()
    LoginService.clearToken()
    document.location.replace('/login')



    return Promise.reject(new Error('Erro de conexão.'))
  }

  return Promise.reject(error)
}
