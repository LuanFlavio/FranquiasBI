import { Fragment, useEffect, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import { ISupplier } from 'src/@core/models'
import { PurchaseService } from 'src/services/api/purchase/PurchaseService'
import { FormControlProps, TextField } from '@mui/material'
import { FormInputProps } from 'src/@core/components/forms/hook-forms/FormInputProps'
import { useDebounce } from 'use-debounce'

export const SupplierAutocomplete = ({ sx, name, id, setSelectedOptions }: FormInputProps & FormControlProps) => {
  const [options, setOptions] = useState<ISupplier[]>([])
  const [description, setDescription] = useState<string>()
  const [deboucedDescription] = useDebounce(description, 300)

  useEffect(() => {
    const fetchData = async () => {
      const suppliers = await PurchaseService.getAllSupplier({
        currentPage: 1,
        itemsPerPage: 10,
        description: deboucedDescription !== '' ? deboucedDescription : undefined
      })
      if (suppliers instanceof Error) {
        return console.error(suppliers)
      } else {
        setOptions(suppliers.data)
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
      clearOnEscape
      getOptionLabel={option => `${option?.description} / CNPJ: ${option.cnpj}` || ''}
      isOptionEqualToValue={(option, value) => option.cnpj === value.cnpj}
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
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}
