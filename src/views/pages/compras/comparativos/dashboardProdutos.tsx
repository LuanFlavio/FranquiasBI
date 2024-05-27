// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Chart Components Imports
import RechartsBarChart from 'src/views/charts/recharts/RechartsBarChart'

// ** Layouts Components Imports
import { FilterCard } from 'src/@core/layouts/components/shared-components/filterCard/FilterCard'

// ** Store
import { AppDispatch, RootState } from 'src/store'
import { useDispatch } from 'react-redux'
import { getProductChart } from 'src/store/apps/product-chart'
import { IndicativeCard } from 'src/@core/layouts/components/shared-components/IndicativeCard'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import { IProductColumn } from 'src/@core/models'
import { ProductDialog } from 'src/@core/layouts/components/shared-components/filterCard/ProductDialog'

// ** Utils
import { formatCurrency, numberWithCommas } from 'src/@core/utils/format'

const DashboardProdutos = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [idFilterProduct] = useState(new Date().valueOf())
  const [openProductFilter, setOpenProductFilter] = useState<boolean>(false)

  const data = useSelector((state: RootState) => state.productChart.data)
  const filterProduct = useSelector((state: RootState) => state.filter.data.find(p => p.id == idFilterProduct))

  const handleFilter = () => {
    dispatch(getProductChart(filterProduct!))
  }

  const handleColumnBarData = (): IProductColumn[] => {
    return data.chartByProduct
  }

  useEffect(() => {
    dispatch(getProductChart({ date: 3, companyId: [], productCode: [] }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid item xs={12} sx={{ mb: 5, mt: 10 }}>
        <Typography variant='h4' fontWeight={600}>
          Produtos
        </Typography>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Valor'}
            value={data.totalByProduct ? formatCurrency(data.totalByProduct[0]?.totalValue) : '0'}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Quantidade'}
            value={data.totalByProduct ? numberWithCommas(data.totalByProduct[0]?.totalQtd) : '0'}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ my: 5 }}>
        <FilterCard id={idFilterProduct} setOpen={setOpenProductFilter} supplier={false} handleFilter={handleFilter} />
        <ProductDialog id={idFilterProduct} show={openProductFilter} onClose={() => setOpenProductFilter(false)} />
      </Grid>
      <RechartsWrapper>
        <DatePickerWrapper>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12}>
              <RechartsBarChart
                XAxisDataKey='date'
                YAxisDataKey={['totalValue']}
                title='Valor(R$)'
                data={handleColumnBarData()}
              />
              {/* <ApexBarChart XAxis={handleBarXAxisSupplier()} data={handleBarSeriesSupplier()} /> */}
            </Grid>
            <Grid item xs={12}>
              <RechartsBarChart
                XAxisDataKey='date'
                YAxisDataKey={['totalQtd']}
                title='Quantidade'
                data={handleColumnBarData()}
              />
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </RechartsWrapper>
    </>
  )
}

export default DashboardProdutos
