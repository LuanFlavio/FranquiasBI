import { Card, CardContent, Typography, useTheme} from '@mui/material'

interface IIndicativeCard {
  title: string
  value?: string
}


export const IndicativeCard = (param: IIndicativeCard) => {
  const theme = useTheme();

  const {title, value} = param



  return (
    <Card>
      <CardContent>
        <Typography color={theme.palette.primary.main} sx={{ fontSize: 18 }}>
          {title}
        </Typography>
        <Typography color={theme.palette.text.primary} sx={{ fontSize: 20, mt: 3, fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
