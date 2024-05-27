export interface ISupplierChart {
  totalByDate: ITotals[]
  pieSupplierTotal: ISupplier[]
  column: IColumn[]
}

interface ITotals {
  totalValue: number
  totalQtd: number
}

export interface ISupplier {
  cnpj: string
  description: string
  totalValue: number
  totalQtd: number
}

export interface IColumn {
  cnpj: string
  description: string
  datas: IDatas[]
}

interface IDatas {
  totalValue: number
  totalQuantity: number
  month: string
  year: number
}
