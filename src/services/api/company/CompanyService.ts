import { AxiosError } from 'axios'
import { API } from '../axios-config/index'
import { ICompany, IReturnPaginate } from 'src/@core/models'
import { Environment } from 'src/configs/environment'
import { IPaginationBasicParams } from '../SearchParams'

const companyRoute = '/Company'

/**
 * - Get all data filtered or an error returned by API.
 * - Obtenha todos os dados filtrados ou um erro retornado pela API.
 * @param tradeName Filter request by text value.
 * @param active Switches between the active and inactive data.
 * @returns Return the request when fulfilled or an Error in case of reject.
 */

interface ICompanySearchParams {
  id?: number
  cnpj?: string
  active?: boolean
}

const getAll = async ({
  id,
  cnpj,
  active,
  currentPage,
  itemsPerPage,
  description
}: ICompanySearchParams & IPaginationBasicParams): Promise<IReturnPaginate<ICompany> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.get(companyRoute, {
      params: {
        id,
        cnpj,
        active,
        currentPage,
        itemsPerPage,
        description
      },
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return {
        data,
        countItems: Number(headers.countitems),
        itemsPerPage: Number(headers.itemsperpage),
        currentPage: Number(headers.currentPage),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: [] as ICompany[],
        countItems: 0,
        itemsPerPage: 0,
        currentPage: 0,
        selectedItem: undefined
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

const getByCNPJ = async (cnpj: string): Promise<ICompany | AxiosError | Error>  => {
  try {
    const { data } = await API.get(`${companyRoute}/${cnpj}`, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return data
    }

    return new AxiosError('Erro ao consultar o registro.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
  }
}

export const CompanyService = {
  getAll,
  getByCNPJ
}
