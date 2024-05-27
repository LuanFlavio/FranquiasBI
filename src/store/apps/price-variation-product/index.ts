import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IReturnPaginate,  IPriceVariationProduct } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import toast from 'react-hot-toast'
import { ISearchParams } from 'src/services/api/SearchParams'

const INITIAL_STATE: IReturnPaginate<IPriceVariationProduct> = {
  data: [] as IPriceVariationProduct[],
  selectedItem: {} as IPriceVariationProduct,
  countItems: 0,
  itemsPerPage: 10,
  currentPage: 1
}

export const getAllDataPriceVariationProduct = createAsyncThunk(
  'appDataPriceVariationProduct/getAllDataPriceVariationProduct',
  async (params: Omit<ISearchParams, 'id'>) => {
    const response = await PurchaseService.getPriceVariationProductChart(params)

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

export const setSelectedItem = createAsyncThunk(
  'appDataPriceVariationProduct/setSelectedItemPriceVariationProduct',
  async (data: IPriceVariationProduct) => {
    return data
  }
)

export const appPurchasePriceVariationProductSlice = createSlice({
  name: 'appDataPriceVariationProduct/price-variation-product',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllDataPriceVariationProduct.fulfilled, (state, action) => {
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

export default appPurchasePriceVariationProductSlice.reducer

