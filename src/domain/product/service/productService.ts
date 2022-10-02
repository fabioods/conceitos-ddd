import { ProductInterface } from '../entity/productInterface'

export class ProductService {
  static incresePrice (products: ProductInterface[], percentage: number): ProductInterface[] {
    return products.map(product => {
      const newPrice = (product.price * percentage) / 100 + product.price
      product.changePrice(newPrice)
      return product
    })
  }
}
