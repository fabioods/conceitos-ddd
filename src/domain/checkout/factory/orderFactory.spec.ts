import { v4 as uuid } from 'uuid'
import { CustomerFactory } from '../../customer/factory/customerFactory'
import { ProductFactory } from '../../product/factory/productFactory'
import { OrderFactory, OrderProps } from './orderFactory'

describe('Order Factory', () => {
  it('should create a new order', () => {
    const customer = CustomerFactory.create('John Doe')
    const product1 = ProductFactory.create('normal', 'Product 1', 10)
    const product2 = ProductFactory.create('normal', 'Product 2', 20)

    const orderProps: OrderProps = {
      id: uuid(),
      customerId: customer.id,
      items: [
        {
          id: uuid(),
          name: product1.name,
          productId: product1.id,
          quantity: 1,
          price: product1.price
        },
        {
          id: uuid(),
          name: product2.name,
          productId: product2.id,
          quantity: 2,
          price: product2.price
        }
      ]
    }
    const order = OrderFactory.create(orderProps)

    expect(order.id).toBeTruthy()
    expect(order.customerId).toBe(customer.id)
    expect(order.items.length).toBe(2)
  })
})
