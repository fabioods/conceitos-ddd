import { OrderItem } from './orderItem'

export class Order {
  private readonly _id: string

  private readonly _customerId: string

  private readonly _items: OrderItem[] = []

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customerId (): string {
    return this._customerId
  }

  get items (): OrderItem[] {
    return this._items
  }

  total (): number {
    return this._items.reduce((total, item) => total + item.total(), 0)
  }

  validate () {
    if (!this._id) {
      throw new Error('Order id is required')
    }
    if (!this._customerId) {
      throw new Error('Customer id is required')
    }
    if (this._items.length === 0) {
      throw new Error('Order items is required')
    }
  }
}
