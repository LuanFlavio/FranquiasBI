import { useContext } from 'react'
import { OnAuthContext } from 'src/context/AuthContextOn'

export const useAuth = () => useContext(OnAuthContext)
