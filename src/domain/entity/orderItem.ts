export class OrderItem {
  private readonly _id: string

  private readonly _productId: string

  private readonly _price: number

  private readonly _quantity: number

  constructor (id: string, productId: string, price: number, quantity: number) {
    this._id = id
    this._productId = productId
    this._price = price
    this._quantity = quantity
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get productId (): string {
    return this._productId
  }

  get price (): number {
    return this._price
  }

  get quantity (): number {
    return this._quantity
  }

  total (): number {
    return this._price * this._quantity
  }

  validate () {
    if (!this._id) {
      throw new Error('Order item id is required')
    }
    if (!this._productId) {
      throw new Error('Order item productId is required')
    }
    if (!this._price) {
      throw new Error('Order item price is required')
    }
    if (!this._quantity) {
      throw new Error('Order item quantity is required')
    }
  }
}
