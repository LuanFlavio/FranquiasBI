/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

// ** MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import { DataGrid, GridColDef, GridRowId, GridSearchIcon, GridSelectionModel, ptBR } from '@mui/x-data-grid'

// ** Icon
import { Icon } from '@iconify/react'
import { getAllProduct, setSelectedRange } from 'src/store/apps/product'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'
import { formatCurrency } from 'src/@core/utils/format'
import { useDebounce } from 'use-debounce'
import { IProduct } from 'src/@core/models'

interface props {
  show: boolean
  onClose: () => void
  id: number
}

export const ProductDialog = ({ show, onClose, id }: props) => {
  const dispatch = useDispatch<AppDispatch>()
  const locale = ptBR.components.MuiDataGrid.defaultProps.localeText

  const [descriptionFilter, setDescriptionFilter] = useState<string>('')
  const [debouncedFilter] = useDebounce(descriptionFilter, 500)

  //const [selectionModel, setSelectionModel] = useState<GridRowId[]>([''])
  const maxSelection = 6

  const data = useSelector((state: RootState) => state.product.find(p => p.id == id)?.data) as IProduct[]
  const itemsPerPage = useSelector((state: RootState) => state.product.find(p => p.id == id)?.itemsPerPage)
  const currentPage = useSelector((state: RootState) => state.product.find(p => p.id == id)?.currentPage)
  const countItems = useSelector((state: RootState) => state.product.find(p => p.id == id)?.countItems)

  //const selectedRange = useSelector((state: RootState) => state.product.find(p => p.id == id)?.selectedRange)
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>([])
  const [isPageChanging, setIsPageChanging] = useState<boolean>(true)

  useEffect(() => {
    if (!show) return
    console.log('entrou na tela e desligou')
    setIsPageChanging(false)
    dispatch(
      getAllProduct({
        currentPage: 1,
        itemsPerPage: 10,
        id
      })
    )
  }, [show])

  useEffect(() => {
    console.log('entrou na tela e deu o debounce')
    dispatch(
      getAllProduct({
        description: debouncedFilter == '' ? undefined : debouncedFilter,
        id
      })
    )
  }, [debouncedFilter])

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionFilter(event.target.value)
  }

  const onPageChange = useCallback((newPage: number) => {
    setIsPageChanging(true)
    console.log('setou')
    dispatch(getAllProduct({ currentPage: newPage + 1, id})).then(() => setIsPageChanging(false))
  }, [])

  const handleSelectionChange = (newSelection: GridSelectionModel) => {
    console.log(newSelection, 'oq chegou', selectedDescriptions, 'oq era', isPageChanging)
    if (newSelection.length >= maxSelection) return
    if (isPageChanging){
      setIsPageChanging(false)
      console.log('desligou')

      return
    } else {
      // Como o modelo de seleção agora depende das descrições, a lógica de seleção precisa ser ajustada.
      const newSelectedDescriptions = data.filter(product => newSelection.includes(product.description)).map(product => product.description)

      setSelectedDescriptions(newSelection as string[])

      dispatch(setSelectedRange({ id, data: data.filter(product => newSelectedDescriptions.includes(product.description)) }))
    }
  }

  const handleSelection = useCallback((): GridRowId[] => {
    return selectedDescriptions
  }, [selectedDescriptions])

  const columns: GridColDef<typeof data[number]>[] = useMemo(
    () => [
      {
        field: 'description',
        headerName: 'Descrição',
        minWidth: 175,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        renderCell: params => (
          <Tooltip title={<span style={{ fontSize: '1rem' }}>{params.value}</span>}>
            <Typography fontSize={'0.9rem'}>{params.value}</Typography>
          </Tooltip>
        )
      },
      {
        field: 'boxCost',
        headerName: 'Valor',
        width: 130,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: params => formatCurrency(params.value)
      },
      {
        field: 'supplierName',
        headerName: 'Fornecedor',
        width: 250,
        align: 'left',
        headerAlign: 'center',
        renderCell: params => (
          <Tooltip title={<span style={{ fontSize: '1rem' }}>{params.value}</span>}>
            <Typography fontSize={'0.9rem'}>{params.value}</Typography>
          </Tooltip>
        )
      }
    ],
    []
  )

  return (
    <Dialog
      onClose={() => {
        onClose()
      }}
      open={show}
      maxWidth={'md'}
      fullWidth
    >
      <DialogContent
        sx={{
          pb: { xs: 5, sm: 9.5 }
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <IconButton
              onClick={() => {
                onClose()
              }}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 5 }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Produtos
              </Typography>
              <Divider />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} my={5}>
          <TextField
            fullWidth
            size='small'
            placeholder='Pesquisar'
            value={descriptionFilter}
            onChange={handleFilterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <GridSearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={data || []}
            columns={columns}
            autoHeight
            pagination
            paginationMode='server'
            page={(currentPage || 1) - 1}
            rowCount={countItems}
            pageSize={itemsPerPage}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[10]}
            getRowId={p => p.description}
            localeText={locale}
            onPageChange={onPageChange}
            checkboxSelection
            selectionModel={handleSelection()}
            onSelectionModelChange={handleSelectionChange}
          />
        </Box>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
