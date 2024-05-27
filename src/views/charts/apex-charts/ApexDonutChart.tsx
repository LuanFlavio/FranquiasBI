// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { formatCurrency } from 'src/@core/utils/format'

const donutColors = {
  series1: '#980000',
  series2: '#ff1500',
  series3: '#ff3c00',
  series4: '#ff6400',
  series5: '#ff8c00',
  series6: '#ffb400'
}

interface IDonutChartProps {
  total: string
  data: number[]
  labels: string[]
}

const ApexDonutChart = (props: IDonutChartProps) => {

  const { total, data, labels } = props

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: labels,
    colors: [donutColors.series1, donutColors.series2, donutColors.series3, donutColors.series4, donutColors.series5, donutColors.series6],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      formatter: (desc) => {
        let descrition = ''
        let dots = ''
        if(desc?.length > 20) dots = '...'

        for (let index = 0; index < 20; index++) {
          descrition = descrition + (desc[index] != undefined ? desc[index] : '')
        }

        return descrition + dots
      },
      labels: { colors: theme.palette.text.primary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: false,
              fontSize: '1.2rem',
              color: theme.palette.text.primary
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => formatCurrency(val)
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Valor Total',
              formatter: () => total,
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            height: 420
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <ApexChartWrapper>
      <Card sx={{ overflow: 'visible', height: 620 }}>
        <CardHeader
          title='Maiores (% do Valor)'
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent sx={{ height: 420 }}>
          <ReactApexcharts type='donut' height={420} options={options} series={data} />
        </CardContent>
      </Card>
    </ApexChartWrapper>
  )
}

export default ApexDonutChart
