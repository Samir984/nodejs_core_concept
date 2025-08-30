type Listener = (...args: any[]) => void;
type ListenersMap = Record<string, Listener[]>;

class EventListener {
  private listeners: ListenersMap = {};

  public on(event: string, callback: Listener): this {
    this.addEvent(event, callback);
    return this;
  }

  public once(event: string, callback: Listener): this {
    if (this.listenerCount(event) > 0) {
      throw new Error(`Event ${event} already has listeners`);
    }
    const onceListener = (...args: any[]): void => {
      callback(...args);
      this.removeEvent(event);
    };

    this.addEvent(event, onceListener);
    return this;
  }

  public remove(event: string, listener: Listener): this {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (l) => l !== listener
      );
    }
    return this;
  }

  public emit(event: string, ...args: any[]): void {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }

  public listenerCount(event: string): number {
    return this.listeners[event]?.length || 0;
  }

  public clearAllListeners(): void {
    this.listeners = {};
  }

  private addEvent(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  private removeEvent(event: string): void {
    this.listeners[event] = [];
  }
}

// Example Usage
const eventListener = new EventListener();

eventListener.on("ping", (x) => {
  console.log(`ping called ${x} times`);
});
eventListener.once("time", (x) => {
  console.log(`time called ${x} times`);
});

eventListener.on("meow", (x) => {
  console.log(`meow called ${x} times`);
});

eventListener.emit("ping", 1);
eventListener.emit("ping", 2);
eventListener.emit("time", 1);
eventListener.emit("time", 2);
eventListener.emit("meow", 1);
eventListener.emit("meow", 2);
