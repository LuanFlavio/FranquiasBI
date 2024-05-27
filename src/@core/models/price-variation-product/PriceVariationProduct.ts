export interface IPriceVariationProduct {
  totalValue: number
  totalQtd: number
  month: string
  year: number
  product: IProductPriceVariation[]
}

interface IProductPriceVariation {
  codProduto: number
  description: string
  supplierName: string
  totalValue: number
  totalQuantity: number
  boxCost: number
}
