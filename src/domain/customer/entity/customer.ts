import { Address } from '../valueObject/address'

export class Customer {
  private readonly _id: string

  private _name: string

  private _address: Address

  private _active = false

  private _rewardPoints = 0

  constructor (id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  // Isso é errado, pois assim o customer será criado de maneira inconsistente
  // constructor(id: string) {
  //   this.id = id;
  // }

  get name () {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get id (): string {
    return this._id
  }

  get address (): Address {
    return this._address
  }

  isActive () {
    return this._active
  }

  defineAddress (address: Address) {
    if (!address) {
      throw new Error('Customer address is required')
    }
    this._address = address
  }

  validate () {
    if (!this._name) {
      throw new Error('Customer name is required')
    }
    if (!this._id) {
      throw new Error('Customer id is required')
    }
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  activate () {
    if (!this._address) {
      throw new Error('Customer address is required to active customer')
    }
    this._active = true
  }

  inactivate () {
    this._active = false
  }

  addRewardPoints (points: number) {
    this._rewardPoints += points
  }
}
