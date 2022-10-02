/* eslint-disable @typescript-eslint/no-empty-function */
import { Product } from '../entity/product'
import { ProductSpecial } from '../entity/productSpecial'
import { ProductInterface } from '../entity/productInterface'
import { v4 as uuid } from 'uuid'
import { PRODUCT_SPECIAL, PRODUCT_NORMAL } from './productType'

// interface productType {
//   [key: string]: (id: string, name: string, price: number) => ProductInterface
// }

// const productTypes: productType = {
//   [PRODUCT_NORMAL]: (id: string, name: string, price: number): ProductInterface => new Product(id, name, price),
//   [PRODUCT_SPECIAL]: (id: string, name: string, price: number): ProductInterface => new ProductEspecial(id, name, price)
// }

// /* eslint-disable @typescript-eslint/no-empty-function */
// export class ProductFactory {
//   private constructor () {}
//   static create (type: string, name: string, price: number): ProductInterface {
//     const id = uuid()
//     const product = productTypes[type](id, name, price)
//     if (!product) {
//       throw new Error('Product type is invalid')
//     }
//     return product
//   }
// }

export class ProductFactory {
  static create (type: string, name: string, price: number): ProductInterface {
    const id = uuid()
    if (type === PRODUCT_NORMAL) {
      return new Product(id, name, price)
    }
    if (type === PRODUCT_SPECIAL) {
      return new ProductSpecial(id, name, price)
    }
    throw new Error('Product type is invalid')
  }
}
