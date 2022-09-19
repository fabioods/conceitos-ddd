import { Sequelize } from 'sequelize-typescript'
import { Address } from '../../../domain/entity/address'
import { Customer } from '../../../domain/entity/customer'
import { Order } from '../../../domain/entity/order'
import { OrderItem } from '../../../domain/entity/orderItem'
import { Product } from '../../../domain/entity/product'
import { CustomerModel } from '../../db/sequelize/model/customerModel'
import { OrderItemModel } from '../../db/sequelize/model/orderItemModel'
import { OrderModel } from '../../db/sequelize/model/orderModel'
import { ProductModel } from '../../db/sequelize/model/productModel'
import { CustomerSequelizeRepository } from './customerSequelizeRepository'
import { OrderSequelizeRepository } from './orderSequelizeRepository'
import { ProductSequelizeRepository } from './productSequelizeRepository'

describe('Order Repository Sequelize Test', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01, orderItem02])
    await orderRepository.create(order01)

    const order = await OrderModel.findByPk(order01.id, {
      include: ['items']
    })
    expect(order).toBeTruthy()
    expect(order.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: 40,
      items: [
        {
          id: '1',
          order_id: '1',
          product_id: '1',
          quantity: 2,
          price: 10
        },
        {
          id: '2',
          order_id: '1',
          product_id: '2',
          quantity: 1,
          price: 20
        }
      ]
    })
  })

  it('should find an order', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01, orderItem02])
    await orderRepository.create(order01)

    const orderModel = await orderRepository.find(order01.id)
    expect(orderModel).toBeTruthy()
    expect(orderModel.id).toStrictEqual(order01.id)
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20
    const orderItem03 = new OrderItem('3', product1.id, product1.price, 2) // 20
    const orderItem04 = new OrderItem('4', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01, orderItem02])
    await orderRepository.create(order01)
    const order02 = new Order('2', customer.id, [orderItem03, orderItem04])
    await orderRepository.create(order02)

    const orders = await orderRepository.findAll()
    expect(orders).toBeTruthy()
    expect(orders.length).toStrictEqual(2)
  })

  it('should update an order - remove item', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01, orderItem02])
    await orderRepository.create(order01)
    const orderCreated = await orderRepository.find(order01.id)

    expect(orderCreated).toBeTruthy()
    expect(orderCreated.id).toStrictEqual(order01.id)
    expect(orderCreated.total()).toStrictEqual(40)
    expect(orderCreated.items.length).toStrictEqual(2)

    const order02 = new Order('1', customer.id, [orderItem01])
    await orderRepository.update(order02)

    const orderUpdated = await orderRepository.find(order02.id)

    expect(orderUpdated).toBeTruthy()
    expect(orderUpdated.id).toStrictEqual(order02.id)
    expect(orderUpdated.total()).toStrictEqual(20)
    expect(orderUpdated.items.length).toStrictEqual(1)
  })

  it('should update an order - insert new item', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01])
    await orderRepository.create(order01)
    const orderCreated = await orderRepository.find(order01.id)

    expect(orderCreated).toBeTruthy()
    expect(orderCreated.id).toStrictEqual(order01.id)
    expect(orderCreated.total()).toStrictEqual(20)
    expect(orderCreated.items.length).toStrictEqual(1)

    const order02 = new Order('1', customer.id, [orderItem01, orderItem02])
    await orderRepository.update(order02)

    const orderUpdated = await orderRepository.find(order02.id)

    expect(orderUpdated).toBeTruthy()
    expect(orderUpdated.id).toStrictEqual(order02.id)
    expect(orderUpdated.total()).toStrictEqual(40)
    expect(orderUpdated.items.length).toStrictEqual(2)
  })

  it('should throw an error when try to update an order', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, '84000000', 'City 1')
    customer.defineAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductSequelizeRepository()
    const product1 = new Product('1', 'Product 1', 10.0)
    const product2 = new Product('2', 'Product 2', 20.0)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem01 = new OrderItem('1', product1.id, product1.price, 2) // 20
    const orderItem02 = new OrderItem('2', product2.id, product2.price, 1) // 20

    const orderRepository = new OrderSequelizeRepository(sequelize)
    const order01 = new Order('1', customer.id, [orderItem01])
    await orderRepository.create(order01)
    const orderCreated = await orderRepository.find(order01.id)

    expect(orderCreated).toBeTruthy()
    expect(orderCreated.id).toStrictEqual(order01.id)
    expect(orderCreated.total()).toStrictEqual(20)
    expect(orderCreated.items.length).toStrictEqual(1)

    const order02 = new Order('2', customer.id, [orderItem01, orderItem02])
    await expect(orderRepository.update(order02)).rejects.toThrowError()
  })

  it('should thrown an error when an order is not found', async () => {
    const orderRepository = new OrderSequelizeRepository(sequelize)
    await expect(orderRepository.find('1')).rejects.toThrowError()
  })
})
