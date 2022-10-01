
import { EventHandlerInterface } from '../../../shared/event/eventHandlerInterface'
import { CustomerAddressChangedEvent } from '../customerAddressChanged'

export class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle (event: CustomerAddressChangedEvent): void {
    const { name, address, id } = event.eventData as { name: string, address: string, id: string }
    console.log(`Endereço do cliente: ${id}, ${name}, alterado para: ${address}`)
  }
}
