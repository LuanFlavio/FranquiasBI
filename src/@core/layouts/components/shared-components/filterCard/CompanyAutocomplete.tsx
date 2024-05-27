import { Fragment, useEffect, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'

import { ICompany } from 'src/@core/models/company/Company'
import { CompanyService } from 'src/services/api/company/CompanyService'
import { FormControlProps, TextField } from '@mui/material'
import { FormInputProps } from 'src/@core/components/forms/hook-forms/FormInputProps'
import { useDebounce } from 'use-debounce'

export const CompanyAutocomplete = ({ sx, name, id, setSelectedOptions }: FormInputProps & FormControlProps) => {
  const [options, setOptions] = useState<ICompany[]>([])
  const [description, setDescription] = useState<string>()
  const [deboucedDescription] = useDebounce(description, 300)

  useEffect(() => {
    const fetchData = async () => {
      const locations = await CompanyService.getAll({
        currentPage: 1,
        itemsPerPage: 10,
        description: deboucedDescription !== '' ? deboucedDescription : undefined
      })
      if (locations instanceof Error) {
        return console.error(locations)
      } else {
        setOptions(locations.data)
      }
    }
    fetchData()
  }, [deboucedDescription])

  const handleInput = (event: any) => {
    const { value } = event.target
    setDescription(value)
  }

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      sx={sx}
      multiple
      limitTags={0}
      options={options}
      onChange={(_, selectedOptions) => setSelectedOptions!(selectedOptions)}
      size='small'
      id={id}
      getOptionLabel={option => option?.tradeName || ''}
      clearOnEscape
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          label={name}
          placeholder={name}
          onChange={handleInput}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {/* {loading ? <CircularProgress color='inherit' size={20} /> : null} */}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}
