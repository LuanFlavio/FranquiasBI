// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import { Icon } from '@iconify/react'

// ** Third Party Import

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import { Avatar, Box, Chip, Divider, Theme, Typography } from '@mui/material'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

interface listEmpresa {
  FantasyName: string
  Identification: string
}

const company = [
  { FantasyName: 'Empresa 1', Identification: '11759135000151' },
  { FantasyName: 'Empresa 2', Identification: '12345678912369' },
  { FantasyName: 'Empresa 3', Identification: '12345678964325' }
]

const CompanyDropdown = ({ settings }: Props) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<any>(null)

  // ** Hook

  // ** Vars
  const { layout, direction } = settings

  const handleCompDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  function handleCompDropdownClose(item: listEmpresa) {
    setAnchorEl(null)
    localStorage.setItem('identification', item.Identification)
    localStorage.setItem('FantasyName', item.FantasyName)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }
  const stylesCardActive = {
    p: 0,
    background: (theme: Theme) => (theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main),
    borderRadius: '6px',
    '&:hover': {
      background: (theme: Theme) =>
        theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
    }
  }

  const stylesCard = {
    p: 0,
    background: (theme: Theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[700]),
    borderRadius: '6px',
    '&:hover': {
      background: (theme: Theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[600])
    }
  }

  return (
    <Fragment>
      <Chip
        label='Matriz'
        aria-haspopup='true'
        aria-controls='customized-menu'
        clickable
        onClick={handleCompDropdownOpen}
        sx={layout === 'vertical' ? { mr: 0.75, px: 1 } : { mx: 0.75, px: 1 }}
        icon={<Icon icon='mdi:office-building-outline' fontSize={20} />}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCompDropdownClose}
        sx={{ '& .MuiMenu-paper': { mt: 4, minWidth: 230 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 3 }}>
          <Box
            sx={{
              ml: 2,
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Mudar de Franquia</Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />

        <Box sx={{ pt: 3, px: 5, height: '210px', overflow: 'auto' }}>
          <Box sx={{ paddingBottom: 1 }}>
            <MenuItem sx={stylesCardActive}>
              <Box sx={styles}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt='John Doe' sx={{ width: 40, height: 40 }} src='/images/avatars/1.png' />
                  <Box
                    sx={{
                      ml: 3,
                      display: 'flex',
                      alignItems: 'flex-start',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: 'white' }}> Matriz </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'white' }}>CNPJ</Typography>
                  </Box>
                </Box>
              </Box>
            </MenuItem>
          </Box>
          {company.map((item: listEmpresa, index) => {
            if (item.Identification) {
              return (
                <Box sx={{ py: 1 }} key={index}>
                  <MenuItem sx={stylesCard} onClick={() => handleCompDropdownClose(item)}>
                    <Box sx={styles}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt='John Doe' sx={{ width: 40, height: 40 }} src='/images/avatars/1.png' />
                        <Box
                          sx={{
                            ml: 3,
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography sx={{ fontWeight: 600, color: 'white' }}>{item.FantasyName}</Typography>
                          <Typography sx={{ fontSize: '0.8rem', color: 'white' }}>
                            CNPJ {item.Identification}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </MenuItem>
                </Box>
              )
            }
          })}
        </Box>
      </Menu>
    </Fragment>
  )
}

export default CompanyDropdown
