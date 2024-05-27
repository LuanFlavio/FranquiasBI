export interface IReturn<T> {
  data: T
  selectedItem?: T
  countItems: number
}

export interface IReturnPaginate<T> {
  data: T[]
  selectedItem?: T
  countItems: number
  itemsPerPage: number
  currentPage: number
}
