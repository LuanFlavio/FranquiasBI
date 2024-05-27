// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import users from './apps/user/index'
import filter from './apps/filter/index'
import company from './apps/company/index'
import supplier from './apps/supplier/index'
import product from './apps/product/index'
import mixProduct from './apps/mix-product/index'
import productChart from './apps/product-chart/index'
import priceVariationProduct from './apps/price-variation-product/index'

export const store = configureStore({
  reducer: {
    users,
    filter,
    company,
    product,
    supplier,
    mixProduct,
    productChart,
    priceVariationProduct
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
