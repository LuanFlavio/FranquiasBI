export interface IProductChart {
  totalByProduct: ITotals[]
  chartByProduct: IProductColumn[]
}

interface ITotals {
  totalValue: number
  totalQtd: number
}

export interface IProductColumn extends ITotals {
  month: string
  year: number
  product: IProductToChart[]
}

export interface IProduct {
  id: number
  description: string
  supplierCNPJ: string
  supplierName: string
  boxCost: number | null
}

interface IProductToChart {
  description: string
  totalValue: number
  totalQuantity: number
}
