import { Sequelize } from 'sequelize-typescript'
import { Address } from '../../../../domain/customer/valueObject/address'
import { Customer } from '../../../../domain/customer/entity/customer'
import { CustomerModel } from './model/customerModel'
import { CustomerSequelizeRepository } from './customerSequelizeRepository'

describe('Customer Repository', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new customer', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)
    const customerFound = await CustomerModel.findByPk(customer.id)
    expect(customerFound).not.toBeNull()
    expect(customerFound.id).toBe('1')
  })

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)
    const customerFound = await customerRepository.find('1')
    expect(customerFound).not.toBeNull()
    expect(customerFound.id).toBe('1')
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)
    customer.changeName('Customer 2')
    await customerRepository.update(customer)
    const customerFound = await customerRepository.find('1')
    expect(customerFound).not.toBeNull()
    expect(customerFound.name).toBe('Customer 2')
  })

  it('should throw an error when try to find a customer', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const errorExpected = 'Customer not found'
    await expect(customerRepository.find('1')).rejects.toThrow(errorExpected)
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)
    const customers = await customerRepository.findAll()
    expect(customers).not.toBeNull()
    expect(customers.length).toBe(1)
  })
})
