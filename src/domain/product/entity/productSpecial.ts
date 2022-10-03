import { ProductInterface } from './productInterface'

export class ProductSpecial implements ProductInterface {
  private readonly _id: string
  private _name: string
  private _price: number

  constructor (id: string, name: string, price: number) {
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return `${this._name} - Special`
  }

  get price (): number {
    return this._price * 10
  }

  validate () {
    if (!this._id) {
      throw new Error('Product id is required')
    }
    if (!this._name) {
      throw new Error('Product name is required')
    }
    if (!this._price || this._price <= 0) {
      throw new Error('Product price is invalid')
    }
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  changePrice (price: number) {
    this._price = price
    this.validate()
  }
}
