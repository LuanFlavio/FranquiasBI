// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

interface Props {
  title: string
  subTitle?: string
  data: any[]
  dataKey: string
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        {payload &&
          payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                {i.dataKey == 'totalValue' ? (
                  <Typography sx={{ fontSize: '0.875rem' }}>{`Valor: ${i.payload['totalValueCurrency']}`}</Typography>
                ) : (
                  <Typography
                    sx={{ fontSize: '0.875rem' }}
                  >{`Quantidade: ${i.payload['totalQtdFormated']}`}</Typography>
                )}
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const MixProductLineChart = (props: Props) => {
  const { data, subTitle, title, dataKey } = props

  const calcPercent = (numStart: number, numEnd: number) => {
    return (((numEnd - numStart) / numStart) * 100).toFixed(0)
  }

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subTitle ? subTitle : ''}
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body1' sx={{ mr: 5 }}>
              Evolução:
            </Typography>
            {data && data[0] && data[0][dataKey] ? (
              calcPercent(data[0][dataKey], data[data.length - 1][dataKey]).includes('-') ? (
                <>
                  <CustomChip
                    skin='light'
                    color='error'
                    sx={{ fontWeight: 500, borderRadius: 1, fontSize: '0.875rem' }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                        <Icon icon='mdi:arrow-down' fontSize='1rem' />
                        {data && data[0] && data[0][dataKey] ? (
                          <span>{`${calcPercent(data[0][dataKey], data[data.length - 1][dataKey])}%`}</span>
                        ) : null}
                      </Box>
                    }
                  />
                </>
              ) : (
                <>
                  <CustomChip
                    skin='light'
                    color='success'
                    sx={{ fontWeight: 500, borderRadius: 1, fontSize: '0.875rem' }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                        <Icon icon='mdi:arrow-up' fontSize='1rem' />
                        {data && data[0] && data[0][dataKey] ? (
                          <span>{`${calcPercent(data[0][dataKey], data[data.length - 1][dataKey])}%`}</span>
                        ) : null}
                      </Box>
                    }
                  />
                </>
              )
            ) : null}
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <LineChart height={350} data={data} style={{ direction: 'ltr' }} margin={{ left: 15, right: 15 }}>
              <CartesianGrid />
              <XAxis dataKey='description' />
              <YAxis orientation='left' />
              <Tooltip content={CustomTooltip} />
              <Line dataKey='productCount' stroke='#E09E00' strokeWidth={3} />
              <Line dataKey='totalValue' stroke='#ff1500' strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MixProductLineChart
