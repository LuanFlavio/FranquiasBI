import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { FilterCard } from 'src/@core/layouts/components/shared-components/filterCard/FilterCard'
import { ProductDialog } from 'src/@core/layouts/components/shared-components/filterCard/ProductDialog'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import { formatCurrency, formatMonthShort } from 'src/@core/utils/format'
import { AppDispatch, RootState } from 'src/store'
import { getAllDataPriceVariationProduct } from 'src/store/apps/price-variation-product'
import PriceVariationLineChart from 'src/views/charts/recharts/RechartsLineChartVariationPrice'

interface ILineChartProps {
  productPrice: number
  description: string
  priceCurrency: string
}

const DashboardVariacaoPreco = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [idFilterPriceVariation] = useState(new Date().valueOf())
  const [openProductFilter, setOpenProductFilter] = useState<boolean>(false)

  const data = useSelector((state: RootState) => state.priceVariationProduct.data)
  const filterPriceVariation = useSelector((state: RootState) => state.filter.data.find(p => p.id == idFilterPriceVariation))

  const handleFilter = () => {
    dispatch(getAllDataPriceVariationProduct(filterPriceVariation!))
  }

  useEffect(() => {
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLineChartPriceData = (): ILineChartProps[] => {
    const array = [] as ILineChartProps[]
    let temp = {} as ILineChartProps

    data ? data.map(value => {
        temp.description = formatMonthShort(value.month, 'short') + '/' + value.year.toString().slice(2, 4)
        temp.productPrice = value.product[0].boxCost
        temp.priceCurrency = formatCurrency(value.product[0].boxCost)
        array.push(temp)
        temp = {} as ILineChartProps
      })
    : []

    return array
  }

  return (
    <>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant='h4' fontWeight={600}>
          Variação de Preço
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ my: 5 }}>
        <FilterCard id={idFilterPriceVariation} handleFilter={handleFilter} setOpen={setOpenProductFilter} />
        <ProductDialog id={idFilterPriceVariation} show={openProductFilter} onClose={() => { setOpenProductFilter(false) }} />
      </Grid>
      <RechartsWrapper>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <PriceVariationLineChart
            data={handleLineChartPriceData()}
            title='Variação de Preço (Mensal)'
            subTitle='Média mensal de preço de 1 produto'
            dataKey='productPrice'
          />
        </Grid>
      </RechartsWrapper>
    </>
  )
}

export default DashboardVariacaoPreco
