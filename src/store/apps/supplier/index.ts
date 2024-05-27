import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IReturn, ISupplierChart } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import toast from 'react-hot-toast'
import { ISearchParams } from 'src/services/api/SearchParams'

const INITIAL_STATE: IReturn<ISupplierChart> = {
  data: {} as ISupplierChart,
  selectedItem: {} as ISupplierChart,
  countItems: 0,
}

export const getDataSupplierChart = createAsyncThunk(
  'appSupplier/getDataSupplierChart',
  async (params: Omit<ISearchParams, 'id'>) => {
    const response = await PurchaseService.getSupplierChart(params)

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

export const setSelectedItem = createAsyncThunk(
  'appSupplier/setSelectedItem',
  async (data: ISupplierChart) => {
    return data
  }
)

export const appPurchaseSupplierSlice = createSlice({
  name: 'appSupplier',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDataSupplierChart.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      //const active = action.payload.active === 'undefined' ? undefined : action.payload.active

      state.data = action.payload.data
      state.countItems = action.payload.countItems
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
  }
})

export default appPurchaseSupplierSlice.reducer
