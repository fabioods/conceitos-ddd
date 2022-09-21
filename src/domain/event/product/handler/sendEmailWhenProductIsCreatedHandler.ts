import { EventHandlerInterface } from '../../@shared/eventHandlerInterface'
import { ProductCreatedEvent } from '../productCreated'

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle (event: ProductCreatedEvent): void {
    console.log('sending email...')
  }
}
