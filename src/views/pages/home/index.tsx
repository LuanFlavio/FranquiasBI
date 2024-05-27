// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Type Import
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import RechartsPieChart from './charts/RechartsPieChart'
import RechartsLineChart from './charts/RechartsLineChart'
import RechartsBarChart from './charts/RechartsBarChart'
import RechartsAreaChart from './charts/RechartsAreaChart'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import { useTheme } from '@mui/material'

// ** Demo Components Imports
const data: CardStatsCharacterProps[] = [
  {
    stats: 'R$ 600.000,00',
    title: 'Meta',
    trendNumber: '+38%',
    chipColor: 'primary',
    chipText: 'Year of 2022',
    icon: 'mdi:chart-donut'
  },
  {
    stats: '10.739',
    trend: 'negative',
    title: 'Qtd. de Vendas',
    trendNumber: '-22%',
    chipText: 'Last Week',
    chipColor: 'secondary',
    icon: 'mdi:bar-chart'
  },
  {
    stats: '153,86',
    title: 'Itens por Venda',
    trendNumber: '+38%',
    chipColor: 'primary',
    chipText: 'Year of 2022',
    icon: 'mdi:add-shopping-cart'
  },
  {
    stats: 'R$ 1087,68',
    trend: 'negative',
    title: 'Ticket Médio',
    trendNumber: '-22%',
    chipText: 'Last Week',
    chipColor: 'secondary',
    icon: 'mdi:money'
  }
]

const DashboardHome = () => {
  const theme = useTheme()

  return (
    <RechartsWrapper sx={{ color: theme.palette.text.primary }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[0]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[1]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[2]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[3]} />
        </Grid>

        <Grid item xs={12} md={6}>
          <RechartsPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <RechartsLineChart direction='ltr' />
        </Grid>
        <Grid item xs={12} md={6}>
          <RechartsBarChart direction='ltr' />
        </Grid>
        <Grid item xs={12} md={6}>
          <RechartsAreaChart direction='ltr' />
        </Grid>
      </Grid>
    </RechartsWrapper>
  )
}

export default DashboardHome
