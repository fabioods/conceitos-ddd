import { Product } from '../entity/product'
import { ProductSpecial } from '../entity/productSpecial'
import { ProductFactory } from './productFactory'
import { PRODUCT_SPECIAL, PRODUCT_NORMAL } from './productType'

describe('Product Factory', () => {
  it('should create a normal product', () => {
    const product = ProductFactory.create(PRODUCT_NORMAL, 'Product Normal', 1)
    expect(product).toBeInstanceOf(Product)
    expect(product.name).toBe('Product Normal')
    expect(product.price).toBe(1)
  })

  it('should create a special product', () => {
    const product = ProductFactory.create(PRODUCT_SPECIAL, 'Product', 2)
    expect(product).toBeInstanceOf(ProductSpecial)
    expect(product.name).toBe('Product - Special')
    expect(product.price).toBe(20)
  })

  it('should throw an error if the type is invalid', () => {
    expect(() => ProductFactory.create('invalid', 'Product', 2)).toThrowError('Product type is invalid')
  })
})
