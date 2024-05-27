import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { IndicativeCard } from 'src/@core/layouts/components/shared-components/IndicativeCard'
import { FilterCard } from 'src/@core/layouts/components/shared-components/filterCard/FilterCard'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import { formatCurrency, formatMonthShort, numberWithCommas } from 'src/@core/utils/format'
import { AppDispatch, RootState } from 'src/store'
import { getAllDataMixProduct } from 'src/store/apps/mix-product'
import MixProductLineChart from 'src/views/charts/recharts/RechartsLineChartMixProduct'

interface ILineChartProps {
  productCount: number
  description: string
  totalQtdFormated: string
}

const DashboardMixProdutos = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [idFilterMixProduct] = useState(new Date().valueOf())

  const data = useSelector((state: RootState) => state.mixProduct.data)
  const filterMixProduct = useSelector((state: RootState) => state.filter.data.find(p => p.id == idFilterMixProduct))

  const handleFilter = () => {
    dispatch(getAllDataMixProduct(filterMixProduct!))
  }

  useEffect(() => {
    dispatch(getAllDataMixProduct({ date: 3, companyId: [], supplierCNPJ: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLineChartCountData = (): ILineChartProps[] => {
    const array = [] as ILineChartProps[]
    let temp = {} as ILineChartProps

    data.mixProduct
      ? data.mixProduct.map(value => {
          temp.description = formatMonthShort(value.month, 'short') + '/' + value.year.toString().slice(2, 4)
          temp.productCount = value.productCount
          temp.totalQtdFormated = numberWithCommas(value.productCount)
          array.push(temp)
          temp = {} as ILineChartProps
        })
      : []

    return array
  }

  const handleLineChartValueData = () => {
    const array: { description: string; totalValue: number; totalValueCurrency: string; }[] = []
    let temp = {
      description: '',
      totalValue: 0,
      totalValueCurrency: ''
    }

    data.mixProduct
      ? data.mixProduct.map(value => {
          temp.description = formatMonthShort(value.month, 'short') + '/' + value.year.toString().slice(2, 4)
          temp.totalValue = value.totalValue
          temp.totalValueCurrency = formatCurrency(value.totalValue)
          array.push(temp)
          temp = {
            description: '',
            totalValue: 0,
            totalValueCurrency: ''
          }
        })
      : []

    return array
  }

  return (
    <>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant='h4' fontWeight={600}>
          Mix de Produtos
        </Typography>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Valor'}
            value={data.totalsMixProduct ? formatCurrency(data.totalsMixProduct[0]?.totalValue) : '0'}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Produtos Distintos'}
            value={data.totalsMixProduct ? numberWithCommas(data.totalsMixProduct[0]?.totalCount) : '0'}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ my: 5 }}>
        <FilterCard id={idFilterMixProduct} product={false} handleFilter={handleFilter} />
      </Grid>
      <RechartsWrapper>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <MixProductLineChart
            data={handleLineChartCountData()}
            title='Produtos Distintos (Mensal)'
            subTitle='Quantidade de produtos diferentes comprados dos fornecedores selecionados'
            dataKey='productCount'
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <MixProductLineChart
            data={handleLineChartValueData()}
            title='Valor Comprado (Mensal)'
            subTitle='Total de produtos comprados'
            dataKey='totalValue'
          />
        </Grid>
      </RechartsWrapper>
    </>
  )
}

export default DashboardMixProdutos
