  import { DataGrid, DataGridProps, ptBR } from '@mui/x-data-grid'
import { Box } from '@mui/material'

type IBaseDataGridProps = DataGridProps & {
  rowCount: number
  pageCount: number
  onPageChange: (newPage: number) => void
}
export const BaseDataGrid = ({
  page,
  rowCount,
  rowsPerPageOptions = [10, 20, 50],

  //pageCount,
  onPageChange,
  ...rest
}: IBaseDataGridProps) => {
  const locale = ptBR.components.MuiDataGrid.defaultProps.localeText

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        {...rest}
        page={(page || 1) - 1}
        pagination
        rowCount={rowCount}
        paginationMode='server'
        hideFooterSelectedRowCount
        localeText={locale}
        autoHeight
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={newPage => onPageChange?.(newPage + 1)}
      />
    </Box>
  )
}
