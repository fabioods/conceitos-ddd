
import { ProductFactory } from '../factory/productFactory'
import { ProductService } from './productService'

describe('Product service test unit tests', () => {
  it('should change the prices of all products', () => {
    const productNormal01 = ProductFactory.create('normal', 'Product 01', 10)
    const productNormal02 = ProductFactory.create('normal', 'Product 02', 20)
    const productSpecial01 = ProductFactory.create('special', 'Product 03', 30)
    const products = [productNormal01, productNormal02, productSpecial01]

    ProductService.incresePrice(products, 100)
    expect(productNormal01.price).toBe(20)
    expect(productNormal02.price).toBe(40)
    expect(productSpecial01.price).toBe(6000)
  })
})
