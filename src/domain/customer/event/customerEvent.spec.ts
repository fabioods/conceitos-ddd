import { Address } from '../valueObject/address'
import { Customer } from '../../customer/entity/customer'
import { EventDispatcher } from '../../shared/event/eventDispatcher'
import { CustomerAddressChangedEvent } from './customerAddressChanged'
import { CustomerCreatedEvent } from './customerCreatedEvent'
import { EnviaConsoleLog1Handler } from './handler/EnviaConsoleLog1Handler'
import { EnviaConsoleLog2Handler } from './handler/EnviaConsoleLog2Handler'
import { EnviaConsoleLogHandler } from './handler/EnviaConsoleLogHandler'

describe('Customer Events', () => {
  it('should register Customer Created Event', () => {
    const eventDispatcher = new EventDispatcher()
    const consoleLog1Handler = new EnviaConsoleLog1Handler()
    const consoleLog2Handler = new EnviaConsoleLog2Handler()
    eventDispatcher.register('CustomerCreatedEvent', consoleLog1Handler)
    eventDispatcher.register('CustomerCreatedEvent', consoleLog2Handler)

    expect(eventDispatcher.eventHandlers.CustomerCreatedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.CustomerCreatedEvent.length).toBe(2)
    expect(eventDispatcher.eventHandlers.CustomerCreatedEvent[0]).toMatchObject(consoleLog1Handler)
    expect(eventDispatcher.eventHandlers.CustomerCreatedEvent[1]).toMatchObject(consoleLog2Handler)
  })

  it('shoudl register Customer Address Changed Event', () => {
    const eventDispatcher = new EventDispatcher()
    const consoleLogHandler = new EnviaConsoleLogHandler()
    eventDispatcher.register('CustomerAddressChangedEvent', consoleLogHandler)

    expect(eventDispatcher.eventHandlers.CustomerAddressChangedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.CustomerAddressChangedEvent.length).toBe(1)
    expect(eventDispatcher.eventHandlers.CustomerAddressChangedEvent[0]).toMatchObject(consoleLogHandler)
  })

  it('should notify Customer Created Event', () => {
    const eventDispatcher = new EventDispatcher()
    const consoleLog1Handler = new EnviaConsoleLog1Handler()
    const consoleLog2Handler = new EnviaConsoleLog2Handler()
    eventDispatcher.register('CustomerCreatedEvent', consoleLog1Handler)
    eventDispatcher.register('CustomerCreatedEvent', consoleLog2Handler)
    const spyEventHandler = jest.spyOn(consoleLog1Handler, 'handle')
    const spyEventHandler2 = jest.spyOn(consoleLog2Handler, 'handle')

    const customer = new Customer('1', 'Fabio')
    const address = new Address('Rua 1', 123, '84000000', 'Cidade top')
    customer.defineAddress(address)

    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler).toBeCalledTimes(1)
    expect(spyEventHandler2).toBeCalledTimes(1)
  })

  it('should notify Customer Change address Event', () => {
    const eventDispatcher = new EventDispatcher()
    const consoleLogHandler = new EnviaConsoleLogHandler()
    eventDispatcher.register('CustomerAddressChangedEvent', consoleLogHandler)
    const spyEventHandler = jest.spyOn(consoleLogHandler, 'handle')

    const customer = new Customer('1', 'Fabio')
    const address = new Address('Rua 1', 123, '84000000', 'Cidade top')
    customer.defineAddress(address)

    const address2 = new Address('Rua 2', 123, '84000000', 'Cidade top')
    customer.defineAddress(address2)
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({ id: customer.id, name: customer.name, address: customer.address })
    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEventHandler).toBeCalledTimes(1)
  })
})
