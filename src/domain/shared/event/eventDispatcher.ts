import { EventDispatcherInterface } from './eventDispatcherInterface'
import { EventHandlerInterface } from './eventHandlerInterface'
import { EventInterface } from './eventInterface'

interface EventHandlerType {
  [eventName: string]: EventHandlerInterface[]
}

export class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: EventHandlerType = {}

  get eventHandlers (): EventHandlerType {
    return this._eventHandlers
  }

  notify (event: EventInterface) {
    const eventName = event.constructor.name
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach(handler => {
        handler.handle(event)
      })
    }
  }

  register (eventName: string, eventHandler: EventHandlerInterface<EventInterface>) {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface<EventInterface>) {
    if (this._eventHandlers[eventName]) {
      // const index = this.eventHandlers[eventName].indexOf(eventHandlers)
      // if (index !== -1) this.eventHandlers[eventName].splice(index, 1)
      this._eventHandlers[eventName] = this._eventHandlers[eventName].filter(handler => handler !== eventHandler)
    }
  }

  unregisterAll () {
    this._eventHandlers = {}
  }
}
