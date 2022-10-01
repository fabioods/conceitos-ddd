
import { EventHandlerInterface } from '../../../shared/event/eventHandlerInterface'
import { ProductCreatedEvent } from '../productCreated'

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle (event: ProductCreatedEvent): void {
    console.log('sending email...')
  }
}
