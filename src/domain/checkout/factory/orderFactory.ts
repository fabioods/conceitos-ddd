import { Order } from '../entity/order'
import { OrderItem } from '../entity/orderItem'

export interface OrderItemsProps {
  id: string
  name: string
  productId: string
  quantity: number
  price: number
}

export interface OrderProps {
  id: string
  customerId: string
  items: OrderItemsProps[]
}

export class OrderFactory {
  static create (orderProps: OrderProps): Order {
    const orderItems = orderProps.items.map(item => new OrderItem(item.id, item.productId, item.price, item.quantity))
    const order = new Order(orderProps.id, orderProps.customerId, orderItems)
    return order
  }
}
