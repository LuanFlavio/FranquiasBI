// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



interface Props {
  direction: 'ltr' | 'rtl'
}

const data = [
  {
    name: '12/22',
    Loja1: 1080,
    Loja2: 1130,
    Loja3: 1150,
    Loja4: 2110
  },
  {
    name: '01/23',
    Loja1: 1003,
    Loja2: 1540,
    Loja3: 1754,
    Loja4: 3805
  },
  {
    name: '02/23',
    Loja1: 8020,
    Loja2: 1450,
    Loja3: 1606,
    Loja4: 2205
  },
  {
    name: '03/23',
    Loja1: 1050,
    Loja2: 1550,
    Loja3: 1760,
    Loja4: 3890
  },
  {
    name: '04/23',
    Loja1: 5260,
    Loja2: 9540,
    Loja3: 1104,
    Loja4: 1550
  },
  {
    name: '05/23',
    Loja1: 1265,
    Loja2: 9880,
    Loja3: 1050,
    Loja4: 6545
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
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: '#071B7A', mr: 2.5 } }} key={i.dataKey}>
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

const RechartsBarChart = ({ direction }: Props) => {
  // ** States

  return (
    <Card sx={{height: '30rem', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <CardHeader
        title='Receita Bruta Total dos Últimos 12 Meses por Loja'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#1B4FDB' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Loja 1</Typography>
          </Box>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#133AB7' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Loja 2</Typography>
          </Box>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#0C2893' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Loja 3</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#071B7A' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Loja 4</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <BarChart  height={350} data={data} barSize={25} style={{ direction }} >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey='Loja1' stackId='a' fill='#1B4FDB' />
              <Bar dataKey='Loja2' stackId='a' fill='#133AB7' />
              <Bar dataKey='Loja3' stackId='a' fill='#0C2893' />
              <Bar dataKey='Loja4' stackId='a' fill='#071B7A' radius={[15, 15, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsBarChart
