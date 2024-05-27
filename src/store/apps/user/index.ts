import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { IUsers, IReturnPaginate, IUsersDTO } from 'src/@core/models'
import { UserService } from 'src/services/api/user/UserService'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

const INITIAL_STATE: IReturnPaginate<IUsersDTO> & { singleUser: IUsers } = {
  data: [] as IUsersDTO[],
  selectedItem: {} as IUsersDTO,
  singleUser: {} as IUsers,
  countItems: 0,
  itemsPerPage: 5,
  currentPage: 1
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const getUserData = createAsyncThunk('appUsers/getUserData', async () => {
  const response = await UserService.getUserData()

  if (response instanceof Error) {
    toast.error('Falha ao carregar o registro!')
    console.error(response)

    return
  }

  return response
})

export const getUserList = createAsyncThunk(
  'appUsers/getUserList',
  async () => {
    const response = await UserService.getUserList()

    if (response instanceof Error) {
      toast.error('Falha ao carregar os registros!')
      console.error(response)

      return
    }

    return response
  }
)

// export const getById = createAsyncThunk('appUsers/getById', async (id: string) => {
//   const response = await UserService.getById(id)

//   if (response instanceof Error) {
//     toast.error('Falha ao carregar o registro!')
//     console.error(response)

//     return {} as IUsers
//   }

//   return response
// })

export const deleteData = createAsyncThunk('appUsers/deleteData', async (id: number, { dispatch }: Redux) => {
  const toastId = toast.loading('Carregando...')

  const response = await UserService.deleteById(id)

  if (response instanceof Error) {
    toast.dismiss(toastId)
    toast.error('Falha na operação!' + `\n` + response)
    console.error(response)

    return
  }

  toast.dismiss(toastId)
  toast('Operação bem sucedida!', { icon: '👍' })

  dispatch(getUserList())

  return response
})

export const insertData = createAsyncThunk('appUsers/insertData', async (data: IUsers, { dispatch }: Redux) => {
  const toastId = toast.loading('Carregando...')

  const response = await UserService.create(data)

  if (response instanceof AxiosError) {
    toast.dismiss(toastId)

    if (response.response!.data === 'AlreadyExistsIdentification') {
      toast.error('Email já cadastrado!')

      return
    }

    toast.error('Falha ao salvar!')

    return
  }

  if (response instanceof Error) {
    toast.dismiss(toastId)
    toast.error('Falha ao salvar!')
    console.error(response)

    return
  }

  toast.dismiss(toastId)
  toast.success('Salvo com sucesso!')

  dispatch(getUserList())

  return response
})

export const updateData = createAsyncThunk('appUsers/updateData', async (data: IUsers, { dispatch }: Redux) => {
  const toastId = toast.loading('Carregando...')

  const response = await UserService.updateById(data)

  if (response instanceof Error) {
    toast.dismiss(toastId)
    toast.error('Falha ao salvar!')
    console.error(response)

    return
  }

  toast.dismiss(toastId)
  toast.success('Alterado com sucesso!')

  dispatch(getUserList())

  return response
})

export const setSelectedItem = createAsyncThunk('appUsers/setSelectedItem', async (data: IUsersDTO) => {
  return data
})

export const appUserSlice = createSlice({
  name: 'appUsers',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      state.singleUser = action.payload
    })
    builder.addCase(getUserList.fulfilled, (state, action) => {
      if (typeof action.payload === 'undefined') return

      state.data = action.payload
      state.selectedItem = {} as IUsersDTO
    })
    builder.addCase(setSelectedItem.fulfilled, (state, action) => {
      state.selectedItem = action.payload
    })
  }
})

export default appUserSlice.reducer
