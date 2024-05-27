import { AxiosError } from 'axios'
import { API } from '../axios-config/index'
import {
  ISupplier,
  IMixProduct,
  IPriceVariationProduct,
  IReturn,
  IProductChart,
  IProduct,
  ISupplierChart,
  IReturnPaginate
} from 'src/@core/models'
import { Environment } from 'src/configs/environment'
import { ISearchParams, IPaginationBasicParams } from '../SearchParams'

const userRoute = '/Purchases'

const getAllProduct = async ({
  currentPage,
  itemsPerPage,
  description
}: IPaginationBasicParams): Promise<IReturnPaginate<IProduct> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.get(userRoute + '/productsList', {
      params: {
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
        currentPage: Number(headers.currentpage),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: [] as IProduct[],
        countItems: 0,
        itemsPerPage: 10,
        currentPage: 1,
        selectedItem: undefined
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

const getAllSupplier = async ({
  currentPage,
  itemsPerPage,
  description
}: IPaginationBasicParams): Promise<IReturnPaginate<ISupplier> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.get(userRoute + '/suppliersList', {
      params: {
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
        currentPage: Number(headers.currentpage),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: [] as ISupplier[],
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

const getProductChart = async (
  searchParams: Omit<ISearchParams, 'id'>
): Promise<IReturn<IProductChart> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.post(userRoute + '/productsChart', searchParams, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return {
        data,
        countItems: Number(headers.countitems),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: {} as IProductChart,
        countItems: 0,
        selectedItem: undefined
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

const getSupplierChart = async (
  searchParams: Omit<ISearchParams, 'id'>
): Promise<IReturn<ISupplierChart> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.post(userRoute + '/suppliersChart', searchParams, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return {
        data,
        countItems: Number(headers.countitems),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: {} as ISupplierChart,
        countItems: 0,
        selectedItem: undefined
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

const getMixProductChart = async (
  searchParams: Omit<ISearchParams, 'id'>
): Promise<IReturn<IMixProduct> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.post(userRoute + '/productsMix', searchParams, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return {
        data,
        countItems: Number(headers.countitems),
        selectedItem: undefined
      }
    }

    if (status === 204) {
      return {
        data: {} as IMixProduct,
        countItems: 0,
        selectedItem: undefined
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

const getPriceVariationProductChart = async (
  searchParams: Omit<ISearchParams, 'id'>
): Promise<IReturnPaginate<IPriceVariationProduct> | AxiosError | Error> => {
  try {
    const { data, headers, status } = await API.post(userRoute + '/productsVariation', searchParams, {
      headers: {
        'api-vsbi-token': window.localStorage.getItem(Environment.STORAGE_TOKEN_KEY_NAME)!
      }
    })

    if (data) {
      return {
        data,
        countItems: Number(headers.countitems),
        selectedItem: undefined,
        itemsPerPage: 10,
        currentPage: 1
      }
    }

    if (status === 204) {
      return {
        data: [] as IPriceVariationProduct[],
        countItems: 0,
        selectedItem: undefined,
        itemsPerPage: 10,
        currentPage: 1
      }
    }

    return new AxiosError('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
  }
}

export const PurchaseService = {
  getAllProduct,
  getAllSupplier,
  getProductChart,
  getSupplierChart,
  getMixProductChart,
  getPriceVariationProductChart
}
