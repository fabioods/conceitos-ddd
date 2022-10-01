import { Product } from './product'

describe('Product tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 01', 10)
    }).toThrowError('Product id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('1', '', 10)
    }).toThrowError('Product name is required')
  })

  it('should throw error when price is zero or lower', () => {
    expect(() => {
      const product = new Product('1', 'p1', -1)
    }).toThrowError('Product price is invalid')
  })

  it('should throw error when price is invalid', () => {
    expect(() => {
      const product = new Product('1', 'p1', null)
    }).toThrowError('Product price is invalid')
  })

  it('should change a product name', () => {
    const product = new Product('1', 'p1', 10)
    product.changeName('p2')
    expect(product.name).toBe('p2')
  })

  it('should change a product price', () => {
    const product = new Product('1', 'p1', 10)
    product.changePrice(20)
    expect(product.price).toBe(20)
  })
})
