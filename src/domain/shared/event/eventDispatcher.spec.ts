import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handler/sendEmailWhenProductIsCreatedHandler'
import { ProductCreatedEvent } from '../../product/event/productCreated'
import { EventDispatcher } from './eventDispatcher'

describe('Domain Events dispatcher', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(1)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(0)
  })

  it('should unregister all events', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeUndefined()
  })

  it('should notify an event', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100
    })
    /**
     * Quando o notify é chamado, o método handle do eventHandler é chamado
     */
    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})
