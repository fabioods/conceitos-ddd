import { Order } from './domain/checkout/entity/order'
import { OrderItem } from './domain/checkout/entity/orderItem'
import { Address } from './domain/customer/valueObject/address'
import { Customer } from './domain/customer/entity/customer'

// Aqui temos um agregado
const address = new Address('Rua 1', 1, '12345-678', 'São Paulo')
const customer = new Customer('123', 'Fábio Santos')
customer.defineAddress(address)
customer.activate()

// Aqui temos outro agregado
const item01 = new OrderItem('123', 'Item 01', 10, 10)
const item02 = new OrderItem('456', 'Item 02', 20, 20)
const item03 = new OrderItem('789', 'Item 03', 30, 30)
const order = new Order('123', '123', [item01, item02, item03])
