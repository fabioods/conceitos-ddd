import { v4 as uuidv4 } from 'uuid'
import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/orderItem'

export class OrderService {
  static calculateTotal (orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0)
  }

  static placeOrder (customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order items is required')
    }
    const id = uuidv4()
    const order = new Order(id, customer.id, items)
    customer.addRewardPoints(order.total() / 2)
    return order
  }
}
