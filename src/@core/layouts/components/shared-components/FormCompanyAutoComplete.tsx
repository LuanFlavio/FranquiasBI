  import { Fragment, useEffect, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { FormControlProps, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormInputProps } from 'src/@core/components/forms/hook-forms/FormInputProps'
import { CompanyService } from 'src/services/api/company/CompanyService';
import { ICompany } from 'src/@core/models'
import { useDebounce } from 'use-debounce'

interface SectorProp {
  id?: string
  type?: number
}

export const FormCompanyAutoComplete = ({
  control,
  label,
  name,
  id,
  size,
  disabled
}: FormInputProps & FormControlProps & SectorProp) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [deboucedDescription] = useDebounce(description, 300)
  const [options, setOptions] = useState<ICompany[]>([])

  const isLoading = open && loading

  useEffect(() => {
    if (id !== undefined) {
      const fetchData = async () => {
        setLoading(true)
        const response = await CompanyService.getAll({}).finally(() => setLoading(false))
        if (response instanceof Error) {
          return console.error(response)
        } else {
          setOptions(response.data)
        }
      }
      fetchData()
    } else {
      const fetchData = async () => {
        setLoading(true)
        const response = await CompanyService
          .getAll({
            active: true
          })
          .finally(() => setLoading(false))
        if (response instanceof Error) {
          return console.error(response)
        } else {
          setOptions(response.data)
        }
      }
      fetchData()
    }
  }, [deboucedDescription, open])

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
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={id}
          size={size}
          open={open}
          options={options}
          loading={isLoading}
          disabled={disabled}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionLabel={option => option?.description || ''}
          onChange={(_, selectedSector) => {
            field.onChange(selectedSector)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => (
            <TextField
              label={label}
              {...params}
              error={!!error}
              onChange={handleInput}
              helperText={error ? error.message : null}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                )
              }}
            />
          )}
        />
      )}
    />
  )
}
