import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IReturn, IMixProduct } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import toast from 'react-hot-toast'
import { ISearchParams } from 'src/services/api/SearchParams'

const INITIAL_STATE: IReturn<IMixProduct> = {
  data: {} as IMixProduct,
  selectedItem: {} as IMixProduct,
  countItems: 0
}

export const getAllDataMixProduct = createAsyncThunk(
  'appMixProduct/getAllDataMixProduct',
  async (params: Omit<ISearchParams, 'id'>) => {
    const response = await PurchaseService.getMixProductChart(params)

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

export const setSelectedItem = createAsyncThunk(
  'appMixProduct/setSelectedItemMixProduct',
  async (data: IMixProduct) => {
    return data
  }
)

export const appPurchaseMixProductSlice = createSlice({
  name: 'appMixProduct',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllDataMixProduct.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      // const active = action.payload.active === 'undefined' ? undefined : action.payload.active

      state.data = action.payload.data
      state.countItems = action.payload.countItems
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
  }
})

export default appPurchaseMixProductSlice.reducer


