/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from './order'
import { OrderItem } from './orderItem'

describe('Order tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      const order = new Order('', '1', [])
    }).toThrowError('Order id is required')
  })

  it('should throw an error when customer id is empty', () => {
    expect(() => {
      const order = new Order('1', '', [])
    }).toThrowError('Customer id is required')
  })

  it('should throw an error when order items is empty', () => {
    expect(() => {
      const order = new Order('1', '1', [])
    }).toThrowError('Order items is required')
  })

  it('should calculate the total of an order', () => {
    const item01 = new OrderItem('1', 'Item 01', 10, 2)
    const item02 = new OrderItem('2', 'Item 02', 20, 3)
    const order = new Order('1', '1', [item01, item02])
    expect(order.total()).toBe(80)
  })

  it('should throw when item is in a invalid state', () => {
    expect(() => {
      const item01 = new OrderItem('', '1', 10, 2)
    }).toThrowError('Order item id is required')

    expect(() => {
      const item01 = new OrderItem('1', null, 10, 2)
    }).toThrowError('Order item productId is required')

    expect(() => {
      const item01 = new OrderItem('1', '1', null, 2)
    }).toThrowError('Order item price is required')

    expect(() => {
      const item01 = new OrderItem('1', '1', 1, null)
    }).toThrowError('Order item quantity is required')
  })
})
