import { Customer } from '../entity/customer'
import { v4 as uuid } from 'uuid'
import { Address } from '../valueObject/address'
/**
 * Ponto de melhora adicionar a interface do customer
 */
export class CustomerFactory {
  static create (name: string): Customer {
    const customer = new Customer(uuid(), name)
    return customer
  }

  static createWithAddress (name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.defineAddress(address)
    return customer
  }
}
