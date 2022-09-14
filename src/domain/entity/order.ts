import { OrderItem } from './orderItem';

export class Order {
  private _id: string;

  private _customerId: string;

  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  total(): number {
    return this._items.reduce((total, item) => total + item.total(), 0);
  }

  validate() {
    if (!this._id) {
      throw new Error('Order id is required');
    }
    if (!this._customerId) {
      throw new Error('Customer id is required');
    }
    if (this._items.length === 0) {
      throw new Error('Order items is required');
    }
  }
}