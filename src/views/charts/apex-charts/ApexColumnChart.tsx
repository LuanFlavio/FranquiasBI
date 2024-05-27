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

const columnColors = {
  bg: '#2e2e2e45',
  series1: '#980000',
  series2: '#ff1500',
  series3: '#ff3c00',
  series4: '#ff6400',
  series5: '#ff8c00',
  series6: '#ffb400'
}

// const columnColors = {
//   bg: '#2e2e2e45',
//   series1: '#2c3465',
//   series2: '#754276',
//   series3: '#dd5182',
//   series4: '#ff6e54',
//   series5: '#ffa600',
//   series6: '#394ff0'
// }

interface IColumnChartProps {
  XAxis: string[]
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
}

const ApexColumnChart = ({ XAxis, series }: IColumnChartProps) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2, columnColors.series3, columnColors.series4, columnColors.series5, columnColors.series6],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      formatter: (desc) => {
        let descrition = ''
        let dots = ''
        if(desc?.length > 20) dots = '...'

        for (let index = 0; index < 20; index++) {
          descrition = descrition + (desc[index] != undefined ? desc[index] : '')
        }

        return descrition + dots
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '35%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.primary },
        formatter: (value) => formatCurrency(value)
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: XAxis,
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.primary }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <ApexChartWrapper>
      <Card>
        <CardHeader
          title='Valor (R$)'
          titleTypographyProps={{ align: 'center' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
        />
        <CardContent>
          <ReactApexcharts type='bar' height={400} options={options} series={series} />
        </CardContent>
      </Card>
    </ApexChartWrapper>
  )
}

export default ApexColumnChart
