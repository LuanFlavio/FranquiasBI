import { Fragment, useEffect, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'

import { ICompany } from 'src/@core/models/company/Company'
import { CompanyService } from 'src/services/api/company/CompanyService'
import { FormControlProps, TextField } from '@mui/material'
import { FormInputProps } from 'src/@core/components/forms/hook-forms/FormInputProps'
import { useDebounce } from 'use-debounce'

interface CompanySelectProps extends FormInputProps {
  initialCompany?: ICompany; // Adicione a prop para a empresa inicial
}

export const CompanySelect = ({ sx, name, id, setSelectedOption, initialCompany }: CompanySelectProps & FormControlProps) => {
  const [options, setOptions] = useState<ICompany[]>([])
  const [description, setDescription] = useState<string>()
  const [deboucedDescription] = useDebounce(description, 300)
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(initialCompany || null)

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

  useEffect(() => {
    if (initialCompany) {
      setSelectedCompany(initialCompany)
    }
  }, [initialCompany])

  return (
    <Autocomplete
      sx={sx}
      options={[ {} as ICompany, ...options ]}
      onChange={(_, selectedOptions) => {
        setSelectedOption!(selectedOptions)
        setSelectedCompany(selectedOptions)
      }}
      size='small'
      value={selectedCompany}
      id={id}
      getOptionLabel={option => option?.tradeName || 'Selecione uma opção'}
      clearOnEscape
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
