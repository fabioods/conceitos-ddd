
import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/orderItem'

import { OrderService } from './orderService'

describe('Order service test unit tests', () => {
  it('should calculate the total price of all orders', () => {
    const orderItem01 = new OrderItem('1', 'Product 01', 10, 2) // 20
    const orderItem02 = new OrderItem('2', 'Product 02', 20, 1) // 20
    const orderItem03 = new OrderItem('3', 'Product 03', 30, 3) // 90

    const order01 = new Order('1', '1', [orderItem01, orderItem02])
    const order02 = new Order('2', '2', [orderItem03])

    const orders = [order01, order02]
    const total = OrderService.calculateTotal(orders)
    expect(total).toBe(130)
  })

  it('should place an order', () => {
    const customer = new Customer('1', 'Customer 01')
    const orderItem01 = new OrderItem('1', 'Product 01', 10, 2)

    const order = OrderService.placeOrder(customer, [orderItem01])
    expect(customer.rewardPoints).toBe(10)
    expect(order.total()).toBe(20)
  })

  it('should throw when try to place an order', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 01')
      const order = OrderService.placeOrder(customer, [])
    }).toThrowError('Order items is required')
  })
})
