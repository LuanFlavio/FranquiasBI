// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { IProductColumn } from 'src/@core/models'
import { formatCurrency, numberWithCommas } from 'src/@core/utils/format'

// ** Types LOCAL NOW
// import { DateType } from 'src/types/forms/reactDatepickerTypes'

type DateType = Date | null | undefined

interface Props {
  title: string
  XAxisDataKey: string
  YAxisDataKey: string[]
  direction?: 'ltr' | 'rtl'
  data: IProductColumn[]
  isDateRange?: boolean
}

interface CustomLegendProps {
  data: IProductColumn[]
}

interface IDataHandledProps extends IProductColumn {
  date: string
  totalValueCurrency: string
  totalQtdFormated: string
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

// export const dataTesteRechart = [
//   {
//     date: 'Jan/2024',
//     name: 'Produto X',
//     value: 22,
//     Samsung: 130,
//     Oneplus: 150,
//     Motorola: 210
//   },
//   {
//     date: '8/12',
//     Apple: 100,
//     Samsung: 150,
//     Oneplus: 170,
//     Motorola: 380
//   },
//   {
//     date: '9/12',
//     Apple: 80,
//     Samsung: 140,
//     Oneplus: 160,
//     Motorola: 220
//   },
//   {
//     date: '10/12',
//     Apple: 100,
//     Samsung: 150,
//     Oneplus: 170,
//     Motorola: 380
//   },
//   {
//     date: '11/12',
//     Apple: 50,
//     Samsung: 90,
//     Oneplus: 110,
//     Motorola: 150
//   },
//   {
//     date: '12/12',
//     Apple: 125,
//     Samsung: 90,
//     Oneplus: 100,
//     Motorola: 65
//   },
//   {
//     date: '13/12',
//     Apple: 70,
//     Samsung: 110,
//     Oneplus: 130,
//     Motorola: 210
//   },
//   {
//     date: '14/12',
//     Apple: 100,
//     Samsung: 150,
//     Oneplus: 170,
//     Motorola: 380
//   },
//   {
//     date: '15/12',
//     Apple: 80,
//     Samsung: 100,
//     Oneplus: 120,
//     Motorola: 180
//   },
//   {
//     date: '16/12',
//     Apple: 30,
//     Samsung: 60,
//     Oneplus: 70,
//     Motorola: 110
//   }
// ]

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                {i.dataKey == 'totalValue' ? (
                  <Typography variant='body2'>{`Valor : ${i.payload['totalValueCurrency']}`}</Typography>
                ) : (
                  <Typography variant='body2'>{`Quantidade : ${i.payload['totalQtdFormated']}`}</Typography>
                )}
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const CustomLegend = (props: CustomLegendProps) => {
  const { data } = props

  const legendColors = [
    '#320980',
    '#6e1ff7',
    '#8652df',
    '#a884eb',
    '#c7b3eb',
    '#e7e3ec'
  ]

  if (data) {
    if (data[0].product) {
      const produtosLegenda = [] as string[]
      data.map(value => {
        value.product.map(valueProd => {
          const scan = produtosLegenda.findIndex(p => p == valueProd.description)
          if(scan == -1) produtosLegenda.push(valueProd.description)
        })
      })

      return (
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
          {produtosLegenda.map((values, index) => {

            return (
              <Box
                key={index}
                sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: legendColors[index] } }}
              >
                <Icon icon='mdi:circle' fontSize='0.75rem' />
                <Typography variant='body2'>{values}</Typography>
              </Box>

              //* FAZER VERIFICAÇÃO SE É ULTIMA POSIÇÃO DO ARRAY E NÃO ADD mr: 6
            )
          })}
        </Box>
      )
    }
  }

  return null
}

const RechartsBarChart = (properties: Props) => {
  const { title, XAxisDataKey, YAxisDataKey, direction = 'ltr', data, isDateRange = false } = properties

  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleData = (dataArray: IProductColumn[]): IDataHandledProps[] => {
    const array = [] as IDataHandledProps[]

    dataArray?.map(values => {
      array.push({
        ...values,
        date:
          values.month[0] +
          values.month[1] +
          values.month[2] +
          '/' +
          values.year.toString()[2] +
          values.year.toString()[3],
        totalValueCurrency: formatCurrency(values.totalValue),
        totalQtdFormated: numberWithCommas(values.totalQtd)
      })
    })

    return array
  }

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ align: 'center' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          isDateRange ? (
            <DatePicker
              selectsRange
              id='recharts-bar'
              endDate={endDate}
              selected={startDate}
              startDate={startDate}
              onChange={handleOnChange}
              placeholderText='Click to select a date'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          ) : null
        }
      />
      <CardContent>
        {/* FAZER UM MAP NO NOME DOS PRODUTOS */}
        <CustomLegend data={data} />
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart height={350} data={handleData(data)} barSize={25} style={{ direction }} margin={{ left: 15 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={XAxisDataKey} reversed={direction === 'rtl'} />
              <YAxis dataKey={YAxisDataKey[0]} orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              {/* <Bar dataKey='quantity' stackId='a' fill='#826af9' /> */}
              <Bar dataKey={YAxisDataKey[0]} stackId='a' fill='#ff8c00' radius={[15, 15, 0, 0]} />
              {/* <Bar dataKey='totalQtd' stackId='a' fill='#d2b0ff' />
              <Bar dataKey='value' stackId='a' fill='#f8d3ff' radius={[15, 15, 0, 0]} /> */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsBarChart
