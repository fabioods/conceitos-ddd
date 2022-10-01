
import { EventHandlerInterface } from '../../../shared/event/eventHandlerInterface'
import { CustomerCreatedEvent } from '../customerCreatedEvent'

export class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
