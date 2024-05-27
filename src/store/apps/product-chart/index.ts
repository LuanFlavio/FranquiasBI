import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IReturn, IProductChart } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import toast from 'react-hot-toast'
import { ISearchParams } from 'src/services/api/SearchParams'

const INITIAL_STATE: IReturn<IProductChart> = {
  data: {} as IProductChart,
  selectedItem: {} as IProductChart,
  countItems: 0,
}

export const getProductChart = createAsyncThunk(
  'appProductChart/getAllDataProduct',
  async (params: Omit<ISearchParams, 'id'>) => {
    const response = await PurchaseService.getProductChart(params)

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

export const setSelectedItem = createAsyncThunk('appProductChart/setSelectedItem', async (data: IProductChart) => {
  return data
})

export const appPurchaseProductSlice = createSlice({
  name: 'appProductChart',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProductChart.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      state.data = action.payload.data
      state.countItems = action.payload.countItems
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
  }
})

export default appPurchaseProductSlice.reducer
