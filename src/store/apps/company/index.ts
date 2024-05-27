import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { ICompany, IReturnPaginate } from 'src/@core/models'
import { CompanyService } from 'src/services/api/company/CompanyService'
import toast from 'react-hot-toast'
import { IPaginationBasicParams } from 'src/services/api/SearchParams'

interface ICompanySearchParams {
  id?: number
  cnpj?: string
  active?: boolean
}

const INITIAL_STATE: IReturnPaginate<ICompany> & ICompanySearchParams = {
  data: [],
  selectedItem: {} as ICompany,
  countItems: 0,
  itemsPerPage: 0,
  currentPage: 0,
  id: undefined,
  cnpj: undefined,
  active: undefined
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const getAllData = createAsyncThunk(
  'appCompany/getAllData',
  async (params: ICompanySearchParams & IPaginationBasicParams, { getState }: Redux) => {
    const response = await CompanyService.getAll({
      currentPage: params.currentPage !== undefined ? params.currentPage : getState().company.currentPage,
      itemsPerPage: params.itemsPerPage !== undefined ? params.itemsPerPage : getState().company.itemsPerPage,
      description: params.description !== undefined ? params.description : getState().company.tradeName,
      id: params.id !== undefined ? params.id : getState().company.id,
      cnpj: params.cnpj !== undefined ? params.cnpj : getState().company.cnpj,
      active: params.active !== undefined ? params.active : getState().company.active
    })

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

export const getById = createAsyncThunk('appCompany/getById', async (id: string) => {
  const response = await CompanyService.getByCNPJ(id)

  if (response instanceof Error) {
    toast.error('Falha ao carregar o registro!')
    console.error(response)

    return {} as ICompany
  }

  return response
})

export const setSelectedItem = createAsyncThunk('appCompany/setSelectedItem', async (data: ICompany) => {
  return data
})

export const appCompanySlice = createSlice({
  name: 'appCompany',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      //const active = action.payload.active === 'undefined' ? undefined : action.payload.active

      state.data = action.payload.data
      state.countItems = action.payload.countItems
      state.selectedItem = {} as ICompany
      state.currentPage = action.payload.currentPage
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
    builder.addCase(getById.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
  }
})

export default appCompanySlice.reducer
