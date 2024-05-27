// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Types LOCAL NOW
// import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { formatCurrency } from 'src/@core/utils/format'

interface IBarChartProps {
  XAxis: string[]
  data: number[]
}

const ApexBarChart = (props: IBarChartProps) => {

  const { XAxis, data } = props

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['#ffb400'],
    tooltip: {
      y: {
          formatter: (value) => formatCurrency(value),
          title: {
              formatter: () => 'Valor: ',
          }
      },
     },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.primary }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: XAxis,
      labels: {
        style: { colors: theme.palette.text.primary }
      }
    }
  }

  return (
    <ApexChartWrapper>
      <Card sx={{ overflow: 'visible'}}>
        <CardHeader
          title='Maiores Fornecedores (Valor)'
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          <ReactApexcharts
            type='bar'
            height={400}
            options={options}
            series={[{ data: data }]}
          />
        </CardContent>
      </Card>
    </ApexChartWrapper>
  )
}

export default ApexBarChart
