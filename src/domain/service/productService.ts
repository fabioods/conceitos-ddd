import { Product } from '../entity/product'

export class ProductService {
  static incresePrice (products: Product[], percentage: number): Product[] {
    return products.map(product => {
      const newPrice = (product.price * percentage) / 100 + product.price
      product.changePrice(newPrice)
      return product
    })
  }
}
