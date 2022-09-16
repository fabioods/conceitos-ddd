export class OrderItem {
  private readonly id: string

  private readonly productId: string

  private readonly price: number

  private readonly quantity: number

  constructor (id: string, productId: string, price: number, quantity: number) {
    this.id = id
    this.productId = productId
    this.price = price
    this.quantity = quantity
    this.validate()
  }

  total (): number {
    return this.price * this.quantity
  }

  validate () {
    if (!this.id) {
      throw new Error('Order item id is required')
    }
    if (!this.productId) {
      throw new Error('Order item productId is required')
    }
    if (!this.price) {
      throw new Error('Order item price is required')
    }
    if (!this.quantity) {
      throw new Error('Order item quantity is required')
    }
  }
}
