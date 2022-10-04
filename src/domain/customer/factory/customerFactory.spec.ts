import { Address } from '../valueObject/address'
import { CustomerFactory } from './customerFactory'

describe('Customer factory', () => {
  it('should create customer', () => {
    const customer = CustomerFactory.create('Fábio')
    expect(customer.name).toBe('Fábio')
    expect(customer.id).toBeTruthy()
    expect(customer.address).toBeUndefined()
  })

  it('should create customer with address', () => {
    const address = new Address('Rua 1', 123, '84000000', 'SP')
    const customer = CustomerFactory.createWithAddress('Fábio', address)
    expect(customer.address).toBeTruthy()
    expect(customer.name).toBe('Fábio')
    expect(customer.id).toBeTruthy()
    expect(customer.address).toBe(address)
  })
})
