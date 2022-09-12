import { Order } from '../entity/order';

export class OrderService {
  static calculateTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
