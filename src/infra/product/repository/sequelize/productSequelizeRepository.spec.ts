import { Sequelize } from 'sequelize-typescript'
import { Product } from '../../../../domain/product/entity/product'
import { ProductModel } from './model/productModel'
import { ProductSequelizeRepository } from './productSequelizeRepository'

describe('Product Repository Sequelize Test', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new product', async () => {
    const productRepository = new ProductSequelizeRepository()
    const product = new Product('1', 'Product 1', 10.0)
    await productRepository.create(product)
    const productModel = await ProductModel.findByPk(product.id)
    expect(productModel).not.toBeNull()
    expect(productModel?.id).toBe('1')
  })

  it('should update a product', async () => {
    const productRepository = new ProductSequelizeRepository()
    const product = new Product('1', 'Product 1', 10.0)
    await productRepository.create(product)
    product.changeName('Product 1 Updated')
    product.changePrice(20.0)
    await productRepository.update(product)
    const productModel = await ProductModel.findByPk(product.id)
    expect(productModel).not.toBeNull()
    expect(productModel?.id).toBe('1')
    expect(productModel?.name).toBe('Product 1 Updated')
  })

  it('should find all products', async () => {
    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)
    const products = await productRepository.findAll()
    expect(products).not.toBeNull()
    expect(products.length).toBe(2)
  })

  it('should find a product by id', async () => {
    const productRepository = new ProductSequelizeRepository()
    const product = new Product('1', 'Product 1', 10.0)
    await productRepository.create(product)
    const productFound = await productRepository.find(product.id)
    expect(productFound).not.toBeNull()
    expect(productFound.id).toBe('1')
  })

  it('should throw an error when try to find a product by id', async () => {
    const productRepository = new ProductSequelizeRepository()
    const errorExpect = 'Product not found'
    await expect(productRepository.find('1')).rejects.toThrowError(errorExpect)
  })
})
