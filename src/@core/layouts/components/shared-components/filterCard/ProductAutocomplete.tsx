import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { IProduct } from 'src/@core/models'
import { InputAdornment } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { setSelectedRange } from 'src/store/apps/product'

interface AutocompleteTextFieldProps {
  value: IProduct[]
  placeholder?: string
  setOpen?: (arg: boolean) => void
  sx?: any
  idGroup: number
}

const AutocompleteTextField: React.FC<AutocompleteTextFieldProps> = ({ value, placeholder, setOpen, sx, idGroup }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [focused, setFocused] = useState<boolean>(false)

  const handleDelete = (chipToDelete: string) => () => {
    dispatch(setSelectedRange({ data: value.filter(chip => chip.description !== chipToDelete), id: idGroup }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    // if (newValue.trim() !== '') {
    //   onChange([...value, { description: newValue } as IProduct])
    // }
  }

  const formatDescription = (desc: string) => {
    let descrition = ''
        let dots = ''
        if(desc?.length > 20) dots = '...'

        for (let index = 0; index < 15; index++) {
          descrition = descrition + (desc[index] != undefined ? desc[index] : '')
        }

        return descrition + dots
  }

  return (
    <TextField
      sx={sx}
      placeholder={placeholder}
      fullWidth
      size='small'
      value=''
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      InputProps={{
        startAdornment: focused ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginRight: 5 }}>
            {value.map((chip, index) => (
              <Chip
                key={index}
                label={formatDescription(chip.description)}
                onDelete={handleDelete(chip.description)}
                style={{ marginRight: '5px' }}
              />
            ))}
          </div>
        ) : value.length > 0 ? (
          <InputAdornment position='start'>{'+' + value.length}</InputAdornment>
        ) : null
      }}
      onChange={handleChange}
      onClick={() => (setOpen != undefined ? setOpen(true) : null)}
    />
  )
}

export default AutocompleteTextField
