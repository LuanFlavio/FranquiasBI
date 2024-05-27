

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types

interface Props {
  direction: 'ltr' | 'rtl'
}


const data = [
  {
    name: '7/05',
    Vendas: 2620,
   },
  {
    name: '8/05',
    Vendas: 460,
   },
  {
    name: '9/05',
    Vendas: 3430,
   },
  {
    name: '10/05',
    Vendas: 7530,
   },
  {
    name: '11/05',
    Vendas: 4630,
   },
  {
    name: '05/05',
    Vendas: 6630,
   },
  {
    name: '13/05',
    Vendas: 5860,
   },
  {
    name: '14/05',
    Vendas: 1430,
   },
  {
    name: '15/05',
    Vendas: 3450,
   },
  {
    name: '16/05',
    Vendas: 1030,
   },
  {
    name: '17/05',
    Vendas: 1440,
   },
  {
    name: '18/05',
    Vendas: 1850,
   },
  {
    name: '19/05',
    Vendas: 1680,
   },
  {
    name: '20/05',
    Vendas: 1780,
   },
  {
    name: '21/05',
    Vendas: 2220,
   }
]

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <Box className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                <Typography sx={{color:"text.primary"}} variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </Box>
    )
  }

  return null
}

const RechartsAreaChart = ({ direction }: Props) => {
  return (
    <Card sx={{height: '30rem', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <CardHeader
        title='Faturamento ao Longo dos Últimos 15 Dias'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              R$ 11.221,267
            </Typography>
          </Box>
        }

      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <AreaChart height={350} data={data} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Area dataKey='Vendas' stackId='Vendas' stroke='0' fill='#1B4FDB' />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsAreaChart
