import { MouseEvent, useEffect, useState } from 'react'

import { Button, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'

import { CompanyAutocomplete } from './CompanyAutocomplete'
import { SupplierAutocomplete } from './SupplierAutocomplete'
import { ISearchParams } from 'src/services/api/SearchParams'
import { ICompany, IProduct, ISupplier } from 'src/@core/models'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { setFilterState } from 'src/store/apps/filter'
import AutocompleteTextField from './ProductAutocomplete'
import { useSelector } from 'react-redux'

interface IFilterCardParam {
  id: number
  company?: boolean
  supplier?: boolean
  product?: boolean
  handleFilter: () => void
  setOpen?: (arg: boolean) => void
}

export const FilterCard = (param: IFilterCardParam) => {
  const { handleFilter, company = true, supplier = true, product = true, id, setOpen } = param

  const [dateFilter, setDateFilter] = useState<number>(3)
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    id: id,
    supplierCNPJ: undefined,
    companyId: undefined,
    date: dateFilter
  })
  const [listCompanyId, setListCompanyId] = useState<ICompany[]>([])
  const [listSupplierCNPJ, setListSupplierCNPJ] = useState<ISupplier[]>([])
  const [listProductCode, setListProductCode] = useState<IProduct[]>([])
  const productSelectedRange = useSelector((state: RootState) => state.product.find(p => p.id == id)?.selectedRange)

  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const handleDateFilter = (event: MouseEvent<HTMLElement>, newDate: number) => {
    if (newDate == null) event.preventDefault()
    else setDateFilter(newDate)
  }

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      companyId: company ? listCompanyId.map(value => value.id) : undefined,
      supplierCNPJ: supplier ? listSupplierCNPJ.map(value => value.cnpj) : undefined,
      productCode: product ? listProductCode.map((value) => value.id) : undefined,
      date: dateFilter
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCompanyId, listSupplierCNPJ, listProductCode, dateFilter])

  useEffect(() => {
    dispatch(setFilterState(searchParams))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    setListProductCode(productSelectedRange != undefined ? productSelectedRange : [])
  }, [productSelectedRange])

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: { md: 'flex', xs: 'block'}, justifyContent: 'space-between', direction: { md: 'column', xs: 'row'} }}>
            <CompanyAutocomplete
              name='Unidade'
              sx={{ display: company ? 'flex' : 'none', flex: 1, mr: 2 }}
              id='autocomplete-companies'
              size='small'
              setSelectedOptions={companies => setListCompanyId(companies)}
            />
            <SupplierAutocomplete
              name='Fornecedores'
              sx={{ display: supplier ? 'flex' : 'none', flex: 1, mr: 2 }}
              id='autocomplete-suppliers'
              size='small'
              setSelectedOptions={suppliers => setListSupplierCNPJ(suppliers)}
            />
            <AutocompleteTextField
              idGroup={id}
              placeholder="Produtos"
              sx={{ display: product ? 'flex' : 'none', flex: 1, mr: 2 }}
              setOpen={setOpen}
              value={listProductCode}
            />
            <ToggleButtonGroup exclusive value={dateFilter} onChange={handleDateFilter} sx={{ mr: 2 }}>
              <ToggleButton size='small' value={3} sx={{ width: 80, height: 40 }}>
                3 meses
              </ToggleButton>
              <ToggleButton size='small' value={6} sx={{ width: 80, height: 40 }}>
                6 meses
              </ToggleButton>
              <ToggleButton size='small' value={12} sx={{ width: 85, height: 40 }}>
                1 ano
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant='contained'
              sx={{ color: theme.palette.common.black, height: 40 }}
              onClick={handleFilter}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
