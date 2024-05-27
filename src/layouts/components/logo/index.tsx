import { useTheme } from '@mui/material/styles'

const LogoSVG = () => {
  const theme = useTheme()

  return (
    <svg width={45} height={45} viewBox='0 0 358 340' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='95' y='36' width='229' height='276' rx='75' fill='url(#paint0_angular_25_3)' />
      <path
        opacity='0.56'
        d='M95.4774 210.416C95.4774 210.416 88.4774 207.416 72.1771 217.597C52.8264 230.224 38.067 233.692 27.2096 232.184C7.3938 229.433 7.42845 205.852 20.7211 200.11C31.714 195.361 53.9086 195.019 61.4775 194.917C66.9776 194.417 70.4775 197.417 75.4775 199.417C80.4775 201.417 82.4773 202.916 87.9774 205.916C93.4775 208.917 95.4774 210.416 95.4774 210.416Z'
        fill={theme.palette.secondary.light}
      />
      <path
        opacity='0.56'
        d='M295.099 119.161C292.172 111.207 288.111 103.717 283.042 96.9223C271.337 81.4574 259.563 87.2048 259.563 87.2048L247.878 166.689C247.878 166.689 259.249 137.167 271.278 125.392C283.307 113.617 295.099 119.161 295.099 119.161Z'
        fill={theme.palette.secondary.light}
      />
      <path
        d='M278.828 92.2239C278.828 92.2239 266.916 85.9446 260.348 106.366C251.451 134.022 247.391 192.118 235.989 214.431C216.226 253.102 160.495 268.459 125.016 234.368C89.5373 200.277 62.0981 194.867 62.0981 194.867C62.0981 194.867 63.4773 194.867 74.9773 193.917C93.0243 193.008 123.379 188.908 150.165 172.688C193.934 146.185 222.16 94.3017 242.183 84.5815C262.206 74.8612 278.828 92.2239 278.828 92.2239Z'
        fill={theme.palette.common.white}
      />
      <defs>
        <linearGradient
          id='paint0_angular_25_3'
          x1='33.5'
          y1='8.49999'
          x2='385.5'
          y2='339.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.333333' stopColor={theme.palette.primary.main} />
          <stop offset='0.791667' stopColor={theme.palette.primary.main} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default LogoSVG
