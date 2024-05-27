import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ISearchParams } from 'src/services/api/SearchParams'

const INITIAL_STATE = {
  data: [] as ISearchParams[]
}

export const setFilterState = createAsyncThunk(
  'appFilter/setSelectedItemFilter',
  async (data: ISearchParams) => {
    return data
  }
)

export const appFilterSlice = createSlice({
  name: 'appFilter',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setFilterState.fulfilled, (state, action) => {
      const scan = state.data.findIndex((p) => p.id == action.payload.id)

      if(scan == -1) state.data.push(action.payload)
      else state.data[scan] = action.payload
    })
  }
})

export default appFilterSlice.reducer


