// ** React Imports
import { ElementType, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, useTheme } from '@mui/material/styles'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavLink, NavGroup } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

// ** Utils
import { handleURLQueries } from 'src/@core/layouts/utils'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface Props {
  parent?: boolean
  item: NavLink
  navHover?: boolean
  settings: Settings
  navVisible?: boolean
  collapsedNavWidth: number
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  isSubToSub?: NavGroup | undefined
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderRadius: 1,
  color: theme.palette.primary.main,
  transition: 'padding-left .25s ease-in-out',
  '&.active': {
    '&': {
      backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.2)}`,
      '&:hover': {
        backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.19)}`
      }
    }
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth
}: Props) => {
  // ** Hooks
  const theme = useTheme()
  const router = useRouter()

  // ** Vars
  const { navCollapsed } = settings

  const icon: ReactNode = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

  const conditionalBgColor = () => {
    if (theme.palette.mode === 'dark') {
      return {
        color: `${theme.palette.primary.dark} !important`,
        '&.Mui-selected': {
          backgroundColor: `${hexToRGBA(theme.palette.primary.dark, 0.3)}`,
          '&:hover': {
            backgroundColor: `${hexToRGBA(theme.palette.primary.dark, 0.2)}`
          }
        }
      }
    } else if (theme.palette.mode === 'light') {
      return {
        color: `${theme.palette.primary.dark} !important`,
        '&.Mui-selected': {
          backgroundColor: `${hexToRGBA(theme.palette.primary.dark, 0.7)}`,
          '&:hover': {
            backgroundColor: `${hexToRGBA(theme.palette.primary.dark, 0.6)}`
          }
        }
      }
    } else return {}
  }

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ px: '0 !important', borderLeft: 1 }}
      >
        <Link style={{ textDecoration: 'none' }} passHref href={item.path === undefined ? '/' : `${item.path}`}>
          <MenuNavLink
            component={'a'}
            className={isNavLinkActive() ? 'active' : ''}
            {...(item.openInNewTab ? { target: '_blank' } : null)}
            onClick={e => {
              if (item.path === undefined) {
                e.preventDefault()
                e.stopPropagation()
              }
              if (navVisible) {
                toggleNavVisibility()
              }
            }}
            sx={{
              py: 2.25,
              width: 185,
              ...conditionalBgColor(),
              ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
              pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24) / 8 : 2.5,
              pr: navCollapsed && !navHover ? ((collapsedNavWidth - navigationBorderWidth - 24) / 2 - 5) / 4 : 3.5
            }}
          >
            {isSubToSub ? null : (
              <ListItemIcon
                sx={{
                  display: 'none',
                  color: 'text.primary',
                  transition: 'margin .25s ease-in-out',
                  ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2.5 }),
                  ...(parent ? { ml: 1.25, mr: 3.75 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                  '& svg': {
                    fontSize: '0.875rem',
                    ...(!parent ? { fontSize: '1.5rem' } : {}),
                    ...(parent && item.icon ? { fontSize: '0.875rem' } : {})
                  }
                }}
              >
                <UserIcon icon={icon as string} />
              </ListItemIcon>
            )}

            <MenuItemTextMetaWrapper
              sx={{
                ...(isSubToSub ? { ml: 9 } : {}),
                ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
              }}
            >
              <Typography
                {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                  noWrap: true
                })}
              >
                <Translations text={item.title} />
              </Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    ml: 1.25,
                    height: 20,
                    fontWeight: 500,
                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </Link>
      </ListItem>
    </CanViewNavLink>
  )
}

export default VerticalNavLink
