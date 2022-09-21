import { EventDispatcherInterface } from './eventDispatcherInterface'
import { EventHandlerInterface } from './eventHandlerInterface'
import { EventInterface } from './eventInterface'

interface EventHandlerType {
  [eventName: string]: EventHandlerInterface[]
}

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandler: EventHandlerType = {}

  get eventHandlers (): EventHandlerType {
    return this.eventHandler
  }

  notify (event: EventInterface) {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(handler => {
        handler.handle(event)
      })
    }
  }

  register (eventName: string, eventHandler: EventHandlerInterface<EventInterface>) {
    if (!this.eventHandler[eventName]) {
      this.eventHandler[eventName] = []
    }
    this.eventHandler[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface<EventInterface>) {
    if (this.eventHandler[eventName]) {
      // const index = this.eventHandler[eventName].indexOf(eventHandler)
      // if (index !== -1) this.eventHandler[eventName].splice(index, 1)
      this.eventHandler[eventName] = this.eventHandler[eventName].filter(handler => handler !== eventHandler)
    }
  }

  unregisterAll () {
    this.eventHandler = {}
  }
}
