
import { EventHandlerInterface } from '../../../shared/event/eventHandlerInterface'
import { CustomerCreatedEvent } from '../customerCreatedEvent'

export class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
