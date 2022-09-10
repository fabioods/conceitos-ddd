import { OrderItem } from './orderItem';

export class Order {
  private id: string;

  customerId: string;

  items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.validate();
  }

  validate() {
    if (!this.id) {
      throw new Error('Order id is required');
    }
    if (!this.customerId) {
      throw new Error('Customer id is required');
    }
    if (!this.items) {
      throw new Error('Order items is required');
    }
  }
}
