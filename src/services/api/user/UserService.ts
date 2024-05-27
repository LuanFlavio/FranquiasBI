import { AxiosError } from 'axios'
import { API } from '../axios-config/index'
import { IUsers, IUsersDTO } from 'src/@core/models'
import { Environment } from 'src/configs/environment'

const userRoute = '/Users'

/**
 * - Get user data filtered or an error returned by API.
 * - Obtenha os dados do usuário logado ou um erro retornado pela API.
 * @returns Return the request when fulfilled or an Error in case of reject.
 */
const getUserData = async (): Promise<IUsers | Error> => {
  try {
    const { data, status } = await API.get<IUsers>(userRoute, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return data
    }

    if (status === 204) {
      return {} as IUsers
    }

    return new Error('Erro ao buscar usuário.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao buscar usuário.')
  }
}

/**
 * - Get user list filtered or an error returned by API.
 * - Obtenha uma lista de usuários ou um erro retornado pela API.
 * @returns Return the request when fulfilled or an Error in case of reject.
 */
const getUserList = async (): Promise<IUsersDTO[] | Error> => {
  try {
    const { data, status } = await API.get<IUsersDTO[]>(userRoute + '/todos', {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return data
    }

    if (status === 204) {
      return [] as IUsersDTO[]
    }

    return new Error('Erro ao buscar usuários.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao buscar usuários.')
  }
}

// const getById = async (id: string): Promise<IUsers | Error> => {
//   try {
//     const { data } = await API.get(`${userRoute}/${id}`, {
//       headers: {
//         'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
//       }
//     })

//     if (data) {
//       return data
//     }

//     return new Error('Erro ao consultar o registro.')
//   } catch (error) {
//     console.error(error)

//     return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
//   }
// }

const create = async (user: Omit<IUsers, 'id'>): Promise<IUsers | AxiosError | Error> => {
  try {
    const { data } = await API.post<IUsers>(userRoute, user, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return data
    }

    return new AxiosError('Erro ao cadastrar o registro.')
  } catch (error: any) {
    console.error(error)

    return error
  }
}

const updateById = async (user: IUsers): Promise<IUsers | Error> => {
  try {
    const { data } = await API.put<IUsers>(`${userRoute}/${user.id}`, user, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return data
    }

    return new Error('Erro ao editar o registro.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao editar o registro.')
  }
}

const deleteById = async (id: number): Promise<string | Error> => {
  try {
    const { data, status } = await API.delete(`${userRoute}/${id}`, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data || status.IsHttpSuccess()) {
      return data
    }

    return new Error('Erro ao apagar o registro.')
  } catch (error) {
    console.error(error)

    if(error instanceof AxiosError && (error as AxiosError).response?.data != undefined)
      return new Error(error?.response?.data || 'Erro ao apagar o registro.')

    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')
  }
}

export const UserService = {
  getUserData,
  getUserList,
  create,
  updateById,
  deleteById
}
