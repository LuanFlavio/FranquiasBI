import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct, IReturnPaginate } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import toast from 'react-hot-toast'
import { IPaginationBasicParams } from 'src/services/api/SearchParams'

interface IProductStoreList extends IReturnPaginate<IProduct> {
  id: number
  description?: string
  selectedRange?: IProduct[]
}

interface ISetSelectedItemProps {
  id: number
  data: IProduct
}

interface ISetSelectedRangeProps {
  id: number
  data: IProduct[]
}

const INITIAL_STATE: IProductStoreList[] = [{
  id: 1,
  data: [] as IProduct[],
  selectedItem: {} as IProduct,
  countItems: 0,
  itemsPerPage: 10,
  currentPage: 0,
  description: undefined,
  selectedRange: undefined
}]

interface Redux {
  getState: any
}

export const getAllProduct = createAsyncThunk(
  'appProduct/getAllProduct',
  async ({ id, currentPage, description, itemsPerPage }: IPaginationBasicParams, { getState }: Redux) => {
    const response = await PurchaseService.getAllProduct({
      currentPage: currentPage !== undefined ? currentPage : getState().product.currentPage,
      description: description !== undefined ? description : getState().product.description,
      itemsPerPage: itemsPerPage !== undefined ? itemsPerPage : getState().product.itemsPerPage
    })

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return { //VAI TER Q RETORAR O RESPONSE JUNTO COM O ID DO ARRAY
      id,
      response
    }
  }
)

export const setSelectedItem = createAsyncThunk('appProduct/setSelectedItem', async (data: ISetSelectedItemProps) => {
  return data
})

export const setSelectedRange = createAsyncThunk('appProduct/setSelectedRange', async (data: ISetSelectedRangeProps) => {
  return data
})

export const appPurchaseProductSlice = createSlice({
  name: 'appProduct',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return
      if (typeof action.payload.id === 'undefined') return

      const scan = state.findIndex(value => value.id == action.payload!.id)

      if(scan == -1) {
        state.push({
          id: action.payload.id,
          data: action.payload.response.data,
          countItems: action.payload.response.countItems,
          itemsPerPage: action.payload.response.itemsPerPage,
          currentPage: action.payload.response.currentPage
        })
      } else {
        state[scan].data = action.payload.response.data
        state[scan].countItems = action.payload.response.countItems
        state[scan].itemsPerPage = action.payload.response.itemsPerPage
        state[scan].currentPage = action.payload.response.currentPage
      }
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      const scan = state.findIndex(value => value.id == action.payload.id)

      state[scan].selectedItem = action.payload.data
    })
    builder.addCase(setSelectedRange.fulfilled, (state, action) => {
      const scan = state.findIndex(value => value.id == action.payload.id)

      state[scan].selectedRange = action.payload.data
    })
  }
})

export default appPurchaseProductSlice.reducer
