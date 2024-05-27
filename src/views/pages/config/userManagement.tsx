import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

import { DataGrid, GridColumns, GridRowParams } from '@mui/x-data-grid'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getUserList, insertData, setSelectedItem, updateData } from 'src/store/apps/user'

import { ICompany, IUsers, IUsersDTO } from 'src/@core/models'

import { formatStringWithDots } from 'src/@core/utils/format'

import Chip from 'src/@core/components/mui/chip'
import IconifyIcon from 'src/@core/components/icon'
import { CompanySelect } from 'src/@core/components/forms/CompanySelect'
import { Fab } from '@mui/material'
import { Icon } from '@iconify/react'
import DialogDeleteUser from './components/DialogDeleteUser'

const UserManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector((state: RootState) => state.users.data)
  const selectedItem = useSelector((state: RootState) => state.users.selectedItem)

  const [user, setUser] = useState<IUsersDTO | undefined>()
  const [buttonError, setButtonError] = useState<boolean>(false)
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getUserList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(selectedItem)) {
      setButtonError(false)
    } else {
      setButtonError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    setUser(selectedItem || ({} as IUsersDTO))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const handleRowClick = (p: GridRowParams) => {
    dispatch(setSelectedItem(p.row))

    setUser({ ...(user || ({} as IUsersDTO)), company: p.row.company })
  }

  const onClickNewUser = () => {
    dispatch(setSelectedItem({} as IUsersDTO))
  }

  const handleSubmit = () => { //TRATAR DADOS QUE ESTÃO VAZIOS
    if(user?.id){
      let userToEdit = {} as IUsers
      userToEdit = { ...user, company: user.company?.cnpj, password: 'testeedit' } // ESSA SENHA É IGNORADA PELA API NESSA ROTA
      dispatch(updateData(userToEdit))
    } else{
      let userToPost = {} as IUsers

      if(user) userToPost = { ...user, company: user.company.cnpj, password: '1234', profile: user.profile ? user.profile : 'Compras' }
      else console.error(user)

      dispatch(insertData(userToPost))
    }
  }

  const handleDelete = () => {
    if(user?.id){
      setOpenDialogDelete(true)
    }
  }

  const columns: GridColumns<IUsersDTO> = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'name',
      headerName: 'Nome'
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'company',
      renderCell: company => (
        <Tooltip title={company.row.company.tradeName}>
          <Typography fontSize={'0.9rem'}>{formatStringWithDots(company.row.company.tradeName, 15)}</Typography>
        </Tooltip>
      ),
      headerName: 'Empresa'
    },
    {
      flex: 0.15,
      minWidth: 150,
      align: 'center',
      field: 'profile',
      headerName: 'Perfil',
      renderCell: param => (
        <Chip label={param?.value} skin='light' color={param?.value == 'Administrador' ? 'success' : 'warning'} />
      )
    }
  ]

  return (
    <>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant='h4' fontWeight={600}>
          Gestão de Usuários
        </Typography>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} sx={{ my: 5 }}>
          <Card>
            <Box sx={{ height: 615 }}>
              <DataGrid
                selectionModel={user?.id || []}
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={p => handleRowClick(p)}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 5 }}>
          <Box sx={{ mb: 5, display: 'flex', justifyContent: 'end' }}>
            <Fab variant='extended' color='primary' sx={{ '& svg': { mr: 1 }, color: 'black', fontWeight: 600 }} onClick={() => onClickNewUser()}>
              <Icon icon='mdi:plus' />
              Novo
            </Fab>
          </Box>
          <Card>
            <CardHeader title='Dados do Usuário' />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Nome'
                      placeholder='Responsável'
                      value={user?.name || ''}
                      onChange={e => setUser({ ...(user || ({} as IUsersDTO)), name: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <IconifyIcon icon='mdi:account-outline' />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Não é possível editar email, avaliar viabilidade */}
                    <TextField
                      fullWidth
                      type='email'
                      label='Email'
                      value={user?.email || ''}
                      onChange={e => setUser({ ...(user || ({} as IUsersDTO)), email: e.target.value })}
                      placeholder='exemplo@gmail.com'
                      helperText='Você pode usar letras, números e símbolos'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <IconifyIcon icon='mdi:email-outline' />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CompanySelect
                      id={'company-user-menage'}
                      name={'Unidade'}
                      setSelectedOption={company => setUser({ ...(user || ({} as IUsersDTO)), company: company })}
                      initialCompany={user?.company || {} as ICompany}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>Perfil</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='Compra'
                      value={user?.profile || 'Compra'}
                      name='profile-radio'
                      onChange={e => setUser({ ...(user || ({} as IUsersDTO)), profile: e.target.value })}
                    >
                      <FormControlLabel value='Compra' control={<Radio />} label='Usuário Padrão' />
                      <FormControlLabel value='Administrador' control={<Radio />} label='Administrador' />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant='outlined'
                      size='large'
                      color='error'
                      disabled={user?.id == undefined}
                      onClick={() => handleDelete()}
                    >
                      Deletar
                    </Button>
                    <DialogDeleteUser open={openDialogDelete} idUser={user?.id || 0} handleClose={() => setOpenDialogDelete(false)} />
                    <Button
                      type='submit'
                      variant='contained'
                      size='large'
                      disabled={buttonError}
                      sx={{ color: 'black', fontWeight: 600 }}
                      onClick={() => handleSubmit()}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserManagementPage
