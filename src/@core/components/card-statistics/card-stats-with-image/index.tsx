// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Types Imports
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'
import { Icon } from '@iconify/react'

interface Props {
  data: CardStatsCharacterProps
}


const CardStatsCharacter = ({ data }: Props) => {
  // ** Vars
 const { title, icon, stats } = data

  return (
    <Card sx={{ height: '8rem', overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{title}</Typography>
          <Box sx={{ color: 'primary.main' }}>
            <Icon icon={icon ? icon : ''} fontSize={30} />
          </Box>
        </Box>
        <Typography variant='h5' sx={{ mr: 1.5 }}>
          {stats}
        </Typography>
      </CardContent>
    </Card>
  )

}

export default CardStatsCharacter
