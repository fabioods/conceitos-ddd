import { EventInterface } from './eventInterface'

export interface EventHandlerInterface<T extends EventInterface=EventInterface> {
  handle: (event: T) => void
}
