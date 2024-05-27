export interface IMixProduct {
  totalsMixProduct: ITotals[]
  mixProduct: IMixChart[]
}

interface ITotals {
  totalValue: number
  totalCount: number
}

interface IMixChart {
  totalValue: number
  totalQtd: number
  month: string
  year: number
  productCount: number
}
