/**
 * - Get all data filtered or an error returned by API.
 * - Obtenha todos os dados filtrados ou um erro retornado pela API.
 * @param supplierCNPJ List of supplier CNPJs to filter.
 * @param productCode List of product codes to filter.
 * @param companyId List of company IDs to filter.
 * @param date Date to filter.
 * @returns Returns the request when fulfilled or an Error in case of rejection.
 */

export interface ISearchParams {
  id: number
  supplierCNPJ?: string[]
  productCode?: number[]
  companyId?: number[]
  date: number
}

/**
 * - Get all data filtered by pagination or an error returned by API.
 * - Obtenha todos os dados filtrados com paginação ou um erro retornado pela API.
 * @param currentpage Current page number.
 * @param itemsPerPage Number of rows per payload.
 * @param description Filter request by text value.
 * @returns Return the request when fulfilled or an Error in case of reject.
 */

export interface IPaginationBasicParams {
  id?: number
  currentPage?: string | number
  itemsPerPage?: number
  description?: string
}
