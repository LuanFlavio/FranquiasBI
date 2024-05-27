// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import ApexBarChart from 'src/views/charts/apex-charts/ApexBarChart'
import ApexDonutChart from 'src/views/charts/apex-charts/ApexDonutChart'
import ApexColumnChart from 'src/views/charts/apex-charts/ApexColumnChart'

// ** Layouts Components Imports
import { FilterCard } from 'src/@core/layouts/components/shared-components/filterCard/FilterCard'

// ** Store
import { AppDispatch, RootState } from 'src/store'
import { useDispatch } from 'react-redux'
import { getDataSupplierChart } from 'src/store/apps/supplier'
import { IndicativeCard } from 'src/@core/layouts/components/shared-components/IndicativeCard'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// ** Utils
import { formatCurrency, numberWithCommas } from 'src/@core/utils/format'

const DashboardFornecedores = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [idFilterSupplier] = useState(new Date().valueOf())

  const data = useSelector((state: RootState) => state.supplier.data)
  const filterSupplier = useSelector((state: RootState) => state.filter.data.find(p => p.id == idFilterSupplier))

  useEffect(() => {
    dispatch(getDataSupplierChart({ date: 3, companyId: [], supplierCNPJ: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = () => {
    dispatch(getDataSupplierChart(filterSupplier!))
  }

  // ----- ColumnChart ----- //
  const handleColumnXAxisSupplier = (): string[] => {
    const array: string[] = []

    data.column?.map(value => {
      value.datas.map(vas => {

        const scan = array.findIndex(p => p == vas.month + '/' + vas.year)
        if(scan == -1) array.push(vas.month + '/' + vas.year)
      })
    })

    return array
  }

  const handleColumnSeriesSupplier = (): ApexAxisChartSeries | undefined => {
    const array: ApexAxisChartSeries = []

    let temp = {
      name: '',
      data: [] as number[]
    }

    data.column?.map(suppliers => {

      temp.name = suppliers.description //Preenche o nome

      suppliers.datas.map(values => {
        temp.data.push(values.totalValue) //Preenche os valores refenrente a cada mês
      })

      array.push(temp)

      temp = {
        name: '',
        data: []
      }
    })

    return array
  }

  // ----- BarChart ----- //
  const handleBarXAxisSupplier = (): string[] => {
    const array: string[] = []

    data.pieSupplierTotal?.map(suppliers => {
      if(suppliers.description == 'Outros') return //REMOVENDO OUTROS PRA FICAR MAIS LEGÍVEL

      array.push(suppliers.description)
    })

    return array
  }

  const handleBarSeriesSupplier = (): number[] => {
    const array: number[] = []

    data.pieSupplierTotal?.map(suppliers => {
      if(suppliers.description == 'Outros') return //REMOVENDO OUTROS PRA FICAR MAIS LEGÍVEL

      array.push(suppliers.totalValue ?? 0)
    })

    return array
  }

  // ----- PieChart ----- //
  const handleDonutXAxisSupplier = () => {
    const array: string[] = []

    data.pieSupplierTotal?.map(suppliers => {
      array.push(suppliers.description)
    })

    return array
  }

  const handleDonutSeriesSupplier = () => {
    const array: number[] = []

    data.pieSupplierTotal?.map(suppliers => {
      array.push(suppliers.totalValue ?? 0)
    })

    return array
  }

  return (
    <>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant='h4' fontWeight={600}>
          Fornecedores
        </Typography>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Valor'}
            value={data.totalByDate ? formatCurrency(data.totalByDate[0]?.totalValue) : '0'}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <IndicativeCard
            title={'Quantidade'}
            value={data.totalByDate ? numberWithCommas(data.totalByDate[0]?.totalQtd) : '0'}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ my: 5 }}>
        <FilterCard id={idFilterSupplier} product={false} handleFilter={handleFilter} />
      </Grid>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <ApexColumnChart XAxis={handleColumnXAxisSupplier()} series={handleColumnSeriesSupplier()} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ApexDonutChart
              total={data.totalByDate ? formatCurrency(data.totalByDate[0]?.totalValue) : '0'}
              data={handleDonutSeriesSupplier()}
              labels={handleDonutXAxisSupplier()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ApexBarChart XAxis={handleBarXAxisSupplier()} data={handleBarSeriesSupplier()} />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </>
  )
}

export default DashboardFornecedores
